const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const requiredEnvVars = [
    "WEATHER_API_KEY",
    "PORT",
];

requiredEnvVars.forEach((key) => {
    if (!process.env[key]) {
        console.error(`Errore: la variabile d'ambiente ${key} non è definita.`);
        process.exit(1);
    }
});

module.exports = {
    WEATHER_API_KEY: process.env.WEATHER_API_KEY,
    PORT: Number(process.env.PORT || 3000),
};