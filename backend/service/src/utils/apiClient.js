const fetch = require("node-fetch");

async function getWeather(city, apiKey) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${encodeURIComponent(apiKey)}&units=metric`;
    const response = await fetch(url, {
        headers: {
            "Accept": "application/json",
            "User-Agent": "SkyFlow-Weather-Client/1.0"
        },
        timeout: 8000
    });
    return response.json();
}

module.exports = { getWeather };
