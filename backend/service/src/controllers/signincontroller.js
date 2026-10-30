const { registerUser } = require("../services/authService");

function handleSignIn(req, res) {
    const { username, password, email } = req.body;
    const result = registerUser(username, password, email);

    const wantsJson = req.xhr || req.headers.accept?.includes("application/json") || req.is("application/json");

    if (wantsJson) {
        if (!result.success) {
            return res.status(400).json({
                error: true,
                success: false,
                message: result.message
            });
        }
        return res.status(201).json({
            error: false,
            success: true,
            message: result.message,
            user: result.user
        });
    }

    if (result.success) {
        return res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>Registration Complete</title>
                <link rel="stylesheet" href="/css/navbar.css">
                <link rel="stylesheet" href="/css/index.css">
                <meta http-equiv="refresh" content="2;url=/api/v1/login">
            </head>
            <body style="display:flex;align-items:center;justify-content:center;min-height:100vh;">
                <div style="background:white;padding:36px;border-radius:18px;box-shadow:0 12px 30px rgba(0,0,0,0.08);text-align:center;">
                    <h2 style="color:#10b981;margin-bottom:12px;">Account Created</h2>
                    <p style="color:#475569;">Registration completed for <strong>${result.user.username}</strong>! Redirecting to login...</p>
                </div>
            </body>
            </html>
        `);
    } else {
        return res.status(400).send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>Registration Error</title>
                <link rel="stylesheet" href="/css/navbar.css">
                <link rel="stylesheet" href="/css/index.css">
            </head>
            <body style="display:flex;align-items:center;justify-content:center;min-height:100vh;">
                <div style="background:white;padding:36px;border-radius:18px;box-shadow:0 12px 30px rgba(0,0,0,0.08);text-align:center;max-width:400px;">
                    <h2 style="color:#ef4444;margin-bottom:12px;">Registration Failed</h2>
                    <p style="color:#475569;margin-bottom:20px;">${result.message}</p>
                    <a href="/api/v1/signup" style="display:inline-block;padding:10px 20px;background:#2563eb;color:white;text-decoration:none;border-radius:10px;">Try Again</a>
                </div>
            </body>
            </html>
        `);
    }
}

module.exports = {
    signInController: handleSignIn,
    signinController: handleSignIn,
    register: handleSignIn
};
