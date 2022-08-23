const API_KEY = "15422fdb7e3d8941f145bd52cfff322b";
const BASE_URL = "http://api.weatherstack.com/current";
const weatherContainerElem = document.querySelector(".weather");
const searchInput = document.querySelector(".search__input");
const searchBtn = document.querySelector(".search__button");

const getCurrentWeather = async (city = "Toronto") => {
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

  const textCityElem = document.querySelector(".location");
  const textTempElem = document.querySelector(".temp");
  const textDescElem = document.querySelector(".descripion");
  const textHumidityElem = document.querySelector(".humidity");
  const textWindElem = document.querySelector(".wind");
  const iconElem = document.querySelector(".icon");

  textCityElem.textContent = `Weather in ${name}, ${country}`;
  textTempElem.textContent = `${temperature} °C`;
  textDescElem.textContent = `${description}`;
  textHumidityElem.textContent = `Humidity: ${humidity}%`;
  textWindElem.textContent = `Wind speed: ${wind_speed} km/h`;
  iconElem.style.background = `no-repeat center url(${weatherIconUrl})`;
};

searchBtn.addEventListener("click", () => {
  getCurrentWeather(searchInput.value)
    .then(createWeatherInfoMarkup)
    .catch((err) => console.log(err));
  searchInput.value = "";
});
