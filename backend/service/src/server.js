const express = require("express");
const bodyParser = require("body-parser");
const { PORT } = require("../config/env");
const paths = require("../config/paths");

const pageRoutes = require("./routes/pageRoutes");
const weatherRoutes = require("./routes/weatherRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
const port = Number(PORT) || 3000;

// Body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Register application routes (both at root and /api/v1 for gateway compatibility)
app.use("/", pageRoutes);
app.use("/api/v1", pageRoutes);

app.use("/", weatherRoutes);
app.use("/api/v1", weatherRoutes);

app.use("/", authRoutes);
app.use("/api/v1", authRoutes);

// Static assets from frontend/public
app.use("/", express.static(paths.PUBLIC));
app.use("/api/v1", express.static(paths.PUBLIC));

// 404 handler
app.use((req, res, next) => {
    if (req.accepts("html")) {
        return res.status(404).sendFile(require("path").join(paths.PUBLIC, "index.html"));
    }
    res.status(404).json({ error: true, message: "Resource not found" });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error("[Service Error]", err);
    res.status(500).json({ error: true, message: "Internal server error" });
});

app.listen(port, () => {
    console.log(`[SkyFlow Service] Server active on port ${port}`);
    console.log(`[SkyFlow Service] Direct access: http://localhost:${port}`);
});
