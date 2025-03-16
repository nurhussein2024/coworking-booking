// Middleware för att kontrollera användarens roll
const authorizeAdmin = (req, res, next) => {
    if (req.user.role !== "Admin") {
      return res.status(403).json({ message: "Åtkomst nekad. Admin rättigheter krävs." });
    }
    next(); // Fortsätt till nästa middleware eller route
  };
  
  module.exports = authorizeAdmin;
  