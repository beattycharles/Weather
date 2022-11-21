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
var fiveKey = "58f8763bd14af70e49cec94f73742629";
var field = 'Hainseport'; //document.querySelector("#searchInput");
var buttonA = document.querySelector("#Search");
var scity = document.querySelector("#scity");
var cityName = document.querySelector("#cityName");
var history = [];
var queryURL = `https://api.openweathermap.org`;
function populate() {
//   var { lat };
//   var { lon };
console.log(getcords);
  var cweather = `${queryURL}/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

  fetch(cweather)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
}

function getcords() {
    console.log(field);
  var cordApi = `${queryURL}/geo/1.0/direct?q=${field}&limit=5&appid=${apiKey}`;
 // var cordApi = `http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=${apiKey}`;
 fetch(cordApi)
.then(function (res) {
    return res.json();
  })
  .then(function (data) {
      if (!field[0]) {
          alert('Location not found');
      } else {
          populate();
      }
  })
  .catch(function (err) {
      console.error(err);
  });
}
scity.addEventListener("click", getcords);

//localStorage.set("input");
//for (var i = 0; i < 5; i++)
//append btn for history items
