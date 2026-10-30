const path = require("path");

const ROOT = path.join(__dirname, "..");
const FRONTEND_PUBLIC = path.resolve(__dirname, "..", "..", "..", "frontend", "public");

module.exports = {
    ROOT,
    SRC: path.join(ROOT, "src"),
    PUBLIC: FRONTEND_PUBLIC,
    CONTROLLERS: path.join(ROOT, "src", "controllers"),
    SERVICES: path.join(ROOT, "src", "services"),
    ROUTES: path.join(ROOT, "src", "routes"),
    UTILS: path.join(ROOT, "src", "utils"),
};
