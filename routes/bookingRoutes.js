const express = require("express");
const Booking = require("../models/Booking");
const Room = require("../models/Room");

const router = express.Router();

// Skapa en ny bokning
router.post("/", async (req, res) => {
  const { roomId, userId, startTime, endTime } = req.body;

  try {
    // Kontrollera om rummet finns
    const room = await Room.findById(roomId);
    if (!room) return res.status(404).json({ message: "Rum hittades inte" });

    // Kontrollera om rummet redan är bokat under den angivna tiden
    const existingBooking = await Booking.findOne({
      roomId,
      startTime: { $lt: endTime },
      endTime: { $gt: startTime },
    });
    if (existingBooking) return res.status(400).json({ message: "Rummet är redan bokat" });

    // Skapa en ny bokning
    const newBooking = new Booking({ roomId, userId, startTime, endTime });
    await newBooking.save();
    
    // Skicka en notifikation via WebSocket
    req.app.io.emit("newBooking", {
      message: `Ny bokning skapad för rummet ${room.name}`,
    });

    res.status(201).json({ message: "Bokning skapad!" });
  } catch (error) {
    res.status(500).json({ message: "Fel vid bokning", error });
  }
});

// Hämta användarens bokningar
router.get("/", async (req, res) => {
  const { userId } = req.query;

  try {
    // Hämta alla bokningar för en användare
    const bookings = await Booking.find({ userId });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Fel vid hämtning av bokningar", error });
  }
});

// Uppdatera en bokning (endast skaparen eller Admin)
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { roomId, startTime, endTime } = req.body;

  try {
    // Kontrollera om bokningen finns
    const booking = await Booking.findById(id);
    if (!booking) return res.status(404).json({ message: "Bokning hittades inte" });

    // Uppdatera bokningen
    booking.roomId = roomId || booking.roomId;
    booking.startTime = startTime || booking.startTime;
    booking.endTime = endTime || booking.endTime;
    
    await booking.save();

    // Skicka en notifikation via WebSocket
    req.app.io.emit("newBooking", {
      message: `Bokning för rummet ${roomId} har uppdaterats`,
    });

    res.status(200).json({ message: "Bokning uppdaterad!" });
  } catch (error) {
    res.status(500).json({ message: "Fel vid uppdatering av bokning", error });
  }
});

// Ta bort en bokning (endast skaparen eller Admin)
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Hitta och ta bort bokningen
    const booking = await Booking.findById(id);
    if (!booking) return res.status(404).json({ message: "Bokning hittades inte" });

    await booking.remove();
    
    // Skicka en notifikation via WebSocket
    req.app.io.emit("newBooking", {
      message: `Bokning för rummet ${booking.roomId} har tagits bort`,
    });

    res.status(200).json({ message: "Bokning borttagen!" });
  } catch (error) {
    res.status(500).json({ message: "Fel vid borttagning av bokning", error });
  }
});

module.exports = router;
