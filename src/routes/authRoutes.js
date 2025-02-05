const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware"); // JWT Authentication
const AuthController = require("../controllers/AuthController");

// ✅ Ensure ROI function is imported correctly
const { roi } = require("../controllers/incomeController"); // ✅ ROI function इम्पोर्ट करें


router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/logout", AuthController.logout);

// ✅ Ensure `roi` is a valid function before using
router.get("/income/roi", authMiddleware, roi);


module.exports = router;
