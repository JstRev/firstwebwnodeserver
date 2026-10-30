const express = require("express");
const router = express.Router();
const paths = require("../../config/paths");
const path = require("path");

// Core page delivery routes
router.get("/", (req, res) => {
    res.sendFile(path.join(paths.PUBLIC, "index.html"));
});

router.get("/login", (req, res) => {
    res.sendFile(path.join(paths.PUBLIC, "login.html"));
});

router.get("/signup", (req, res) => {
    res.sendFile(path.join(paths.PUBLIC, "signup.html"));
});

router.get("/about", (req, res) => {
    res.sendFile(path.join(paths.PUBLIC, "about.html"));
});

router.get("/contact", (req, res) => {
    res.sendFile(path.join(paths.PUBLIC, "contact.html"));
});

router.get("/weather", (req, res) => {
    res.sendFile(path.join(paths.PUBLIC, "weather.html"));
});

router.get("/wanted", (req, res) => {
    res.sendFile(path.join(paths.PUBLIC, "fbi.html"));
});

router.get("/fbi", (req, res) => {
    res.sendFile(path.join(paths.PUBLIC, "fbi.html"));
});

module.exports = router;
