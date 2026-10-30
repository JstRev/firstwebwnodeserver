function normalizeWeather(data) {
    const weatherItem = (data.weather && data.weather[0]) || {};
    const main = data.main || {};
    const wind = data.wind || {};
    const sys = data.sys || {};

    return {
        city: data.name || "Unknown Location",
        country: sys.country || "",
        temperature: Math.round(main.temp ?? 0),
        feelsLike: Math.round(main.feels_like ?? main.temp ?? 0),
        humidity: main.humidity ?? 0,
        pressure: main.pressure ?? 1013,
        windSpeed: Number(wind.speed ?? 0),
        mainCondition: weatherItem.main || "Clear",
        description: weatherItem.description || "clear sky",
        icon: weatherItem.icon || "01d",
        isDemo: false
    };
}

module.exports = { normalizeWeather };
