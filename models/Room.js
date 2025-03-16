const mongoose = require("mongoose");

// Definiera rumschemat
const roomSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Namn på rummet (t.ex., "Konferensrum 1")
  capacity: { type: Number, required: true }, // Kapacitet (antal personer rummet rymmer)
  type: { type: String, enum: ['workspace', 'conference'], required: true }, // Typ av rum (arbetsplats eller konferensrum)
});

// Exportera rumsmodellen
module.exports = mongoose.model("Room", roomSchema);
