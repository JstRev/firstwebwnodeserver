const express = require("express");
const router = express.Router();
const { weatherController } = require(" .. /controllers/weatherController");

router.post("/weather", weatherController);

module.exports = router;