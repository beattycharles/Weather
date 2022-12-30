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
var forecastContainer = document.querySelector("#forecast");
var history = [];
var queryURL = `https://api.openweathermap.org`;

var changeDate = document.querySelector(".date");
var changeTemp = document.querySelector(".tempF");
var changeIcon = document.querySelector(".icon");
var changeHumid = document.querySelector(".humidity");
var changeWind = document.querySelector(".windMph");
var changeCity = document.querySelector(".cName");

var currDate = null;
var currTempF = null;
var currHumidity = null;
var currWindMph = null;
var currCityName = null;
var currIconUrl = null;
var currIconDescription = null;
var lat = null;
var lon = null;


// console.log(document.querySelector('#searchInput'));
dayjs.extend(window.dayjs_plugin_utc);
dayjs.extend(window.dayjs_plugin_timezone);

function getCoords(event) {
  event.preventDefault();
  var field = document.querySelector("#searchInput").value;
  fetch(
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
      currIconUrl = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
      currIconDescription = data.weather[0].description;
      currDate = dayjs().format("M/D/YYYY");
      currTempF = data.main.temp;
      currHumidity = data.main.humidity;
      currWindMph = data.wind.speed;
      currCityName = data.name;
      // render current weather to screen
      renderCurrentWeather();
      // run fetch to get forecast weather
      fetchForecastWeatherAndRender(lat, lon);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function fetchForecastWeatherAndRender(lat, lon, data) {
  var forecastWeather =
    "https://api.openweathermap.org/data/3.0/onecall?lat=" +
    lat +
    "&lon=" +
    lon +
    "&units=imperial&appid=" +
    apiKey;
  fetch(forecastWeather)
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      renderForecast()
    renderForecastCard(data)
    })
    .catch((err) => console.error(err));
}

function renderCurrentWeather() {
  changeCity.innerHTML = currCityName.toUpperCase();
  changeDate.innerHTML = "Date: " + currDate;
  changeTemp.innerHTML = "Tempiture " + currTempF + "f";
  changeHumid.innerHTML = "Humidity " + currHumidity;
  changeWind.innerHTML = "Wind Speed " + currWindMph + "mph";
  changeIcon.setAttribute("src", currIconUrl);
  changeIcon.setAttribute("alt", currIconDescription);
}

function renderForecastCard(data) { 
  for (let i=0; i< data.daily.length; i++) {
  if ( i == 1 || i == 2 || i == 3 || i == 4 || i == 5 ) {

  // variables for data from api
  var iconUrl = `https://openweathermap.org/img/w/${data.daily[i].weather[0].icon}.png`;
  var iconDescription = data.weather[i].description;
  var tempF = data.daily[i].temp.day;
  var humidity = data.daily[i].humidity;
  var windMph = data.daily[1].wind_speed;

  var col = document.createElement("div");
  var card = document.createElement("div");
  var cardBody = document.createElement("div");
  var cardTitle = document.createElement("h5");
  var weatherIcon = document.createElement("img");
  var tempEl = document.createElement("p");
  var windEl = document.createElement("p");
  var humidityEl = document.createElement("p");

  col.append(card);
  card.append(cardBody);
  cardBody.append(cardTitle, weatherIcon, tempEl, windEl, humidityEl);

  col.setAttribute("class", "col-md");
  col.classList.add("five-day-card");
  card.setAttribute("class", "card bg-primary h-100 text-white");
  cardBody.setAttribute("class", "card-body p-2");
  cardTitle.setAttribute("class", "card-title");
  tempEl.setAttribute("class", "card-text");
  windEl.setAttribute("class", "card-text");
  humidityEl.setAttribute("class", "card-text");

  // Add content to elements
  cardTitle.textContent = dayjs().format("M/D/YYYY");
  weatherIcon.setAttribute("src", iconUrl);
  weatherIcon.setAttribute("alt", iconDescription);
  tempEl.textContent = `Temp: ${tempF} °F`;
  windEl.textContent = `Wind: ${windMph} MPH`;
  humidityEl.textContent = `Humidity: ${humidity} %`;

  forecastContainer.append(col);
}
}
}

function renderForecast() {

  var headingCol = document.createElement("div");
  var heading = document.createElement("h4");

  headingCol.setAttribute("class", "col-12");
  heading.textContent = "5-Day Forecast:";
  headingCol.append(heading);

  forecastContainer.innerHTML = "";
  forecastContainer.append(headingCol);
}

scity.addEventListener("click", getCoords);
