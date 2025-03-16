const mongoose = require("mongoose");

// Definiera bokningsschemat
const bookingSchema = new mongoose.Schema({
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true }, // Rum-ID (referens till rum)
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Användar-ID (referens till användare)
  startTime: { type: Date, required: true }, // Starttid för bokning
  endTime: { type: Date, required: true }, // Sluttid för bokning
});

// Exportera bokningsmodellen
module.exports = mongoose.model("Booking", bookingSchema);
