const mongoose = require("mongoose");

// Definiera användarschemat
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, // Användarnamn
  password: { type: String, required: true }, // Lösenord
  role: { type: String, enum: ['User', 'Admin'], default: 'User' }, // Användarroll (User eller Admin)
});

// Exportera användarmodellen
module.exports = mongoose.model("User", userSchema);
