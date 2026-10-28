// Raccolgo qui tutte le routes delle pages, i percorsi utili per inviare le pagine statiche
// Tutti i GET delle pagine principali sono gestiti qui

const express = require("express"); // Importa il framework Express.
const router = express.Router(); // Crea un router Express per gestire le rotte.
const paths = require("../../config/paths"); // Importa i percorsi definiti nel file paths.js.
const path = require("path"); // Importa il modulo per gestire i percorsi dei file.


router.get("/", (req, res) => { // Definisce la route GET per la home page.
    res.sendFile(path.join(paths.PUBLIC, "index.html")); // Invia il file index.html al browser.
});

router.get("/login", (req, res) => { // Definisce la route GET per la pagina di login.
    res.sendFile(path.join(paths.PUBLIC, "login.html")); // Invia il file login.html al browser.
});

router.get("/signup", (req, res) => { // Definisce la route GET per la pagina di registrazione.
    res.sendFile(path.join(paths.PUBLIC, "signup.html")); // Invia il file signup.html al browser.
});

router.get("/about", (req, res) => { // Definisce la route GET per la pagina About.
    res.sendFile(path.join(paths.PUBLIC, "about.html")); // Invia il file about.html al browser.
});

router.get("/contact", (req, res) => { // Definisce la route GET per la pagina Contact.
    res.sendFile(path.join(paths.PUBLIC, "contact.html")); // Invia il file contact.html al browser.
});

router.get("/weather", (req, res) => { // Definisce la route GET per la pagina Weather.
    res.sendFile(path.join(paths.PUBLIC, "weather.html")); // Invia il file weather.html al browser.
});

router.get("/wanted", (req, res) => { // Definisce la route GET per la pagina Wanted FBI.
    res.sendFile(path.join(paths.PUBLIC, "fbi.html"));
});

router.get("/fbi", (req, res) => { // Alias per la pagina Wanted FBI.
    res.sendFile(path.join(paths.PUBLIC, "fbi.html"));
});

module.exports = router; // Esporta il router per essere utilizzato in altri file.
