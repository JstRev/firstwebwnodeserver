const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const { PORT } = require("../config/env");
const port = Number(PORT) || 3000;



// il body parser serve per leggere i dati inviati dal form
app.use(bodyParser.json());                    // Abilita la lettura del corpo in formato JSON.
app.use(bodyParser.urlencoded({ extended: true })); // Abilita la lettura dei dati inviati dai form HTML.

const pageRoutes = require("./route/pageroutes"); // Importa le routes delle pagine statiche.
app.use("/", pageRoutes);    // Usa le routes definite in pageroutes.js per gestire le richieste alle pagine statiche.
app.use("/api/v1", pageRoutes); // Supporta anche il prefisso API per il front-end diretto.

const weatherRoutes = require("./route/weather"); // Importa le routes per le richieste meteo.
app.use("/", weatherRoutes); // Usa le routes definite in weather.js per gestire le richieste meteo.
app.use("/api/v1", weatherRoutes); // Supporta anche il prefisso API per le chiamate del client.

const authRoutes = require("./route/auth"); // Importa le routes per le richieste di autenticazione.
app.use("/", authRoutes); // Usa le routes definite in auth.js per gestire le richieste di autenticazione.
app.use("/api/v1", authRoutes); // Supporta anche il prefisso API di autenticazione.

const signinRoutes = require("./route/signin"); // Importa le routes per le richieste di registrazione.
app.use("/", signinRoutes); // Usa le routes definite in signin.js per gestire le richieste di registrazione.
app.use("/api/v1", signinRoutes); // Supporta anche il prefisso API di registrazione.

const publicPath = path.join(__dirname, "../../../frontend/public");
app.use("/", express.static(publicPath)); // Serve i file statici della cartella public.
app.use("/api/v1", express.static(publicPath)); // Rende disponibili anche gli asset con prefisso /api/v1.




//definizione dello stato visualizzabile da prompt
app.listen(port, ()=> {                        // Avvia il server sulla porta definita.
console.log("Server in ascolto alla porta " + port); // Scrive in console la porta di ascolto.
console.log('accedi all indirizzo http://localhost:'+port) // Scrive in console l'indirizzo da aprire nel browser.
}); // Chiude il metodo listen.