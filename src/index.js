// let weather = {
//   paris: {
//     temp: 19.7,
//     humidity: 80,
//   },
//   tokyo: {
//     temp: 17.3,
//     humidity: 50,
//   },
//   lisbon: {
//     temp: 30.2,
//     humidity: 20,
//   },
//   "san francisco": {
//     temp: 20.9,
//     humidity: 100,
//   },
//   oslo: {
//     temp: -5,
//     humidity: 20,
//   },
// };

// let city = prompt("Enter city here?");
// if (city !== undefined) {
//   let humidity = weather[city].humidity;
//   let temperature = weather[city].temp;
//   let celciusTeperature = Math.round(temperature);
//   let farenheitTemperature = Math.round((temperature * 9) / 5 + 32);
//   alert(
//     `It is currently ${celciusTeperature}°C (${farenheitTemperature}°F) in ${city} with the humidity of ${humidity}%.`
//   );
// } else {
//   alert(
//     `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${city} `
//   );
// }

// weather.paris.farenheit = 68;
// weather.tokyo.farenheit = 62.6;
// weather.lisbon.farenheit = 86;
// weather["san francisco"].farenheit = 69.8;
// weather.oslo.farenheit = 23;

// weather.paris.temp = Math.round(weather.paris.temp);
// weather.tokyo.temp = Math.round(weather.tokyo.temp);
// weather.lisbon.temp = Math.round(weather.lisbon.temp);
// weather["san francisco"].temp = Math.round(weather["san francisco"].temp);
// weather.tokyo.farenheit = Math.round(weather.tokyo.farenheit);
// weather["san francisco"].farenheit = Math.round(
//   weather["san francisco"].farenheit
// );

// let city = prompt("Enter city here");
// city = city.toLocaleLowerCase().trim();

// if (city === "paris") {
//   alert(
//     `It is currently ${weather.paris.temp} °C (${weather.paris.farenheit}°F) in ${city} with a humidity of ${weather.paris.humidity}%.`
//   );
// } else {
//   if (city === "oslo") {
//     alert(
//       `It is currently ${weather.oslo.temp} °C (${weather.oslo.farenheit}°F) in ${city} with a humidity of ${weather.oslo.humidity}%.`
//     );
//   } else {
//     if (city === "tokyo") {
//       alert(
//         `It is currently ${weather.tokyo.temp} °C (${weather.tokyo.farenheit}°F) in ${city} with a humidity of ${weather.tokyo.humidity}%.`
//       );
//     } else {
//       if (city === "lisbon") {
//         alert(
//           `It is currently ${weather.lisbon.temp} °C (${weather.lisbon.farenheit}°F) in ${city} with a humidity of ${weather.lisbon.humidity}%.`
//         );
//       } else {
//         if (city === "san francisco") {
//           alert(
//             `It is currently ${weather["san francisco"].temp} °C (${weather["san francisco"].farenheit}°F) in ${city} with a humidity of ${weather["san francisco"].humidity}%.`
//           );
//         } else {
//           if (city === "") {
//             alert("Dont be shy🙈! look up a city!");
//           } else {
//             alert(
//               `Sorry, we don't know the weather of this city, try going to https://google.com/search?q=weather+${city}.`
//             );
//           }
//         }
//       }
//     }
//   }
// }
function showTime() {
  let now = new Date();
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
  let currentTime = document.querySelector("h5");
  currentTime.innerHTML = `${weekDays[now.getDay()]}, ${hours}:${minutes} `;
}
showTime();

// function showTempC(event) {
//   event.preventDefault();
//   let tempC = document.querySelector("#main-temp");
//   let celciusTemperature = 10;
//   tempC.innerHTML = celciusTemperature;
// }

// function showTempF(event) {
//   event.preventDefault();
//   let tempF = document.querySelector("#main-temp");
//   let celciusTemperature = 10;
//   let farenheitTemperature = Math.round((celciusTemperature * 9) / 5 + 32);
//   tempF.innerHTML = farenheitTemperature;
// }
// let tempC = document.querySelector("#celsius-link");
// tempC.addEventListener("click", showTempC);

// let tempF = document.querySelector("#farenheit-link");
// tempF.addEventListener("click", showTempF);

// default city
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
}
let apiKey = "6a34c15fe8f83b9dd7c5b4f359fecd50";
let apiProtocal = "https://api.openweathermap.org/data/2.5/weather?";
let units = "metric";
let city = "London";
let apiUrl = `${apiProtocal}q=${city}&appid=${apiKey}&units=${units}`;

axios.get(apiUrl).then(showDefaultCity);

// homework 1
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

// Bosun Challenge
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
