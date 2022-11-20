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
var apiKey = "28fa50af6fcacf05e7ddaa69610333c7";
var fiveKey ="58f8763bd14af70e49cec94f73742629";
var city;
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;
var buttonA = document.querySelector('#Search');
var cityName = document.querySelector('#cityName');
localStorage.setItem("city", 'buttonA');

city = buttonA
console.log(city)
function populate(){
    fetch("queryURL")
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
}
populate()