const WEATHER_API_CONFIG = {
    baseUrl: "https://api.openweathermap.org/data/2.5/weather",
    apiKey: process.env.OPENWEATHER_API_KEY || "11285f08bb363a34dda96432d5c6eb8b",
    units: "metric",
    lang: "it",
};

const getWeatherApiConfig = () => ({
    ...WEATHER_API_CONFIG,
});

const buildWeatherApiUrl = (city) => {
    const { baseUrl, apiKey, units, lang } = getWeatherApiConfig();

    return `${baseUrl}?q=${encodeURIComponent(city)}&appid=${apiKey}&units=${units}&lang=${lang}`;
};

module.exports = {
    WEATHER_API_CONFIG,
    getWeatherApiConfig,
    buildWeatherApiUrl,
};
