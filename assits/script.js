// AS A traveler
// I WANT to see the weather outlook for multiple cities
// SO THAT I can plan a trip accordingly
// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
//make sure it shows if paris, france or paris,texas
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
var apiKey = "321bc0050e72840da90a05b26a6fc827";
var scity = document.querySelector("#scity");
var cityName = document.querySelector("#mainCityName");
var history = [];
var queryURL = `https://api.openweathermap.org`;
dayjs.extend(window.dayjs_plugin_utc);
dayjs.extend(window.dayjs_plugin_timezone);

function getcords(event) {
  // var cordApi = `${queryURL}/geo/1.0/direct?q=${field}&limit=5&appid=${apiKey}`;
  event.preventDefault();
  var field = document.querySelector("#searchInput").value;
  fetch(
    // `https://api.openweathermap.org/data/2.5/weather?q=${field}&limit=5&appid=${apiKey}`
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      field +
      "&units=imperial&appid=" +
      apiKey
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    lat = data.coord.lat;
    lon = data.coord.lon;
    weather = data.weather.icon
      date = dayjs().format("M/D/YYYY");
      icon = weather;
      tempF = data.main.temp;
      humidity = data.main.humidity;
      windMph = data.wind.speed;
      cityName = data.name;
      console.log(lat, lon);
      populate();
    })
    .catch(function (error) {
      console.log(error);
    });
}

function populate() {
  var currantWeather =
    "https://api.openweathermap.org/data/2.5/forecast?lat=" +
    lat +
    "&lon=" +
    lon +
    "&units=imperial&appid=" +
    apiKey;
  fetch(currantWeather)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
showInfo()
}

function showInfo(){
var changeDate = document.querySelector(".date");
var changeTemp = document.querySelector(".tempF");
var changeIcon = document.querySelector(".icon");
var changeHumid = document.querySelector(".humidity");
var changeWind = document.querySelector(".windMph");
var changeCity = document.querySelector(".cName");

changeCity.innerHTML = cityName.toUpperCase();
changeDate.innerHTML = "Date: " + date;
changeTemp.innerHTML = "Tempiture " + tempF + "f";
changeHumid.innerHTML = "Humidity " + humidity;
changeWind.innerHTML = "Wind Speed " + windMph + "mph";
changeIcon.innerHTML = changeIcon;
 // .textContent = dayjs(forecast.dt_txt).format('M/D/YYYY')
}
scity.addEventListener("click", getcords);
//localStorage.set("input");
//for (var i = 0; i < 5; i++)
//append btn for history items
