//Function will only run when the Submit button is hit. Using event listener on the form.
function updateDisplay(response){
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#day-hour");
  let iconElement = document.querySelector("#icon");
  let icon = (response.data.weather[0].icon);

  celciusTemperature = response.data.main.temp;
  
  temperatureElement.innerHTML = Math.round(celciusTemperature);
  cityElement.innerHTML = response.data.name;  
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000)
  iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${icon}@2x.png`);
}

//Function uses the OpenWeatherAPI to look up the city.
function getCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let changeCity = document.querySelector("#city");
  let units = "metric";
  let askCityName = searchInput.value;
  let apiKey = "d13aba718089eac946cbe226bfd205f4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${askCityName}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(updateDisplay)
  if (searchInput.value) {
    changeCity.innerHTML = `${searchInput.value}`;
  } else {
    changeCity.innerHTML = null;
    alert("Please type a city");
  }
}

//Function handlePosition asks for Geolocation data from the user and then feeds it to showCurrentTemp`
function handlePosition(position){
  let latitude= position.coords.latitude;
  let longitude= position.coords.longitude;
  let units = "metric";
  let apiKey = "d13aba718089eac946cbe226bfd205f4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showCurrentTemp);
}

//Geolocation data is asked for when "current" button is clicked.
function clickCurrentButton(event) {
navigator.geolocation.getCurrentPosition(handlePosition);
}

//Function handles current temp showing. This is what's showing right off of the bat without any user interaction.
function showCurrentTemp(response){
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#day-hour");
  let iconElement = document.querySelector("#icon");
  let icon = (response.data.weather[0].icon);
  
  celciusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celciusTemperature);
  cityElement.innerHTML = response.data.name;  
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000)
  iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${icon}@2x.png`);
}

function minutes_with_leading_zeros(currentTime) {
  //Function will add leading 0's to the current time so that the time looks normal if it's a single digit for the minute. 
  return (currentTime.getMinutes() < 10 ? '0' : '') + currentTime.getMinutes();
}

function formatDate(timestamp){
  //calculate the date
   let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"];
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = minutes_with_leading_zeros(date);
  let day = days[date.getDay()];

  return `${day} ${hours}:${minutes}`;
}

//function to convert to Fahrenheit.
function showFahrenheitTemperature (event){
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = ((celciusTemperature * 9) / 5 + 32);
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  celciusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

//function for back to Celcius
function showCelciusTemperature (event){
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celciusTemperature);
  let element = document.getElementById("#celcius-link");
  celciusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

let celciusTemperature = null;

//Current button, clicking it calls functions.
let currentButton = document.querySelector("#currentButton");
currentButton.addEventListener("click", clickCurrentButton);

//Search engine, when searching for a city, display the city name on the page after the user submits form.
let form = document.querySelector("form");
form.addEventListener("submit", getCity);

//API Call
let units = "metric"
let apiKey = "d13aba718089eac946cbe226bfd205f4";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Los Angeles&units=${units}&appid=${apiKey}`;
axios.get(apiUrl).then(showCurrentTemp);

//Fahrenheit conversion
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

//back to Celcius
let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", showCelciusTemperature);
