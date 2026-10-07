const express = require("express");
const router = express.Router();
const path = require("path");

const frontendDir = path.resolve(__dirname, "..", "..", "..", "..", "frontend", "public");

router.get("/", (req, res) => {
    res.sendFile(path.join(frontendDir, "index.html"));
});

router.get("/login", (req, res) => {
    res.sendFile(path.join(frontendDir, "login.html"));
});

router.get("/about", (req, res) => {
    res.sendFile(path.join(frontendDir, "about.html"));
});

router.get("/contact", (req, res) => {
    res.sendFile(path.join(frontendDir, "contact.html"));
});

router.get("/signup", (req, res) => {
    res.sendFile(path.join(frontendDir, "signup.html"));
});

router.get("/signin", (req, res) => {
    res.sendFile(path.join(frontendDir, "signup.html"));
});

router.get("/weather", (req, res) => {
    res.sendFile(path.join(frontendDir, "weather.html"));
});

module.exports = router;