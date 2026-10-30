const { fetchWeatherData } = require("../services/weatherService");
const { logError } = require("../utils/logger");

exports.weatherController = async (req, res) => {
    const city = req.body.city || req.query.city;

    if (!city) {
        return res.status(400).json({
            error: true,
            success: false,
            message: "City name is required."
        });
    }

    try {
        const result = await fetchWeatherData(city);

        if (!result.success) {
            return res.status(result.status || 400).json({
                error: true,
                success: false,
                message: result.message
            });
        }

        return res.json({
            error: false,
            success: true,
            ...result.data
        });
    } catch (err) {
        logError(err);
        return res.status(500).json({
            error: true,
            success: false,
            message: "Internal server error occurred while retrieving weather data."
        });
    }
};
