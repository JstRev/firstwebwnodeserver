const path = require("path");
const dotenv = require("dotenv");

const envCandidates = [
    path.resolve(__dirname, "../.env"),
    path.resolve(__dirname, "../../.env"),
    path.resolve(process.cwd(), ".env"),
];

envCandidates.forEach((envFilePath) => {
    dotenv.config({ path: envFilePath });
});

if (!process.env.PORT) {
    process.env.PORT = "3000";
}

if (!process.env.WEATHER_API_KEY || process.env.WEATHER_API_KEY === "your_openweather_api_key_here") {
    console.warn("Avviso: WEATHER_API_KEY non valorizzata o ancora in placeholder. Inserisci una chiave valida in backend/service/.env per chiamare OpenWeather.");
}

module.exports = {
    WEATHER_API_KEY: process.env.WEATHER_API_KEY || "",
    PORT: Number(process.env.PORT) || 3000,
};