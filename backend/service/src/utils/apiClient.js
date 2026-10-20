const { WEATHER_API_URL } = require("./constants");
const fetchFn = globalThis.fetch || require("node-fetch");

async function getWeather(city, apikey) {
  const url = `${WEATHER_API_URL}?q=${encodeURIComponent(city.trim())}&appid=${apikey}&units=metric&lang=it`;

  const response = await fetchFn(url);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `OpenWeather request failed with status ${response.status}`);
  }

  return response.json();
}

module.exports = { getWeather };