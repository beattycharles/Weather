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
var field = "trenton"//document.querySelector('#searchInput').value;
var buttonA = document.querySelector("#Search");
var scity = document.querySelector("#scity");
var cityName = document.querySelector("#mainCityName");
var history = [];
var queryURL = `https://api.openweathermap.org`;

function getcords() {
  // var cordApi = `${queryURL}/geo/1.0/direct?q=${field}&limit=5&appid=${apiKey}`;

  fetch(
   // `https://api.openweathermap.org/data/2.5/weather?q=${field}&limit=5&appid=${apiKey}`
     "https://api.openweathermap.org/data/2.5/weather?q=" +
       field +
      "&appid=" +
      apiKey
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      let lat = data.coord.lat;
      let lon = data.coord.lon;
      console.log(lat, lon);
    });
  //.catch(function (error) {
  // console.log(error);
}

// .then(function (field) {
//     if (!field[0]) {
//         alert('Location not found');
//     } else {
//     populate();
//     }
//     })
//     .catch(function (err) {
//     console.error(err);
//     });

// };

// function populate(lat, lon) {
//   var lat = getcords.lat;
//   var lon = getcords.lon;
//   var currantWeather =
//     "https://api.openweathermap.org/data/2.5/forecast?lat=" +
//     lat +
//     "&lon=" +
//     lon +
//     "&units=imperial&appid=" +
//     apiKey;
//   fetch(currantWeather)
//     .then((response) => response.json())
//     .then((response) => console.log(response))
//     .catch((err) => console.error(err));
//   console.log(getcords);
// }
scity.addEventListener("click", getcords);

//localStorage.set("input");
//for (var i = 0; i < 5; i++)
//append btn for history items
