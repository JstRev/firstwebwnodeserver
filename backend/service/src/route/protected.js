const express = require("express");
const { requireGoogleAuth, protectedTest } = require("../controllers/protectedController");

const router = express.Router();

router.get("/protected/test", requireGoogleAuth, protectedTest);

module.exports = router;
