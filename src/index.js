// Date & Time



const time = document.querySelector('.time')
const date = document.querySelector('.date')
const currentDate = new Date()
const currentTime = currentDate.toLocaleTimeString()
time.textContent = currentTime
date.textContent = currentDate.toLocaleDateString()

// Weather

const city = document.querySelector('.city');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature')
const weatherDescription = document.querySelector('.weather-description');
const windSpeed = document.querySelector('.wind');
const humidity = document.querySelector('.humidity')

city.addEventListener('change', getWeather)


async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=de6eaa2d57fccbdef9290b2a14348434&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.weather[0].id, data.weather[0].description, data.main.temp);
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${data.main.temp}°C`;
    weatherDescription.textContent = data.weather[0].description;
    windSpeed.textContent = `Wind speed: ${data.wind.speed} m/s`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`
}
getWeather()