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
    SERVICE_URL: process.env.SERVICE_URL || "http://localhost:3000",
    GATEWAY_PORT: parseInt(process.env.GATEWAY_PORT || "4000", 10),
};

// In questo caso il file serve solo per gestire comodamente il numero di porta del gateway, fuori dal codice del server.