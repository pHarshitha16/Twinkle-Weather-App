let today = new Date();
let day = today.getDay();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let timeInHours = today.getHours();
let timeInMinutes = today.getMinutes();
let dayAndTime = document.querySelector("#dayAndTime");
if (timeInHours < 10) {
  dayAndTime.innerHTML = `${days[day]} 0${timeInHours}:${timeInMinutes}`;
} else {
  dayAndTime.innerHTML = `${days[day]} ${timeInHours}:${timeInMinutes}`;
}
if (timeInMinutes < 10) {
  dayAndTime.innerHTML = `${days[day]} ${timeInHours}:0${timeInMinutes}`;
} else {
  dayAndTime.innerHTML = `${days[day]} ${timeInHours}:${timeInMinutes}`;
}
//
function showPlace(response) {
  console.log(response.data);
  let placeDescription = response.data.weather[0].description;
  let cityName = response.data.name;
  let humidity = response.data.main.humidity;
  let wind = response.data.wind.speed;
  let pressure = response.data.main.pressure;
  let cityText = document.querySelector(".city");
  cityText.innerHTML = cityName;
  let humidityText = document.querySelector("#humidity");
  humidityText.innerHTML = `Humidity: ${humidity}%`;
  let pressureText = document.querySelector("#pressure");
  pressureText.innerHTML = `Pressure: ${pressure}`;
  let windText = document.querySelector("#wind");
  windText.innerHTML = `Wind: ${wind} Km/h`;
  let description = document.querySelector("#status");
  description.innerHTML = placeDescription;
  let temperature = response.data.main.temp;
  let tempText = document.querySelector(".temperature");
  tempText.innerHTML = Math.round(temperature);
}
function weather(place) {
  console.log(place);
  let apiKey = "86e5936d48065a1715f44996856cb061";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showPlace);
}
function placeText(event) {
  event.preventDefault();
  let text = document.querySelector("#place");
  placeName = text.value.trim().toLowerCase();
  if (placeName == 0) {
    alert("Please enter the City name");
  } else {
    weather(placeName);
  }
}
let place = document.querySelector(".btn");
place.addEventListener("click", placeText);
function searchPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "86e5936d48065a1715f44996856cb061";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showPlace);
}
function showLocation(event) {
  event.preventDefault();
  let position = navigator.geolocation.getCurrentPosition(searchPosition);
}
let currentLocation = document.querySelector("#location");
currentLocation.addEventListener("click", showLocation);
