/**
 * Service handling authentication state and session operations.
 */

function formatUserProfile(user) {
    if (!user) return null;
    return {
        id: user.id || "local-id",
        name: user.displayName || user.username || "Authenticated User",
        email: user.email || "",
        avatar: user.avatar || "",
        provider: user.provider || "google",
        lastLogin: user.lastLogin || new Date().toISOString()
    };
}

function createDemoUser() {
    return {
        id: "demo-google-user-12345",
        displayName: "SkyFlow Explorer",
        email: "demo.user@skyflow.app",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces",
        provider: "demo-google",
        lastLogin: new Date().toISOString()
    };
}

module.exports = {
    formatUserProfile,
    createDemoUser
};
