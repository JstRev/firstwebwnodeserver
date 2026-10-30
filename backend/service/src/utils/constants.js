const env = require("../../config/env");

module.exports = {
    DEFAULT_PORT: 3000,
    DEFAULT_WEATHER_CITY: "Rome",
    API_PREFIX: "/api/v1",
    WEATHER_API_KEY: env.WEATHER_API_KEY,
    PORT: env.PORT,
};
