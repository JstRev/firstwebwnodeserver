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

module.exports = {
    PORT: Number(process.env.PORT) || 3000,
    WEATHER_API_KEY: process.env.WEATHER_API_KEY || "",
    NODE_ENV: process.env.NODE_ENV || "development",
};
