const express = require("express");
const router = express.Router();
const { weatherController } = require("../controllers/weatherController");

// Weather lookup route
router.post("/weather", weatherController);
router.get("/weather/query", weatherController);

module.exports = router;
