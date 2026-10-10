const { getWeather } = require("../utils/apiClient.js");
const { normalizeWeather } = require("../utils/normalizeWeather");
const { validateCity } = require("../utils/validateCity");
const { WEATHER_API_KEY } = require("../utils/constants");
const { logError } = require("../utils/logger");

exports.weatherController = async (req, res) => {
  const city = (req.body?.city || req.query?.city || "").toString().trim();

  if (!validateCity(city)) {
    return res.status(400).json({
      ok: false,
      message: "Città non valida",
    });
  }

  try {
    const data = await getWeather(city, WEATHER_API_KEY);

    if (data?.cod !== 200) {
      return res.status(404).json({
        ok: false,
        message: data?.message || "Città non trovata",
      });
    }

    const normalizedWeather = normalizeWeather(data);

    if (!normalizedWeather.ok) {
      return res.status(400).json(normalizedWeather);
    }

    return res.status(200).json(normalizedWeather);
  } catch (err) {
    logError(err, "weatherController");
    return res.status(500).json({
      ok: false,
      message: "Errore nel server",
    });
  }
};