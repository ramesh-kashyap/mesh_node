const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"]; // Or wherever your token is sent

  if (!token) {
    return res.status(403).json({ success: false, message: "No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.raj12345); // Make sure your SECRET_KEY is set
    req.user = decoded;  // Attach the user data to the request
    next();  // Proceed to the next middleware or route handler
  } catch (err) {
    return res.status(403).json({ success: false, message: "Failed to authenticate token." });
  }
};

module.exports = authMiddleware;
