import playList from "./playList";

// Date & Time

const time = document.querySelector(".time");
const date = document.querySelector(".date");
const greeting = document.querySelector(".greeting");
const input = document.querySelector(".name");
input.setAttribute("placeholder", "[enter name]");

function showTime() {
  const currentDate = new Date();
  const currentTime = currentDate.toLocaleTimeString();
  time.textContent = currentTime;
  const options = {
    month: "long",
    day: "numeric",
  };
  date.textContent = currentDate.toLocaleDateString("en-Us", options);
  showGreeting();
  setTimeout(showTime, 1000);
}
showTime();

// Greeteing

function showGreeting() {
  const timeOfDay = getTimeOfDay();
  const greetingText = `Good ${timeOfDay}`;
  greeting.innerHTML = greetingText;

  function getTimeOfDay() {
    const currentDate = new Date();
    const hours = currentDate.getHours();
    if (hours >= 6 && hours < 12) {
      return "morning";
    }
    if (hours >= 12 && hours < 18) {
      return "afternoon";
    }
    if (hours >= 18 && hours < 24) {
      return "evening";
    }
    if (hours >= 0 && hours < 6) {
      return "night";
    }
  }
}

// LocalStorage

function setLocalStorage() {
  localStorage.setItem("name", input.value);
}
window.addEventListener("beforeunload", setLocalStorage);

function getLocalStorage() {
  if (localStorage.getItem("name")) {
    input.value = localStorage.getItem("name");
  }
}
window.addEventListener("load", getLocalStorage);

// Weather

const city = document.querySelector(".city");
const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature");
const weatherDescription = document.querySelector(".weather-description");
const windSpeed = document.querySelector(".wind");
const humidity = document.querySelector(".humidity");

function setCity(event) {
  if (event.code === "Enter") {
    getWeather();
    city.blur();
  }
}

document.addEventListener("DOMContentLoaded", getWeather);
city.addEventListener("keypress", setCity);

// function citySetLocalStorage() {
//   localStorage.setItem("city", city.value);
// }
// window.addEventListener("beforeinput", citySetLocalStorage);

// function cityGetLocalStorage() {
//   if (localStorage.getItem("city")) {
//     city.value = localStorage.getItem("city");
//   }
// }

// window.addEventListener("load", cityGetLocalStorage);

async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=de6eaa2d57fccbdef9290b2a14348434&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${data.main.temp}°C`;
  weatherDescription.textContent = data.weather[0].description;
  windSpeed.textContent = `Wind speed: ${data.wind.speed} m/s`;
  humidity.textContent = `Humidity: ${data.main.humidity}%`;
}
getWeather();

// Get image from API

async function image() {
  const imagePromise = await fetch(
    "https://api.unsplash.com/photos/random?orientation=landscape&query=nature&client_id=e2077ad31a806c894c460aec8f81bc2af4d09c4f8104ae3177bb809faf0eac17"
  );
  const data = await imagePromise.json();
  document.body.style.backgroundImage = `url('${data.urls.regular}')`;
}

const slidePrev = document.querySelector(".slide-prev");
const slideNext = document.querySelector(".slide-next");

slidePrev.addEventListener("click", image);
slideNext.addEventListener("click", image);

// Quotes

const quote = document.querySelector(".quote");
const author = document.querySelector(".author");
const changeQuote = document.querySelector(".change-quote");

function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

async function quotes() {
  const quotesPromise = await fetch("https://type.fit/api/quotes");
  const res = await quotesPromise.json();
  const item = res[getRandomNum(1, res.length)];
  quote.textContent = `"${item.text}"`;
  author.textContent = `${item.author}`;
}
quotes();

changeQuote.addEventListener("click", quotes);

// Audio

const play = document.querySelector(".play");
const playPrev = document.querySelector(".play-prev");
const playNext = document.querySelector(".play-next");
const ul = document.querySelector(".play-list");
let playNum = 0;
let isPlay = false;

for (let i = 0; i < playList.length; i++) {
  const li = document.createElement("li");
  li.classList.add("play-item");
  li.setAttribute("data-num", `${i}`);
  li.textContent = playList[i].title;
  ul.append(li);
  console.log(i);
}

// playList.forEach((element) => {
//   const li = document.createElement("li");
//   li.classList.add("play-item");
//   li.setAttribute("data-num", ``);
//   li.textContent = element.title;
//   ul.append(li);
// });

const playListItem = document.querySelectorAll(".play-item");
playListItem.forEach((element) => {
  console.log(element.getAttribute("data-num"));
});

function playOnTouch(e) {}

const audio = new Audio();

function togglePlayAudio() {
  audio.src = playList[playNum].src;
  if (isPlay == false) {
    isPlay = true;
    audio.play();

    play.classList.add("pause");
    play.classList.remove("play");
    playListItem[playNum].classList.add("item-active");
  } else {
    isPlay = false;
    audio.pause();
    play.classList.add("play");
    play.classList.remove("pause");
    playListItem[playNum].classList.remove("item-active");
  }
}
audio.addEventListener("ended", audioEnded);
console.log(isPlay);

function audioEnded() {
  isPlay = false;
  play.classList.add("play");
  play.classList.remove("pause");
  playListItem[playNum].classList.remove("item-active");
}

play.addEventListener("click", togglePlayAudio);
// play.addEventListener("click", toggleButton);
// play.addEventListener("click", playListActive);

function playAudio() {
  audio.src = playList[playNum].src;
  audio.play();
  play.classList.add("pause");
  play.classList.remove("play");
  console.log(isPlay);
}

function next() {
  if (playNum < playList.length - 1) {
    playNum++;
  } else {
    playNum = 0;
    playListItem[playList.length - 1].classList.remove("item-active");
  }
  playAudio();
  playListItem[playNum].classList.add("item-active");
  playListItem[playNum - 1].classList.remove("item-active");
}

function prev() {
  if (playNum > 0) {
    playNum--;
  } else {
    playNum = playList.length - 1;
    playListItem[0].classList.remove("item-active");
  }
  playAudio();
  playListItem[playNum].classList.add("item-active");
  playListItem[playNum + 1].classList.remove("item-active");
}

playPrev.addEventListener("click", prev);
playNext.addEventListener("click", next);

// Create Playlist
