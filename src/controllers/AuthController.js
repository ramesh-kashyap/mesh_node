const db = require("../../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const config = require("../config/env"); // Environment Variables

// Register User Function
const register = async (req, res) => {
    try {
        const { name, phone, email, password, sponsor } = req.body;

        if (!name || !phone || !email || !password || !sponsor) {
            return res.status(400).json({ error: "All fields are required!" });
        }

        // Check if user already exists
        const [existingUser] = await db.promise().query(
            "SELECT * FROM users WHERE email = ? OR phone = ?", [email, phone]
        );
        if (existingUser.length > 0) {
            return res.status(400).json({ error: "Email or Phone already exists!" });
        }

        // Check if sponsor exists
        const [sponsorUser] = await db.promise().query(
            "SELECT * FROM users WHERE username = ?", [sponsor]
        );
        if (sponsorUser.length === 0) {
            return res.status(400).json({ error: "Sponsor does not exist!" });
        }

        // Generate username & transaction password
        const username = Math.random().toString(36).substring(2, 10);
        const tpassword = Math.random().toString(36).substring(2, 8);

        // Hash passwords
        const hashedPassword = await bcrypt.hash(password, 10);
        const hashedTPassword = await bcrypt.hash(tpassword, 10);

        // Get parent ID
        const [lastUser] = await db.promise().query("SELECT id FROM users ORDER BY id DESC LIMIT 1");
        const parentId = lastUser.length > 0 ? lastUser[0].id : null;

        // User data
        const newUser = {
            name,
            phone,
            email,
            username,
            password: hashedPassword,
            tpassword: hashedTPassword,
            PSR: password,
            TPSR: tpassword,
            sponsor: sponsorUser[0].id,
            level: sponsorUser[0].level + 1,
            ParentId: parentId
        };

        // Insert new user
        await db.promise().query("INSERT INTO users SET ?", newUser);

        return res.status(201).json({ message: "User registered successfully!", username });

    } catch (error) {
        console.error("Error:", error.message);
        return res.status(500).json({ error: "Server error", details: error.message });
    }
};



// Export function



// Login User Function
const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: "Username and Password are required!" });
        }

        // Check if user exists
        const [user] = await db.promise().query(
            "SELECT * FROM users WHERE username = ?", [username]
        );

        if (user.length === 0) {
            return res.status(400).json({ error: "User not found!" });
        }

        const userData = user[0];

        // Compare password
        const isMatch = await bcrypt.compare(password, userData.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials!" });
        }

        // Generate JWT token
        const token = jwt.sign({ id: userData.id, username: userData.username }, "your_secret_key", { expiresIn: "1h" });

        return res.status(200).json({ message: "Login successful!", username: userData.username, token });

    } catch (error) {
        console.error("Error:", error.message);
        return res.status(500).json({ error: "Server error", details: error.message });
    }
};




const forgotPassword = async (req, res) => {

    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    // Check if user exists
    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
        if (err) return res.status(500).json({ message: "Database error" });

        if (results.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const user = results[0];

        // Generate reset token
        const token = jwt.sign({ id: user.id },"mysecretkey123", { expiresIn: "1h" });

        // Reset link
        const resetLink = `http://localhost:3000/reset-password/${token}`;

        // Nodemailer Setup
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: config.EMAIL,
                pass: config.PASSWORD, // Gmail ke liye App Password use karein
            },
        });

        // Email Options
        const mailOptions = {
            from: config.EMAIL,
            to: email,
            subject: "Password Reset Request",
            html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
        };

        // Send Email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ message: "Error sending email" });
            }

            res.json({ message: "Reset link sent to email" });
        });
    });
};

// ✅ Reset Password Handler
const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    if (!password) {
        return res.status(400).json({ message: "Password is required" });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, "mysecretkey123");

        // Hash new password
        const hashedPassword = await bcrypt.hash(password, 5);

        // Update password in database
        db.query("UPDATE users SET password = ? WHERE id = ?", [hashedPassword, decoded.id], (err) => {
            if (err) return res.status(500).json({ message: "Database error" });

            res.json({ message: "Password reset successful" });
        });
    } catch (error) {
        return res.status(400).json({ message: "Invalid or expired token" });
    }
};

module.exports = {
    register,
    login,
    forgotPassword,
    resetPassword
};
                                                                                                                                                                                                                                                                                                                                                                                                                