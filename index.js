'use strict';
const API_KEY = " "; // Here should be inserted API key. How to get it, you can read in README.md
const BASE_URL = "http://api.weatherstack.com/current";
const weatherContainerElem = document.querySelector(".weather");
const searchInput = document.querySelector(".search__input");
const searchBtn = document.querySelector(".search__button");

const fetchCurrentWeather = async (city) => {
  try {
    const response = await fetch(
      `${BASE_URL}?access_key=${API_KEY}&query=${city}`
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

const createWeatherInfoMarkup = (data) => {
  const { name, country } = data.location;
  const {
    humidity,
    temperature,
    weather_descriptions,
    weather_icons,
    wind_speed,
  } = data.current;
  const description = weather_descriptions[0];
  const weatherIconUrl = weather_icons[0];

  weatherContainerElem.innerHTML = "";
  const fragment = document.createDocumentFragment();
  const classesArray = [
    "weather__location",
    "weather__temp",
    "weather__description",
    "weather__humidity",
    "weather__wind",
  ];
  const weatherInfoValues = [
    `Weather in ${name}, ${country}`,
    `${temperature} °C`,
    `${description}`,
    `Humidity: ${humidity}%`,
    `Wind speed: ${wind_speed} km/h`,
  ];

  for (let i = 0; i < classesArray.length; i += 1) {
    const paragraph = document.createElement("p");
    paragraph.classList.add(classesArray[i]);
    fragment.append(paragraph);
  }

  for (let i = 0; i < weatherInfoValues.length; i += 1) {
    fragment.children[i].textContent = weatherInfoValues[i];
  }

  const divElem = document.createElement("div");
  divElem.classList.add("weather__icon");
  divElem.style.background = `no-repeat center url(${weatherIconUrl})`;

  fragment.children[1].after(divElem);
  weatherContainerElem.classList.remove("loading");
  weatherContainerElem.append(fragment);
};

const getCurrentWeather = () => {
  const searchValue = searchInput.value.trim();
  weatherContainerElem.classList.add("loading");
  fetchCurrentWeather(searchValue)
    .then(createWeatherInfoMarkup)
    .catch(errorHandler);
  searchInput.value = "";
};

const errorHandler = () => {
  weatherContainerElem.innerHTML = '';
  const errorParagraphElem = document.createElement("p");
  errorParagraphElem.classList.add("weather__error-text");
  errorParagraphElem.textContent = "Error! Please, try again later.";
  weatherContainerElem.classList.remove("loading");
  weatherContainerElem.append(errorParagraphElem);
};

searchBtn.addEventListener("click", () => {
  getCurrentWeather();
});

searchInput.addEventListener("keydown", (e) => {
  if (e.code === "Enter") {
    getCurrentWeather();
  }
});
