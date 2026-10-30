const express = require("express");
const router = express.Router();
const { login } = require("../controllers/authController");
const { signInController } = require("../controllers/signInController");

// Authentication routes
router.post("/login", login);
router.post("/signup", signInController);

module.exports = router;
