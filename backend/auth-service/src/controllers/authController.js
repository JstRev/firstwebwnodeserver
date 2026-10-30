const { passport, isGoogleConfigured } = require("../../config/passport");
const { formatUserProfile, createDemoUser } = require("../services/authService");
const config = require("../../config/env");

exports.getValidate = (req, res) => {
    if (req.isAuthenticated && req.isAuthenticated()) {
        return res.json({
            authenticated: true,
            user: formatUserProfile(req.user)
        });
    }

    // Also check session direct user object if any
    if (req.session && req.session.user) {
        return res.json({
            authenticated: true,
            user: formatUserProfile(req.session.user)
        });
    }

    return res.json({
        authenticated: false,
        user: null
    });
};

exports.googleAuth = (req, res, next) => {
    if (!isGoogleConfigured) {
        // Fallback for development if Google credentials are not yet authorized with callback in Google Console
        console.log("[Auth Controller] Using demo login because Google OAuth is in demo mode.");
        const demoUser = createDemoUser();
        req.session.user = demoUser;
        return res.redirect(config.CLIENT_REDIRECT_URL);
    }

    return passport.authenticate("google", {
        scope: ["profile", "email"],
        prompt: "select_account"
    })(req, res, next);
};

exports.googleCallback = (req, res, next) => {
    if (!isGoogleConfigured) {
        return res.redirect(config.CLIENT_REDIRECT_URL);
    }

    passport.authenticate("google", {
        failureRedirect: "/api/v1/login?error=oauth_failed",
        successRedirect: config.CLIENT_REDIRECT_URL
    })(req, res, next);
};

exports.demoLogin = (req, res) => {
    const demoUser = createDemoUser();
    req.session.user = demoUser;
    res.json({
        success: true,
        message: "Logged in via SkyFlow demo profile",
        user: demoUser
    });
};

exports.logout = (req, res) => {
    const wantsJson = req.xhr || req.headers.accept?.includes("application/json") || req.query.format === "json";

    const finalize = () => {
        if (req.session) {
            req.session.destroy(() => {
                res.clearCookie("skyflow.sid");
                if (wantsJson) {
                    return res.json({ success: true, message: "Logged out successfully" });
                }
                return res.redirect(config.CLIENT_REDIRECT_URL);
            });
        } else {
            res.clearCookie("skyflow.sid");
            if (wantsJson) {
                return res.json({ success: true, message: "Logged out successfully" });
            }
            return res.redirect(config.CLIENT_REDIRECT_URL);
        }
    };

    if (req.logout) {
        req.logout((err) => {
            if (err) console.error("[Logout Error]", err);
            finalize();
        });
    } else {
        finalize();
    }
};

exports.getCurrentUser = (req, res) => {
    const user = req.user || (req.session && req.session.user);
    if (!user) {
        return res.status(401).json({ error: true, message: "Not authenticated" });
    }
    return res.json({
        error: false,
        user: formatUserProfile(user)
    });
};
