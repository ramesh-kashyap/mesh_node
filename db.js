const mysql = require("mysql2");
const env = require("./src/config/env"); // env.js ko import karna

// MySQL Connection Setup
const db = mysql.createConnection({
    host: "localhost",      // MySQL Server ka Hostname (Local system ke liye "localhost" use karein)
    user: "root",           // MySQL ka Username (Default: "root")
    password: "",           // MySQL ka Password (Agar password set kiya hai to yaha likhein, warna blank chhodein)
    database: "meshchain"  // Aapke MySQL ka Database Name
});

// Connect to Database
db.connect((err) => {
    if (err) {
        console.error("Database connection failed: " + err.message);
    } else {
        console.log("Connected to MySQL Database!");
    }
});

module.exports = db; // Database ko export karna taki kahin bhi use kar sakein
