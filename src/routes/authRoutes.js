const express = require("express");
const router = express.Router();

const AuthController = require('../controllers/AuthController');

// ✅ Register Route
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
// ✅ Forgot & Reset Password Routes
router.post('/forgot-password', AuthController.forgotPassword);
router.post('/reset-password', AuthController.resetPassword);



module.exports = router;
