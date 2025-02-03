const express = require("express");
const router = express.Router();
const AuthController = require('../controllers/AuthController');

// ✅ Register Route
router.post('/register', AuthController.register);

module.exports = router;
