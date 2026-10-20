const express = require("express");
const path = require("path");
const router = express.Router();
const { PUBLIC } = require("../../config/paths");

router.get("/", (req, res) => {
    res.sendFile(path.join(PUBLIC, "index.html"));
});

router.get("/login", (req, res) => {
    res.sendFile(path.join(PUBLIC, "login.html"));
});

router.get("/about", (req, res) => {
    res.sendFile(path.join(PUBLIC, "about.html"));
});

router.get("/contact", (req, res) => {
    res.sendFile(path.join(PUBLIC, "contact.html"));
});

router.get("/signup", (req, res) => {
    res.sendFile(path.join(PUBLIC, "signup.html"));
});

router.get("/signin", (req, res) => {
    res.sendFile(path.join(PUBLIC, "signup.html"));
});

router.get("/weather", (req, res) => {
    res.sendFile(path.join(PUBLIC, "weather.html"));
});

module.exports = router;