// const city = document.getElementById("city");
// const weather = document.getElementById("weather");
// const API_KEY = "d2aab5f5c4c9fe0fce6481b412cea172";

// function onGeoOk(position) {
//   const lat = position.coords.latitude;
//   const lon = position.coords.longitude;
//   const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
//   fetch(url)
//     .then((response) => response.json())
//     .then((data) => {
//       city.innerText = data.name;
//       weather.innerText = data.weather[0].main + " / " + data.main.temp
//     });
// }
// function onGeoError() {
//   alert("Can't find you. No weather for you.");
// }

// navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);