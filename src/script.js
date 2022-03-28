//Function getCity is to change the name of the city when the user types in a city name.
function getCity(event,response){
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let changeDate = document.querySelector("#city-location");
  let askCityName = searchInput.value;

  if (searchInput.value){
  changeDate.innerHTML = `${searchInput.value}`;
  }else {
    changeDate.innerHTML = null;
    alert("Please type a city");
  }

  if (askCityName.length > 0) {
    let temperature = Math.round(response.data.main.temp);
    let city = response.data.name;
    let message = `It is ${temperature} degrees in ${city}`;
    let h1 = document.querySelector("h1");
    h2.innerHTML = message;


let apiKey = "d13aba718089eac946cbe226bfd205f4";
let units = "metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${askCityName}&appid=${apiKey}&units=${units}`;

axios.get(apiUrl).then(showTemperature);


}
else {
    alert(`You didn't enter a city`);
}
}
//Function convertToFahrenheit used for converting temperature to Fahrenheit.
function convertToFahrenheit(event){
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round(((temperature) * 9) / 5 + 32);
}

//Function convertToCelcius used for converting Temp to Celcius.
function convertToCelcius(event){
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round(((temperature) - 32) / 1.8);
}

//Function handlePosition asks for Geolocation data and then uses it
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

//Function handles current temp showing.
function showCurrentTemp(response){
  let temperature = Math.round(response.data.main.temp);
  console.log(` It is currently ${temperature}°C where you live.`);
}

//function getCurrentWeather(position){
  //navigator.geolocation.getCurrentPosition;
  //let latitude= position.coords.latitude;
  //let longitude= position.coords.longitude;
  //let units = "metric";
  //let apiKey = "d13aba718089eac946cbe226bfd205f4";
  //let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;
  //axios.get(apiUrl).then(updateCurrentButton);
//}

//function updateCurrentButton(response){
//let temperature = Math.round(response.data.main.temp);
//let city = response.data.name;
//let humidity = response.data.main.humidity;
//let description = response.data.weather[2];
//let cityHTML = document.querySelector("#city-location");
//city-location.innerHTML = `${city}`;
//let descriptionHTML = document.querySelector("#weather-description");
//descriptionHTML.innerHTML = `${description}`;
//let humidityHTML = document.querySelector("#humidity");
//humidityHTML.innerHTML = `${humidity}`;
//}


//Below is smart time. Fetching currrent Day, Hour, Minutes.
let currentTime = new Date();
let days=["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let currentDay = days[currentTime.getDay()];
let currentHour = currentTime.getHours();
let currentMinutes = currentTime.getMinutes();
let date = `${currentDay} ${currentHour}:${currentMinutes}`;


let BigDate =document.querySelector("#day-hour");
BigDate.innerHTML = `${date}`;


//Search engine, when searching for a city, display the city name on the page after the user submits form.
let form = document.querySelector("#search-form");
form.addEventListener("submit",getCity);

// Select F Link and call function to convert to Fahrenheit
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

// Select C Link and call function to convert to Celcius
let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", convertToCelcius);

//Geolocation data
navigator.geolocation.getCurrentPosition(handlePosition);

