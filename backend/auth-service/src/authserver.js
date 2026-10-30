const express = require("express");
const session = require("express-session");
const { PORT, SESSION_SECRET } = require("../config/env");
const { passport } = require("../config/passport");
const authRoutes = require("./routes/authRoutes");

const app = express();

// Trust proxy header from Gateway
app.set("trust proxy", 1);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure session
app.use(
    session({
        name: "skyflow.sid",
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: false, // Set to true if running on HTTPS
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        }
    })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Mount authentication routes
app.use("/", authRoutes);
app.use("/auth", authRoutes);

// Health check
app.get("/hello", (req, res) => {
    res.json({
        service: "auth-service",
        status: "active",
        timestamp: new Date().toISOString()
    });
});

app.listen(PORT, () => {
    console.log(`[SkyFlow Auth Service] Active on port ${PORT}`);
    console.log(`[SkyFlow Auth Service] Diagnostic endpoint: http://localhost:${PORT}/hello`);
});
