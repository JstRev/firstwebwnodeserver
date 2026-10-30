const path = require("path");
const dotenv = require("dotenv");

const envCandidates = [
    path.resolve(__dirname, "../.env"),
    path.resolve(__dirname, "../../.env"),
    path.resolve(process.cwd(), ".env"),
];

envCandidates.forEach((envFilePath) => {
    dotenv.config({ path: envFilePath });
});

module.exports = {
    PORT: parseInt(process.env.AUTH_PORT || process.env.AUTH_SERVER_PORT || "3001", 10),
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || "",
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || "",
    GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL || "/api/v1/auth/google/callback",
    SESSION_SECRET: process.env.SESSION_SECRET || "skyflow_super_secret_session_key_2026",
    CLIENT_REDIRECT_URL: process.env.CLIENT_REDIRECT_URL || "/api/v1/",
    NODE_ENV: process.env.NODE_ENV || "development"
};
