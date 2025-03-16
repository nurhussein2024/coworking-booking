const jwt = require("jsonwebtoken");

// Middleware för att kontrollera om användaren är autentiserad
const authenticate = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Access nekad. Ingen token tillhandahållen." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Spara användardata i req.user
    next(); // Fortsätt till nästa middleware eller route
  } catch (error) {
    res.status(400).json({ message: "Ogiltig eller utgången token" });
  }
};

module.exports = authenticate;
