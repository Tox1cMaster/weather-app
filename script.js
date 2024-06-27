document.getElementById("search-input").addEventListener('change', async () => {
    const location = document.getElementById("search-input").value;
    const weatherData = await getWeatherData(location);
    displayWeatherData(weatherData);
});

const getWeatherData = async (location) => {
    if(!location) {
        return {};
    }

    const apiKey = '804005babc01f41e7fc5d09956e3a046';
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${location}&appid=${apiKey}`);
    const data = await response.json();

    return data;
}

function getRain(data){
    if (data.rain && data.rain["1h"]) {
        return data.rain["1h"];
    } else {
        return "0";
    }
}

function getImage(temp, rain){
    if (rain > 0 && rain <= 3){
        return 'images/rain.png'
    }else if(rain > 3) {
        return 'images/storm.png'
    }else {
        if (temp > 15){
            return 'images/sun.png'
        } else if (temp > 10 && temp <= 14){
            return 'images/cloudy.png'
        } else if (temp > 0 && temp <=10){
            return 'images/cloud.png'
        } else {
            return 'images/snow.png'
        }
    }
}

const displayWeatherData = (data) => {
    const weatherDataElement = document.getElementById("weather-data");

    if(Object.keys(data).length === 0){
        weatherDataElement.innerHTML = "Please enter a location to see the weather";
    } else {
        const rain = getRain(data);
        const weatherImage = getImage(Math.floor(data.main.temp), rain);

        weatherDataElement.innerHTML = ` 
            <div class="weather">
                <img id="weather-img" class="weather-img" src="${weatherImage}" alt="weather image">
                <p id="weather-city" class="weather-city">${data.name}</p>
                <p id="temp" class="weather-temp">${Math.floor(data.main.temp)}&#8451</p>
            </div>
            <div class="weather-info">
                <div class="weather-info-left">
                    <p class="weather-info-name">Rain</p>
                    <p id="rain" class="weather-info-number">${rain} mm</p>
                    <p class="weather-info-name">Humidity</p>
                    <p id="humidity" class="weather-info-number">${data.main.humidity} %</p>
                </div>
                <div class="outer">
                    <div class="inner"></div>
                </div>
                <div class="weather-info-left">
                    <p class="weather-info-name">Wind</p>
                    <p id="wind" class="weather-info-number">${Math.floor(data.wind.speed)} km/h</p>
                    <p class="weather-info-name">Pressure</p>
                    <p id="pressure" class="weather-info-number">${data.main.pressure} hPa</p>
                </div>
            </div>
        `;
    }
}

window.onload = async () => {
    const weatherData = await getWeatherData();
    displayWeatherData(weatherData);
}

// const apiKey = "804005babc01f41e7fc5d09956e3a046";
// const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// const searchValue = document.querySelector(".search-input");

// async function getWeather(city){
//     let respone = await fetch(apiUrl + city + `&appid=${apiKey}`);
//     let data = await respone.json();

//     if (data.cod && data.cod === "404"){
//         Swal.fire({
//             title: "Błąd!",
//             text: "Podane miasto nie istnieje",
//             icon: "error"
//           });
//     }
//     var city = $(".weather-city").html(data.name);
//     var temp = $(".weather-temp").html(Math.floor(data.main.temp) + "&#8451");
//     var humidity = $("#humidity").html(data.main.humidity + "%");
//     var wind = $("#wind").html(Math.floor(data.wind.speed)  + " km/h");
//     var pressure = $("#pressure").html(data.main.pressure + "hPa");
//     if (data.rain && data.rain["1h"]) {
//         var rain = $("#rain").html(data.rain["1h"] + " mm");
//         rain = parseFloat(data.rain["1h"]);
//     } else {
//         $("#rain").html("0 mm")
//     }

//     temp = parseInt(data.main.temp);

//     if (rain > 0 && rain <= 3){
//         $("#weather-img").attr("src","images/rain.png");
//     }else if(rain > 3) {
//         $("#weather-img").attr("src","images/storm.png");
//     }else {
//         if (temp > 15){
//             $("#weather-img").attr("src","images/sun.png");
//         }
//         if (temp > 10 && temp <= 14){
//             $("#weather-img").attr("src","images/cloudy.png");
//         }
//         if (temp > 0 && temp <=10){
//             $("#weather-img").attr("src","images/cloud.png");
//         }
//         if (temp < 0){
//             $("#weather-img").attr("src","images/snow.png");
//         }
//     }
//     return data;

    
// }
// $(".search-button").click(function(){
//     getWeather(searchValue.value).then(data => console.log(data));
// })
