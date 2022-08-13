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

function showDefaultCity(response) {
  let defaultCity = document.querySelector("#main-city");
  let city = response.data.name;
  defaultCity.innerHTML = city;
  let tempElement = document.querySelector("#main-temp");
  let dafuatlTempC = Math.round(response.data.main.temp);
  tempElement.innerHTML = dafuatlTempC;
  let defaultHumidity = document.querySelector("#humidity");
  let humidity = response.data.main.humidity;
  defaultHumidity.innerHTML = humidity;
  let defaulWind = document.querySelector("#wind");
  let wind = response.data.wind.speed;
  defaulWind.innerHTML = wind;
  let currentTime = document.querySelector("#day-time");
  currentTime.innerHTML = formatDate(response.data.dt * 1000);
}
let apiKey = "6a34c15fe8f83b9dd7c5b4f359fecd50";
let apiProtocal = "https://api.openweathermap.org/data/2.5/weather?";
let units = "metric";
let city = "London";
let apiUrl = `${apiProtocal}q=${city}&appid=${apiKey}&units=${units}`;

axios.get(apiUrl).then(showDefaultCity);

function showTypedCityTemp(response) {
  let tempElement = document.querySelector("#main-temp");
  let dafuatlTempC = Math.round(response.data.main.temp);
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
}
function showTypedCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let mainCity = document.querySelector("#main-city");
  let city = searchInput.value;
  mainCity.innerHTML = `${city}`;
  let apiKey = "6a34c15fe8f83b9dd7c5b4f359fecd50";
  let apiProtocal = "https://api.openweathermap.org/data/2.5/weather?";
  let units = "metric";
  let apiUrl = `${apiProtocal}q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTypedCityTemp);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", showTypedCity);

function showMainTemp(response) {
  let tempElement = response.data.main.temp;
  let mainTemperature = Math.round(tempElement);
  let defaultTemperature = document.querySelector("#main-temp");
  defaultTemperature.innerHTML = mainTemperature;
  let defaultCity = document.querySelector("#main-city");
  defaultCity.innerHTML = "Shiraz";
  let humidityElement = response.data.main.humidity;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = humidityElement;
  let windElement = response.data.wind.speed;
  let wind = document.querySelector("#wind");
  wind.innerHTML = windElement;
  let currentTime = document.querySelector("#day-time");
  currentTime.innerHTML = formatDate(response.data.dt * 1000);
}

function getCurrentPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "6a34c15fe8f83b9dd7c5b4f359fecd50";
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
