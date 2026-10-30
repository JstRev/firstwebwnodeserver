const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const config = require("./env");

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
});

const isConfigured = Boolean(
    config.GOOGLE_CLIENT_ID &&
    config.GOOGLE_CLIENT_SECRET &&
    !config.GOOGLE_CLIENT_ID.includes("placeholder")
);

if (isConfigured) {
    passport.use(
        new GoogleStrategy(
            {
                clientID: config.GOOGLE_CLIENT_ID,
                clientSecret: config.GOOGLE_CLIENT_SECRET,
                callbackURL: config.GOOGLE_CALLBACK_URL,
                proxy: true
            },
            (accessToken, refreshToken, profile, done) => {
                const user = {
                    id: profile.id,
                    displayName: profile.displayName || "Google User",
                    email: profile.emails && profile.emails[0] ? profile.emails[0].value : "",
                    avatar: profile.photos && profile.photos[0] ? profile.photos[0].value : "",
                    provider: "google",
                    lastLogin: new Date().toISOString()
                };
                return done(null, user);
            }
        )
    );
    console.log("[Auth Service] Google OAuth Strategy registered successfully.");
} else {
    console.warn("[Auth Service] Warning: GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET not configured. Google Sign-In will operate in mock mode.");
}

module.exports = {
    passport,
    isGoogleConfigured: isConfigured
};
