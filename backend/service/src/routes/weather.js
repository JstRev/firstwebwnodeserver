const express = require("express");
const router = express.Router();
const { getWeather } = require("../controllers/weatherController");

router.post("/weather", getWeather);

module.exports = router;