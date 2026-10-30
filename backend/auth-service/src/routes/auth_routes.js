const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Authentication routes
router.get("/google", authController.googleAuth);
router.get("/google/callback", authController.googleCallback);
router.get("/validate", authController.getValidate);
router.get("/status", authController.getValidate);
router.get("/user", authController.getCurrentUser);
router.get("/demo-login", authController.demoLogin);
router.get("/logout", authController.logout);
router.post("/logout", authController.logout);

// Login landing / info
router.get("/login", (req, res) => {
    res.json({
        message: "SkyFlow Authentication Service",
        endpoints: {
            googleLogin: "/api/v1/auth/google",
            sessionValidate: "/api/v1/auth/validate",
            logout: "/api/v1/auth/logout"
        }
    });
});

module.exports = router;
