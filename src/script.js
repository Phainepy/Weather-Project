//Function handlePosition asks for Geolocation data from the user and then feeds it to showCurrentTemp`
function handlePosition(position){
  let latitude= position.coords.latitude;
  let longitude= position.coords.longitude;
  let units = "metric";
  let apiKey = "d13aba718089eac946cbe226bfd205f4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showCurrentTemp);
  console.log(latitude);
  console.log(longitude);
  console.log(apiUrl);
}

//Geolocation data is asked for when "current" button is clicked.
function clickCurrentButton(event) {
navigator.geolocation.getCurrentPosition(handlePosition);
}

//Function handles current temp showing.`
function showCurrentTemp(response){
  let temperature = Math.round(response.data.main.temp);
  let humidity = response.data.main.humidity;
  let weather = response.data.weather[0].description;
  let city = response.data.name;
  let changeTemp = document.querySelector("#temperature");
  let changeHumidity = document.querySelector("#humidity");
  let changeWeatherDescription = document.querySelector("#weather-description");
  let changeCity = document.querySelector("#city-location");
  changeCity.innerHTML = `${city}`;
  changeTemp.innerHTML = `${temperature}`;
  changeHumidity.innerHTML = `The Humidity is ${humidity}%`;
  changeWeatherDescription.innerHTML = weather;
}

//Function handles current temp showing.`
function updateDisplay(response){
  let temperature = Math.round(response.data.main.temp);
  let humidity = response.data.main.humidity;
  let weather = response.data.weather[0].description;
  let changeTemp = document.querySelector("#temperature");
  let changeHumidity = document.querySelector("#humidity");
  let changeWeatherDescription = document.querySelector("#weather-description");
  changeTemp.innerHTML = `${temperature}`;
  changeHumidity.innerHTML = `The Humidity is ${humidity}%`;
  changeWeatherDescription.innerHTML = weather;
}

//Function uses the OpenWeatherAPI to look up the city.
function getCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let changeCity = document.querySelector("#city-location");
  let units = "metric";
  let askCityName = searchInput.value;
  let apiKey = "d13aba718089eac946cbe226bfd205f4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${askCityName}&units=${units}&appid=${apiKey}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(updateDisplay)
  if (searchInput.value) {
    changeCity.innerHTML = `${searchInput.value}`;
  } else {
    changeCity.innerHTML = null;
    alert("Please type a city");
  }
}

//Current button, clicking it calls functions.
let currentButton = document.querySelector("#button-current-temp");
currentButton.addEventListener("click", clickCurrentButton);

//Search engine, when searching for a city, display the city name on the page after the user submits form.
let form = document.querySelector("#search-form");
form.addEventListener("submit", getCity);


//Setting the time
let currentTime = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let currentDay = days[currentTime.getDay()];
let currentHour = currentTime.getHours();
let currentMinutes = currentTime.getMinutes();
let date = `${currentDay} ${currentHour}:${currentMinutes}`;

let BigDate = document.querySelector("#day-hour");
BigDate.innerHTML = `${date}`;




