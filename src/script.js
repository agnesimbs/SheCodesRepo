
//DISPLAYING DATE AND TIME


let now=new Date();

let todate=document.querySelector(".date");
let totime=document.querySelector(".time");


let date=now.getDate();
let hours=now.getHours();
let minutes=now.getMinutes();
let year=now.getFullYear();

let days=["Sun","Mon","Tue","Wed","Thur","Frid","Sat"];
let day=days[now.getDay()];

let months=["Jan","Feb","March","April","May","Jun","July","Aug","Sep","Oct","Nov","Dec"];
let month=months[now.getMonth()];

//test whether time is am/pm
let timetest;
if( hours>=12){
   timetest="Pm"

}
else{
    timetest="Am"
}


todate.innerHTML=`${day}, ${date}, ${month} ${year}`;
totime.innerHTML=`${hours}:${minutes} ${timetest}`

//Converting Celsius degrees to Fahrenheit and vise versa



//let convertedTemp=document.querySelector("#temp-degrees");




function celsiusToFahrenheit(event){
    event.preventDefault();
    let temperatureElement = document.querySelector("#temp-degrees");

    selectedCelsiusUnits.classList.remove("active");
    selectedFahrenheitUnits.classList.add("active");
    let fahrenheitTemperature = (tempInCity * 9) / 5 + 32;
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
    
    
   

    
}

function fahrenheitToCelsius(event){
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp-degrees");

  selectedCelsiusUnits.classList.add("active");
  selectedFahrenheitUnits.classList.remove("active");
  temperatureElement.innerHTML = Math.round(tempInCity);
  
   
    //convertedTemp.innerHTML=`29`;
   
}


let selectedCelsiusUnits=document.querySelector("#celsius-link");
selectedCelsiusUnits.addEventListener("click",fahrenheitToCelsius);
let selectedFahrenheitUnits=document.querySelector("#fahrenheit-link");
selectedFahrenheitUnits.addEventListener("click",celsiusToFahrenheit);

function search(event) {
    event.preventDefault();
    
    let cityInput = document.querySelector("#city-input");
    

    let city=cityInput.value;
    searchCity(city);
    
  }

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

//real time forecast
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
        
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max
          )}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}° </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey =  "dff5c692192605ee5ed7f95b423ae857";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}



//Real time Weather Temperature
function searchCity(city){
    let apiKey = "dff5c692192605ee5ed7f95b423ae857";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    axios.get(url).then(displayWeather);
}

let tempInCity = null;

function displayWeather(response) {
    //city
 document.querySelector("#city").innerHTML = response.data.name;
 //temp
  tempInCity = Math.round(response.data.main.temp);
  console.log(tempInCity);
  console.log(response);
  let realTimeTemperature = document.querySelector("#temp-degrees");
  realTimeTemperature.innerHTML = `${tempInCity}`;
  //description
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].main;

//humidity
let humidityInCity=Math.round(response.data.main.humidity) ;
console.log(humidityInCity);
let realTimeHumidity=document.querySelector("#humidity");
realTimeHumidity.innerHTML=`Humidity:${humidityInCity}%`;

//wind
let windInCity=Math.round(response.data.wind.speed * 3.6) ;
console.log(windInCity);
let realTimeWind=document.querySelector("#wind");
realTimeWind.innerHTML=`Wind:${windInCity}km/h`;

getForecast(response.data.coord);
}


function searchLocation(position) {
    let apiKey =  "dff5c692192605ee5ed7f95b423ae857";
    let long=position.coords.longitude;
    let lat=position.coords.latitude;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
  
    axios.get(apiUrl).then(displayWeather);


  }
  
  function getCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
  }

  let currentLocationButton = document.querySelector("#current-location-button");
  currentLocationButton.addEventListener("click", getCurrentLocation);  

searchCity("Berlin");




