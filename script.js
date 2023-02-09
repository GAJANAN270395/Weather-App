let searchCity = document.getElementById('search-bar');
const api_key = '49cc8c821cd2aff9af04c9f98c36eb74';

const fetchWeather = () => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${searchCity.value}&appid=${api_key}`
  )
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      console.log(response);
      displayWeather(response);
    });
};

const displayWeather = (response) => {
  // Temp
  let temp = document.getElementById('temp');
  let tempCelsius = (response.main.temp - 273.15).toFixed(0);
  temp.innerText = tempCelsius + '°C';
  // City Name
  let cityName = document.getElementById('city');
  cityName.innerText = `Weather in ${response.name}`;
  console.log(cityName);
  // Humidity
  let humidity = document.getElementById('humidity');
  humidity.innerText = `Humidity: ${response.main.humidity} % `;
  // Temp min
  let visiblity = document.getElementById('visiblity');
  visiblity.innerText = `Visiblity: ${response.visibility}°C`;
  // Wind Speed
  let windSpeed = document.getElementById('wind');
  let milesToKm = (response.wind.speed * 1.60934).toFixed(2);
  windSpeed.innerText = `Wind Speed: ${milesToKm}Km/h`;
  // Weather icon
  let weatherIcon = document.getElementById('weather_img');
  weatherIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${response.weather[0].icon}.png" alt="" />`;

  //Weather Description
  let weatherDescription = document.getElementById('description');
  weatherDescription.innerText = response.weather[0].description;
};

const currentLocationWeather = () => {
  navigator.geolocation.getCurrentPosition((success) => {
    let { latitude, longitude } = success.coords;
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${api_key}`
    )
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log(response);
        currentLocationDisplay(response);
      });
  });
};

const currentLocationDisplay = (response) => {
  let temp = document.getElementById('temp');
  temp.innerText = response.current.temp.toFixed(0) + '°C';
  // City Name
  let cityName = document.getElementById('city');
  cityName.innerText = `Weather in ${response.name}`;
  console.log(cityName);
  // Humidity
  let humidity = document.getElementById('humidity');
  humidity.innerText = `Humidity: ${response.current.humidity} % `;
  // Visiblity
  let visiblity = document.getElementById('visiblity');
  visiblity.innerText = `Visiblity: ${response.current.visibility}`;
  // Wind Speed
  let windSpeed = document.getElementById('wind');
  windSpeed.innerText = `Wind Speed: ${response.current.wind_speed}Km/h`;
  // Weather icon
  let weatherIcon = document.getElementById('weather_img');
  weatherIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${response.current.weather[0].icon}.png" alt="" />`;
  console.log(weatherIcon);

  //Weather Description
  let weatherDescription = document.getElementById('description');
  weatherDescription.innerText = response.current.weather[0].description;
};

currentLocationWeather();
