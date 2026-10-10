function normalizeWeather(data) {
  if (!data || !data.main || !Array.isArray(data.weather) || data.weather.length === 0) {
    return {
      ok: false,
      message: "Dati meteo non disponibili.",
    };
  }

  const city = data.name || "Città sconosciuta";
  const condition = data.weather[0]?.description || "Condizioni non disponibili";
  const temperature = Number(data.main.temp ?? 0);
  const humidity = Number(data.main.humidity ?? 0);
  const wind = Number(data.wind?.speed ?? 0);

  return {
    ok: true,
    city,
    condition: condition.charAt(0).toUpperCase() + condition.slice(1),
    temperature,
    humidity,
    wind,
    message: `Meteo attuale a ${city}: ${condition}.`,
  };
}

module.exports = { normalizeWeather };
