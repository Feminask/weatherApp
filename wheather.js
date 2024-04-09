const apiKey = '5b4bee0ba241d092159faf007e166080'
async function fetchWeatherdata(cityname){
   
try{const response = await fetch( `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&units=metric&appid=${apiKey}`);
// .then(result=>result.json())
//     // .then(result=>{console.log(result);})
//     .then(result => displayData(result))
if (!response.ok) {
                 throw new Error("Unable to fetch weather data");
            }
const data =await response.json();





console.log(data);


displayData(data);
}
catch(error){
    console.error(error);
    document.getElementById("w_app").innerHTML = "Location not found!";

}
}


const cityElement=document.querySelector('.city')
const country=document.querySelector('.country')

const temperature=document.querySelector('.temp')
const feelsLike=document.querySelector('.feels-level')

const sunRise=document.querySelector('.rise-time')
const sunSet=document.querySelector('.set-time')

const windspeed =document.querySelector('.wind-speed')
const humidity =document.querySelector('.humidity')
const pressure =document.querySelector('.pressure')
const weatherMain=document.querySelector('.weather-Main')
const date=document.querySelector('.date')
// const time=document.querySelector('.time')
const description=document.querySelector('.description')

const descriptionIcon=document.querySelector('.main i')

function displayData(dataArray) {

    cityElement.textContent =dataArray.name;
    country.textContent=dataArray.sys.country;
    temperature.textContent =`${Math.round(dataArray.main.temp)}°C`
    feelsLike.textContent =`${dataArray.main.feels_like}°C`
    
    var Sunrise = dataArray.sys.sunrise;
    var Sunset = dataArray.sys.sunset;

    // Convert Unix timestamps to Date objects
    var sunriseDate = new Date(Sunrise * 1000); // Multiply by 1000 to convert seconds to milliseconds
    var sunsetDate = new Date(Sunset * 1000);

    sunRise.textContent = sunriseDate.toLocaleTimeString();
    sunSet.textContent = sunsetDate.toLocaleTimeString();

    windspeed.textContent =`${dataArray.wind.speed}km/hr`
    humidity.textContent =`${dataArray.main.humidity}%`
    pressure.textContent=`${dataArray.main.pressure}hPa`
    weatherMain.textContent=dataArray.weather[0].main
    description.textContent=dataArray.weather[0].description

    const currentDate= new Date();
    date.textContent=currentDate.toDateString();

    // const currentTime = new Date();
    // time.textContent = currentTime.toLocaleTimeString();




    const WeatherIconName= getWeatherIconName(dataArray.weather[0].main
        )
    descriptionIcon.innerHTML=`<i class="material-icons">${WeatherIconName}</i>`

}

const formElement = document.querySelector('.search-form')
const inputElement= document.querySelector('.city-input')
formElement.addEventListener('submit',function(e){
    e.preventDefault();
    const cityname = inputElement.value;
if(cityname!==''){
    fetchWeatherdata(cityname);
    inputElement.value = "";
}

});
function getWeatherIconName(weatherCondition) {
       const iconMap = {
          Clear: "wb_sunny",
            Clouds: "wb_cloudy",
            Rain: "umbrella",
            Thunderstorm: "flash_on",
            Drizzle: "grain",
            Snow: "ac_unit",
            Mist: "cloud",
            Smoke: "cloud",
            Haze: "cloud",
            Fog: "cloud",
        };
        return iconMap[weatherCondition] || "help";
}