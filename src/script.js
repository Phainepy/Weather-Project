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
         if (askCityName === "paris"){
        alert(`It is currently ${weather.paris.temp} in ${askCityName} with a humidity of ${weather.paris.humidity}%`);
         }
         else if (askCityName === "tokyo"){
        alert(`It is currently ${weather.tokyo.temp} in ${askCityName} with a humidity of ${weather.tokyo.humidity}%`);
         }
         else if (askCityName === "lisbon"){
        alert(`It is currently ${weather.lisbon.temp} in ${askCityName} with a humidity of ${weather.lisbon.humidity}%`);
         }
         else if (askCityName === "san francisco"){
        alert(`It is currently ${weather["san francisco"].temp} in ${askCityName}  with a humidity of ${weather["san francisco"].humidity}%`);
         }
         else if (askCityName === "moscow"){
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
let form = document.querySelector("#search-form");
form.addEventListener("submit",getCity);

let currentTime = new Date();
let days=["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let currentDay = days[currentTime.getDay()];
let currentHour = currentTime.getHours();
let currentMinutes = currentTime.getMinutes();
let date = `${currentDay} ${currentHour}:${currentMinutes}`;

let BigDate =document.querySelector("#day-hour");
BigDate.innerHTML = `${date}`;

//function convertTemp() {
//let selectedBigTemp = document.querySelector("#big-temperature");
//selectedBigTemp.innerHTML = `${}`;
//Celsius to Fahrenheit Formula: (°C * 1.8) + 32 = °F
//Fahrenheit to Celsius Formula: (°F - 32) / 1.8 = °C
//}
