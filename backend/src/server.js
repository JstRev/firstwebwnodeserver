var express = require("express");
var path = require("path");
var app = express();
var port = 3000;
var bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "../../frontend/public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/public/index.html"));
});

app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/public/about.html"));
});

app.get("/contact", (req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/public/contact.html"));
});

app.get("/signup", (req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/public/signup.html"));
});

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/public/login.html"));
});

app.get("/weather", (req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/public/weather.html"));
});

app.post('/weather', (req, res) => {
    const city = (req.body.city || '').trim();

    if (!city) {
        return res.status(400).json({
            ok: false,
            message: 'Inserisci il nome di una città.'
        });
    }

    const conditions = ['Soleggiato', 'Nuvoloso', 'Pioggia leggera', 'Temporali in arrivo', 'Vento moderato'];
    const temperature = Math.floor(Math.random() * 21) + 12;
    const index = city.length % conditions.length;

    return res.json({
        ok: true,
        city,
        condition: conditions[index],
        temperature: temperature,
        message: `A ${city} oggi ci sono ${conditions[index].toLowerCase()} con ${temperature}°C.`
    });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === 'admin' && password === '1234') {
        res.send('Login è avvenuto con successo!');
    } else {
        res.send('Login fallito. <br> Username inserito: ' + username + ' <br> Password inserita: ' + password + '.');
    }
});

app.listen(port, () => {
    console.log("Server in ascolto alla porta " + port);
    console.log('accedi all indirizzo http://localhost:' + port);
});
