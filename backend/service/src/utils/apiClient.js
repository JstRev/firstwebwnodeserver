const fetchFn = globalThis.fetch || require("node-fetch");

async function getWeather(city, apikey) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city.trim())}&appid=${apikey}&units=metric&lang=it`;

  const response = await fetchFn(url);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `OpenWeather request failed with status ${response.status}`);
  }

  return response.json();
}

module.exports = { getWeather };