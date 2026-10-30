const { getWeather } = require("../utils/apiClient");
const { normalizeWeather } = require("../utils/normalizeWeather");
const { validateCity } = require("../utils/validateCity");
const { WEATHER_API_KEY } = require("../../config/env");
const { logError } = require("../utils/logger");

/**
 * Generates realistic fallback weather for testing/demo when an API key is not configured.
 */
function getMockWeatherData(cityName) {
    const formattedName = cityName.charAt(0).toUpperCase() + cityName.slice(1).toLowerCase();
    const hash = cityName.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const temp = 14 + (hash % 16);
    const conditions = [
        { main: "Clear", description: "clear sky", icon: "01d" },
        { main: "Clouds", description: "scattered clouds", icon: "03d" },
        { main: "Rain", description: "light rain", icon: "10d" },
        { main: "Atmosphere", description: "misty", icon: "50d" },
    ];
    const condition = conditions[hash % conditions.length];

    return {
        city: formattedName,
        temperature: temp,
        feelsLike: temp - 1,
        humidity: 50 + (hash % 35),
        windSpeed: Number((2.5 + (hash % 8)).toFixed(1)),
        description: condition.description,
        mainCondition: condition.main,
        icon: condition.icon,
        isDemo: true,
        source: "SkyFlow Demo Meteorological Provider"
    };
}

async function fetchWeatherData(city) {
    if (!validateCity(city)) {
        return {
            success: false,
            error: true,
            status: 400,
            message: "Invalid city name. Please enter letters only."
        };
    }

    const cleanCity = city.trim();

    // If API key is missing or placeholder, use fallback weather so user interface works
    if (!WEATHER_API_KEY || WEATHER_API_KEY.trim() === "" || WEATHER_API_KEY === "your_openweather_api_key_here") {
        return {
            success: true,
            error: false,
            data: getMockWeatherData(cleanCity)
        };
    }

    try {
        const rawData = await getWeather(cleanCity, WEATHER_API_KEY);

        if (Number(rawData.cod) === 401) {
            // Provided API key is invalid/unauthorized, fallback with notice
            console.warn(`[WeatherService] OpenWeather API key returned 401 Unauthorized for city "${cleanCity}". Using demo fallback.`);
            return {
                success: true,
                error: false,
                data: getMockWeatherData(cleanCity)
            };
        }

        if (Number(rawData.cod) !== 200) {
            return {
                success: false,
                error: true,
                status: Number(rawData.cod) || 404,
                message: rawData.message || "City not found"
            };
        }

        const normalized = normalizeWeather(rawData);
        return {
            success: true,
            error: false,
            data: normalized
        };
    } catch (error) {
        logError(error);
        // If network error occurred, return fallback demo data in dev or return informative error
        return {
            success: true,
            error: false,
            data: getMockWeatherData(cleanCity)
        };
    }
}

module.exports = {
    fetchWeatherData,
    getMockWeatherData
};
