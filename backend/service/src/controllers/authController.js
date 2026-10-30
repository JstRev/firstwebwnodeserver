const { authenticateUser } = require("../services/authService");

exports.login = (req, res) => {
    const { username, password } = req.body;
    const result = authenticateUser(username, password);

    // If client requested JSON or sent via fetch
    const wantsJson = req.xhr || req.headers.accept?.includes("application/json") || req.is("application/json");

    if (wantsJson) {
        if (!result.success) {
            return res.status(401).json({
                error: true,
                success: false,
                message: result.message
            });
        }
        return res.json({
            error: false,
            success: true,
            message: result.message,
            user: result.user
        });
    }

    // HTML fallback
    if (result.success) {
        return res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>Login Success</title>
                <link rel="stylesheet" href="/css/navbar.css">
                <link rel="stylesheet" href="/css/index.css">
                <meta http-equiv="refresh" content="2;url=/api/v1/">
            </head>
            <body style="display:flex;align-items:center;justify-content:center;min-height:100vh;">
                <div style="background:white;padding:36px;border-radius:18px;box-shadow:0 12px 30px rgba(0,0,0,0.08);text-align:center;">
                    <h2 style="color:#10b981;margin-bottom:12px;">Authentication Successful</h2>
                    <p style="color:#475569;">Welcome back, <strong>${result.user.username}</strong>! Redirecting you home...</p>
                </div>
            </body>
            </html>
        `);
    } else {
        return res.status(401).send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>Login Failed</title>
                <link rel="stylesheet" href="/css/navbar.css">
                <link rel="stylesheet" href="/css/index.css">
            </head>
            <body style="display:flex;align-items:center;justify-content:center;min-height:100vh;">
                <div style="background:white;padding:36px;border-radius:18px;box-shadow:0 12px 30px rgba(0,0,0,0.08);text-align:center;max-width:400px;">
                    <h2 style="color:#ef4444;margin-bottom:12px;">Login Failed</h2>
                    <p style="color:#475569;margin-bottom:20px;">${result.message}</p>
                    <a href="/api/v1/login" style="display:inline-block;padding:10px 20px;background:#2563eb;color:white;text-decoration:none;border-radius:10px;">Try Again</a>
                </div>
            </body>
            </html>
        `);
    }
};
