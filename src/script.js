
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



let convertedTemp=document.querySelector("#temp-degrees");




function cToF(event){
    event.preventDefault();
    
    
    convertedTemp.innerHTML="42";

    
}

function fToC(event){
    event.preventDefault();
   
    convertedTemp.innerHTML=`29`;
   
}
let selectedCelsiusUnits=document.querySelector("#celsius-link");
selectedCelsiusUnits.addEventListener("click",fToC);
let selectedFahrenheitUnits=document.querySelector("#fahrenheit-link");
selectedFahrenheitUnits.addEventListener("click",cToF);

function search(event) {
    event.preventDefault();
    
    let cityInput = document.querySelector("#city-input");
    

    let city=cityInput.value;
    searchCity(city);
    
  }

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);



//Real time Weather Temperature
function searchCity(city){
    let apiKey = "dff5c692192605ee5ed7f95b423ae857";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    axios.get(url).then(displayWeather);
}


function displayWeather(response) {
    //city
 document.querySelector("#city").innerHTML = response.data.name;
 //temp
  let tempInCity = Math.round(response.data.main.temp);
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
let windInCity=Math.round(response.data.wind.speed) ;
console.log(windInCity);
let realTimeWind=document.querySelector("#wind");
realTimeWind.innerHTML=`Wind:${windInCity}km/h`;


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




