//Function handlePosition asks for Geolocation data and then uses it`
function handlePosition(position){
  let latitude= position.coords.latitude;
  let longitude= position.coords.longitude;
  let units = "metric";
  let apiKey = "d13aba718089eac946cbe226bfd205f4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showCurrentTemp);
  console.log(latitude);
  console.log(longitude);
}

//Function handles current temp showing.`
function showCurrentTemp(response){
  let temperature = Math.round(response.data.main.temp);
  console.log(`Current temp is ${temperature}°C`);
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
  let changeDate = document.querySelector("#city-location");
  let units = "metric";
  let askCityName = searchInput.value;
  let apiKey = "d13aba718089eac946cbe226bfd205f4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${askCityName}&units=${units}&appid=${apiKey}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(updateDisplay)
  if (searchInput.value) {
    changeDate.innerHTML = `${searchInput.value}`;
  } else {
    changeDate.innerHTML = null;
    alert("Please type a city");
  }
}

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

//Geolocation data
navigator.geolocation.getCurrentPosition(handlePosition);

