let weather = {
  "paris": {
    temp: 19.7,
    humidity: 80
  },
  "tokyo": {
    temp: 17.3,
    humidity: 50
  },
  "lisbon": {
    temp: 30.2,
    humidity: 20
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100
  },
  "moscow": {
    temp: -5,
    humidity: 20
  }
};

//Below is smart time. Fetching currrent Day, Hour, Minutes.
let currentTime = new Date();
let days=["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let currentDay = days[currentTime.getDay()];
let currentHour = currentTime.getHours();
let currentMinutes = currentTime.getMinutes();
let date = `${currentDay} ${currentHour}:${currentMinutes}`;


let BigDate =document.querySelector("#day-hour");
BigDate.innerHTML = `${date}`;

//Function getCity is to change the name of the city when the userr types in a city name.
function getCity(event){
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
         if (askCityName === "Paris"){
        alert(`It is currently ${weather.paris.temp} in ${askCityName} with a humidity of ${weather.paris.humidity}%`);
         }
         else if (askCityName === "Tokyo"){
        alert(`It is currently ${weather.tokyo.temp} in ${askCityName} with a humidity of ${weather.tokyo.humidity}%`);
         }
         else if (askCityName === "Lisbon"){
        alert(`It is currently ${weather.lisbon.temp} in ${askCityName} with a humidity of ${weather.lisbon.humidity}%`);
         }
         else if (askCityName === "San Francisco"){
        alert(`It is currently ${weather["san francisco"].temp} in ${askCityName}  with a humidity of ${weather["san francisco"].humidity}%`);
         }
         else if (askCityName === "Moscow"){
        alert(`It is currently ${weather.moscow.temp} in ${askCityName} with a humidity of ${weather.moscow.humidity}%`);
         } 
         else{
             alert(`Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${askCityName}`);
         }
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

//Function handles current temp showing.
function showCurrentTemp(){
  let temperature = Math.round(response.data.main.temp);
  console.log(` It is currently ${temperature}°C where you live.`);
    //let h1 = document.querySelector("h1");
    //h1.innerHTML = `Your Outside temperature is ${temperature} C`;
}

//Function handlePosition asks for Geolocation data and then uses it
function handlePosition(position){
  let latitude= position.coords.latitude;
  let longitude= position.coords.longitude;
  console.log(latitude);
  let units = "metric";
  let apiKey = "d13aba718089eac946cbe226bfd205f4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showCurrentTemp)
}

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
navigator.geolocation.getCurrentPosition(handlePosition)