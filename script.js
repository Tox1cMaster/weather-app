const apiKey = "804005babc01f41e7fc5d09956e3a046";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchValue = document.querySelector(".search-input");

async function getWeather(city){
    let respone = await fetch(apiUrl + city + `&appid=${apiKey}`);
    let data = await respone.json();

    var city = $(".weather-city").html(data.name);
    return data;

    
}
$(".search-button").click(function(){
    getWeather(searchValue.value).then(data => console.log(data));
})
