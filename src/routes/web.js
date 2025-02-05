import express from 'express';
let router = express.Router();
const authMiddleware = require("../middleware/authMiddleware"); // JWT Authentication
const AuthController = require("../controllers/AuthController");

const initWebRouter = (app) => {
    // page account
    router.post("/register", AuthController.register);
    router.post("/login", AuthController.login);
    router.post("/logout", AuthController.logout);

    
    return app.use('/', router); 
}

module.exports = {
    initWebRouter,
};