const apiKey = "804005babc01f41e7fc5d09956e3a046";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchValue = document.querySelector(".search-input");

async function getWeather(city){
    let respone = await fetch(apiUrl + city + `&appid=${apiKey}`);
    let data = await respone.json();

    if (data.cod && data.cod === "404"){
        Swal.fire({
            title: "Błąd!",
            text: "Podane miasto nie istnieje",
            icon: "error"
          });
    }
    var city = $(".weather-city").html(data.name);
    var temp = $(".weather-temp").html(Math.floor(data.main.temp) + "&#8451");
    var humidity = $("#humidity").html(data.main.humidity + "%");
    var wind = $("#wind").html(Math.floor(data.wind.speed)  + " km/h");
    var pressure = $("#pressure").html(data.main.pressure + "hPa");
    if (data.rain && data.rain["1h"]) {
        var rain = $("#rain").html(data.rain["1h"] + " mm");
        rain = parseFloat(data.rain["1h"]);
    } else {
        $("#rain").html("0 mm")
    }

    temp = parseInt(data.main.temp);

    if (rain > 0 && rain <= 3){
        $("#weather-img").attr("src","images/rain.png");
    }else if(rain > 3) {
        $("#weather-img").attr("src","images/storm.png");
    }else {
        if (temp > 15){
            $("#weather-img").attr("src","images/sun.png");
        }
        if (temp > 10 && temp <= 14){
            $("#weather-img").attr("src","images/cloudy.png");
        }
        if (temp > 0 && temp <=10){
            $("#weather-img").attr("src","images/cloud.png");
        }
        if (temp < 0){
            $("#weather-img").attr("src","images/snow.png");
        }
    }
    return data;

    
}
$(".search-button").click(function(){
    getWeather(searchValue.value).then(data => console.log(data));
})
