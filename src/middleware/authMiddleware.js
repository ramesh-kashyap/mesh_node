const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(403).json({ success: false, message: "No token provided." });
  }

  const token = authHeader.split(" ")[1]; // ✅ "Bearer <token>" से सिर्फ टोकन निकालें

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // ✅ सही SECRET_KEY दें
    req.user = decoded;  // ✅ डिकोड किए गए यूज़र डेटा को req.user में रखें
    next();  // ✅ अगले मिडलवेयर या रूट हैंडलर पर जाएं
  } catch (err) {
    return res.status(403).json({ success: false, message: "Invalid Token" });
  }
};

module.exports = authMiddleware;
