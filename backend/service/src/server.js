const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const pagesRoutes = require("./routes/pageroutes");
const authRoutes = require("./routes/auth");
const weatherRoutes = require("./routes/weather");

const frontendDir = path.resolve(__dirname, "..", "..", "..", "frontend", "public");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(frontendDir));

app.use("/", pagesRoutes);
app.use("/", authRoutes);
app.use("/", weatherRoutes);

app.listen(port, () => {
    console.log(`Server avviato su http://localhost:${port}`);
});