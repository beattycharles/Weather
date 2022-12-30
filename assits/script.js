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
var forecastContainer = document.querySelector('#forecast');
var history = [];
var queryURL = `https://api.openweathermap.org`;
dayjs.extend(window.dayjs_plugin_utc);
dayjs.extend(window.dayjs_plugin_timezone);

function getcords(event) {
  // var cordApi = `${queryURL}/geo/1.0/direct?q=${field}&limit=5&appid=${apiKey}`;
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
    iconUrl = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    iconDescription = data.weather[0].description;
      date = dayjs().format("M/D/YYYY");
      tempF = data.main.temp;
      humidity = data.main.humidity;
      windMph = data.wind.speed;
      cityName = data.name;
      console.log(lat, lon);
      populate();
      renderItems();
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
renderForecast()
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
changeIcon.setAttribute('src', iconUrl);
changeIcon.setAttribute('alt', iconDescription);
}

function renderForecastCard(forecast) {
  // variables for data from api
  var iconUrl = `https://openweathermap.org/img/w/${forecast.weather[0].icon}.png`;
  var iconDescription = forecast.weather[0].description;
  var tempF = forecast.main.temp;
  var humidity = forecast.main.humidity;
  var windMph = forecast.wind.speed;

var col = document.createElement('div');
var card = document.createElement('div');
var cardBody = document.createElement('div');
var cardTitle = document.createElement('h5');
var weatherIcon = document.createElement('img');
var tempEl = document.createElement('p');
var windEl = document.createElement('p');
var humidityEl = document.createElement('p');

col.append(card);
card.append(cardBody);
cardBody.append(cardTitle, weatherIcon, tempEl, windEl, humidityEl);

col.setAttribute('class', 'col-md');
col.classList.add('five-day-card');
card.setAttribute('class', 'card bg-primary h-100 text-white');
cardBody.setAttribute('class', 'card-body p-2');
cardTitle.setAttribute('class', 'card-title');
tempEl.setAttribute('class', 'card-text');
windEl.setAttribute('class', 'card-text');
humidityEl.setAttribute('class', 'card-text');

  // Add content to elements
  cardTitle.textContent = dayjs(forecast.dt_txt).format('M/D/YYYY');
  weatherIcon.setAttribute('src', iconUrl);
  weatherIcon.setAttribute('alt', iconDescription);
  tempEl.textContent = `Temp: ${tempF} °F`;
  windEl.textContent = `Wind: ${windMph} MPH`;
  humidityEl.textContent = `Humidity: ${humidity} %`;

  forecastContainer.append(col);
}

function renderForecast(response) {
  // Create unix timestamps for start and end of 5 day forecast
  var startDt = dayjs().add(1, 'day').startOf('day').unix();
  var endDt = dayjs().add(6, 'day').startOf('day').unix();

  var headingCol = document.createElement('div');
  var heading = document.createElement('h4');

  headingCol.setAttribute('class', 'col-12');
  heading.textContent = '5-Day Forecast:';
  headingCol.append(heading);

  forecastContainer.innerHTML = '';
  forecastContainer.append(headingCol);

  for (var i = 0; i < response.list.length; i++) {

    // First filters through all of the data and returns only data that falls between one day after the current data and up to 5 days later.
    if (response[i].dt >= startDt && response[i].dt < endDt) {

      // Then filters through the data and returns only data captured at noon for each day.
      if (response[i].dt_txt.slice(11, 13) == "12") {
        renderForecastCard(response[i]);
      }
    }
  }
}

  function renderItems() {
    renderForecast(data);
  }
  
  function fetchWeather(location) {
    var { lat } = location;
    var { lon } = location;
    var city = location.name;
  
    var apiUrl = `${queryURL}/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
  
    fetch(apiUrl)
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        renderItems(city, data);
      })
      .catch(function (err) {
        console.error(err);
      });
  }
scity.addEventListener("click", getcords);
