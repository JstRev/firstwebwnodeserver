const fetch = require("node-fetch");

const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || "http://localhost:3001";

exports.requireGoogleAuth = async (req, res, next) => {
    try {
        const authResponse = await fetch(`${AUTH_SERVICE_URL}/me`, {
            headers: {
                Cookie: req.headers.cookie || ""
            }
        });

        const authData = await authResponse.json();

        if (!authResponse.ok || !authData || !authData.authenticated) {
            return res.status(401).json({
                success: false,
                authenticated: false,
                message: "Devi essere loggato con Google per usare questo servizio."
            });
        }

        req.user = authData.user;
        return next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            authenticated: false,
            message: "Errore durante la verifica dell'autenticazione Google.",
            error: error.message
        });
    }
};

exports.protectedTest = (req, res) => {
    return res.status(200).json({
        success: true,
        authenticated: true,
        message: "Il servizio protetto è attivo: l'autenticazione Google è verificata.",
        user: req.user,
        timestamp: new Date().toISOString()
    });
};
