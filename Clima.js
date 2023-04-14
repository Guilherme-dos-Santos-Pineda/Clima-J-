// Regras Consumir uma API
// Tem que ser Compativel mundialmente
// Tem que ter animação que mude dependendo do clima

// 5bcc12ca410fab836c7341ea82bc90dc

const apiKey = "5bcc12ca410fab836c7341ea82bc90dc";
const apiCountryURL = "https://www.countryflagicons.com/FLAT/64/";
//https://countryflagsapi.com/png/
const apiUnsplash = "https://source.unsplash.com/1600x900/?";

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const humidityElement = document.querySelector("#umidity span");
const windElement = document.querySelector("#wind span");

const WeatherContainer = document.querySelector("#weather-data")

// Funções
const getWeatherData = async(city)=>{

    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    const res = await fetch(apiWeatherURL);
    const data = await res.json();

    return data;
}


const showWeatherData = async (city)=>{
    const data = await getWeatherData(city);

    cityElement.innerText = data.name;
    tempElement.innerText = parseInt(data.main.temp);
    descElement.innerText = data.weather[0].description;
    weatherIconElement.setAttribute(
        "src", 
    `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
    );
    countryElement.setAttribute("src", apiCountryURL +  data.sys.country + '.png');
    humidityElement.innerText = `${data.main.humidity}%`;
    windElement.innerText = `${data.wind.speed}km/h`;

    document.body.style.backgroundImage = `url("${apiUnsplash + city}")`;

    WeatherContainer.classList.remove("hide")

}

// Eventos
searchBtn.addEventListener("click", (e)=>{
    e.preventDefault()

    const city = cityInput.value;

    showWeatherData(city);

})

cityInput.addEventListener("keyup", (e)=>{

    if (e.code === "Enter"){
        const city = e.target.value;

        showWeatherData(city);
    };
});



