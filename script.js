const apiKey = "804005babc01f41e7fc5d09956e3a046";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchValue = document.querySelector(".search-input");

async function getWeather(city){
    let respone = await fetch(apiUrl + city + `&appid=${apiKey}`);
    let data = await respone.json();

    var city = $(".weather-city").html(data.name);
    var temp = $(".weather-temp").html(Math.floor(data.main.temp) + "&#8451");
    var humidity = $("#humidity").html(data.main.humidity + "%");
    var wind = $("#wind").html(Math.floor(data.wind.speed)  + " km/h");
    var pressure = $("#pressure").html(data.main.pressure + "hPa");
    if (data.rain && data.rain["1h"]) {
        var rain = $("#rain").html(data.rain["1h"] + " mm");
    } else {
        $("#rain").html("0 mm")
    }

    temp = parseInt(data.main.temp);

    if (temp > 15){
        $("#weather-img").attr("src","images/sun.png");
    }
    return data;

    
}
$(".search-button").click(function(){
    getWeather(searchValue.value).then(data => console.log(data));
})
