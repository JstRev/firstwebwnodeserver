const express = require("express");
const path = require("path");
const paths = require("../../config/paths");

const router = express.Router();

/**
 * Route GET per servire le pagine HTML statiche del frontend.
 * I file inviati si trovano nella cartella frontend/public/html.
 */
router.get("/", (req, res) => {
    res.sendFile(path.join(paths.HTML, "index.html"));
});

router.get("/login", (req, res) => {
    res.sendFile(path.join(paths.HTML, "login.html"));
});

router.get("/signup", (req, res) => {
    res.sendFile(path.join(paths.HTML, "signup.html"));
});

router.get("/about", (req, res) => {
    res.sendFile(path.join(paths.HTML, "about.html"));
});

router.get("/contact", (req, res) => {
    res.sendFile(path.join(paths.HTML, "contact.html"));
});

router.get("/weather", (req, res) => {
    res.sendFile(path.join(paths.HTML, "weather.html"));
});

router.get(["/fbi", "/FBI", "/wanted"], (req, res) => {
    res.sendFile(path.join(paths.HTML, "FBI.html"));
});

module.exports = router;
