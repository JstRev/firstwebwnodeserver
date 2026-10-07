const { buildWeatherApiUrl, getWeatherApiConfig } = require("../utils/weatherApi");

const getWeather = async (req, res) => {
    const city = String(req.body.city || "").trim();

    if (!city) {
        return res.status(400).json({
            ok: false,
            message: "Inserisci il nome di una città.",
        });
    }

    try {
        const response = await fetch(buildWeatherApiUrl(city));
        const data = await response.json();

        if (!response.ok || data.cod !== 200) {
            return res.status(response.status || 400).json({
                ok: false,
                message: data.message || "Città non trovata.",
            });
        }

        return res.json({
            ok: true,
            city: data.name,
            condition: data.weather[0].description,
            temperature: Math.round(data.main.temp),
            humidity: data.main.humidity,
            wind: data.wind.speed,
            message: `Meteo a ${data.name}: ${data.weather[0].description} con ${Math.round(data.main.temp)}°C.`,
        });
    } catch (error) {
        console.error("Weather API error:", error);
        return res.status(500).json({
            ok: false,
            message: "Errore nel server durante la richiesta meteo.",
        });
    }
};

module.exports = {
    getWeather,
    getWeatherApiConfig,
};
