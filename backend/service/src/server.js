const express = require("express");
const bodyParser = require("body-parser");

const { PORT } = require("../config/env");
const { PUBLIC } = require("../config/paths");
const pagesRoutes = require("./routes/pageroutes");
const authRoutes = require("./routes/auth");
const weatherRoutes = require("./routes/weather");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(PUBLIC));

app.use("/", pagesRoutes);
app.use("/", authRoutes);
app.use("/", weatherRoutes);

app.listen(PORT, () => {
    console.log(`Server avviato su http://localhost:${PORT}`);
});