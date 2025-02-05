const express = require("express");
const db = require("./db"); // Ensure correct path
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./src/routes/authRoutes");
const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(bodyParser.json());

// ✅ Routes Import

app.use("/api/auth", authRoutes); // All auth routes under `/api/auth`

const PORT = 5001;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});