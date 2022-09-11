// time stamp
function formatDate(timestamp) {
  let now = new Date(timestamp);
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return `${weekDays[now.getDay()]}, ${hours}:${minutes} `;
}

// Forcast Info
function formatForcastDays(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return daysOfWeek[day];
}

function displayForcast(response) {
  let dailyForecast = response.data.daily;
  let forecastElement = document.querySelector("#forcast");
  let forecastHTML = `<div>`;

  dailyForecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="box  row">
                  <div class="col-3">
                    <div id="forcast-day">${formatForcastDays(
                      forecastDay.dt
                    )}</div>
                   
                  </div>
                  
                  
                    <img class="forcast-icon col-3" src="http://openweathermap.org/img/wn/${
                      forecastDay.weather[0].icon
                    }@2x.png" alt=""  />
                    
                  
                  <div class="col-6">
                    <span id="max-temp">${Math.round(
                      forecastDay.temp.max
                    )}°</span>
                    <span class="min-temp" id="min-temp">${Math.round(
                      forecastDay.temp.min
                    )}°</span>
                  </div>
                </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForcast(coordinates) {
  let apiKey = "66af35db472b0f6b03a390f971759004";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForcast);
}

// default city
function showDefaultCity(response) {
  console.log(response);
  let defaultCity = document.querySelector("#main-city");
  let city = response.data.name;
  defaultCity.innerHTML = city;
  celciusTemperature = response.data.main.temp;
  let tempElement = document.querySelector("#main-temp");
  let dafuatlTempC = Math.round(celciusTemperature);
  tempElement.innerHTML = dafuatlTempC;

  let defaultHumidity = document.querySelector("#humidity");
  let humidity = response.data.main.humidity;
  defaultHumidity.innerHTML = humidity;
  let defaulWind = document.querySelector("#wind");
  let wind = response.data.wind.speed;
  defaulWind.innerHTML = wind;
  let currentTime = document.querySelector("#day-time");
  currentTime.innerHTML = formatDate(response.data.dt * 1000);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  let descriptionElement = document.querySelector("#main-temp-description");
  descriptionElement.innerHTML = response.data.weather[0].description;

  getForcast(response.data.coord);
}
let apiKey = "66af35db472b0f6b03a390f971759004";
let apiProtocal = "https://api.openweathermap.org/data/2.5/weather?";
let units = "metric";
let city = "London";
let apiUrl = `${apiProtocal}q=${city}&appid=${apiKey}&units=${units}`;

axios.get(apiUrl).then(showDefaultCity);

// search-input city
function showTypedCityTemp(response) {
  let tempElement = document.querySelector("#main-temp");
  celciusTemperature = response.data.main.temp;
  let dafuatlTempC = Math.round(celciusTemperature);
  tempElement.innerHTML = dafuatlTempC;
  let defaultHumidity = document.querySelector("#humidity");
  let humidity = response.data.main.humidity;
  defaultHumidity.innerHTML = humidity;
  let defaulWind = document.querySelector("#wind");
  let wind = response.data.wind.speed;
  defaulWind.innerHTML = wind;
  let currentTime = document.querySelector("#day-time");
  currentTime.innerHTML = formatDate(response.data.dt * 1000);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  let descriptionElement = document.querySelector("#main-temp-description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  changeBackgroundImage(response.data.weather[0].icon);
  getForcast(response.data.coord);
}
// Background image Change
function changeBackgroundImage(response) {
  let clearSkyDay = "01d";
  let clearSkyNight = "01n";
  let clouds = ["02d", "02n", "03d", "03n", "04d", "04n"];
  let rain = ["09d", "09n", "10d", "10n"];
  let storm = ["11d", "11n"];
  let snow = ["13n", "13d"];
  let mist = ["50d", "50n"];
  if (response === clearSkyDay) {
    document.getElementsByClassName(".background-img").style.background = url(
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/046/007/original/mist.jpeg?1662886608"
    );
  }
}
function showTypedCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let mainCity = document.querySelector("#main-city");
  let city = searchInput.value;
  mainCity.innerHTML = `${city}`;
  let apiKey = "66af35db472b0f6b03a390f971759004";
  let apiProtocal = "https://api.openweathermap.org/data/2.5/weather?";
  let units = "metric";
  let apiUrl = `${apiProtocal}q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTypedCityTemp);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", showTypedCity);

// current location button
function showMainTemp(response) {
  celciusTemperature = response.data.main.temp;
  let tempElement = celciusTemperature;
  let mainTemperature = Math.round(tempElement);
  let defaultTemperature = document.querySelector("#main-temp");
  defaultTemperature.innerHTML = mainTemperature;
  let defaultCity = document.querySelector("#main-city");
  defaultCity.innerHTML = response.data.name;
  let humidityElement = response.data.main.humidity;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = humidityElement;
  let windElement = response.data.wind.speed;
  let wind = document.querySelector("#wind");
  wind.innerHTML = windElement;
  let currentTime = document.querySelector("#day-time");
  currentTime.innerHTML = formatDate(response.data.dt * 1000);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  let descriptionElement = document.querySelector("#main-temp-description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  getForcast(response.data.coord);
}

function getCurrentPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "66af35db472b0f6b03a390f971759004";
  let apiProtocal = "https://api.openweathermap.org/data/2.5/weather?";
  let units = "metric";
  let apiUrl = `${apiProtocal}lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showMainTemp);
}

function showCurrentPosition() {
  navigator.geolocation.getCurrentPosition(getCurrentPosition);
}

let button = document.querySelector("#current-loc");
button.addEventListener("click", showCurrentPosition);

// unit conversion
function showFarenheitTemp(event) {
  event.preventDefault();
  let farenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#main-temp");
  celsuiusLink.classList.remove("active");
  farenheitLink.classList.add("active");
  temperatureElement.innerHTML = Math.round(farenheitTemperature);
}
function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#main-temp");
  celsuiusLink.classList.add("active");
  farenheitLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celciusTemperature);
}
let celciusTemperature = null;
let farenheitLink = document.querySelector("#farenheit-link");
farenheitLink.addEventListener("click", showFarenheitTemp);
let celsuiusLink = document.querySelector("#celsius-link");
celsuiusLink.addEventListener("click", displayCelsiusTemperature);
