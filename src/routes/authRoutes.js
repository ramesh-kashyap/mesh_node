const express = require("express");
const router = express.Router();

const AuthController = require('../controllers/AuthController');

// ✅ Register Route
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post("/logout", logout); // Logout route




module.exports = router;
