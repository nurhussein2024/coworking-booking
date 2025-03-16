const express = require("express");
const Room = require("../models/Room");

const router = express.Router();

// Skapa ett nytt rum (endast admin)
router.post("/", async (req, res) => {
  const { name, capacity, type } = req.body;

  try {
    const newRoom = new Room({ name, capacity, type });
    await newRoom.save();
    res.status(201).json({ message: "Rum skapad!" });
  } catch (error) {
    res.status(500).json({ message: "Fel vid rumsskapande", error });
  }
});

// Hämta alla rum
router.get("/", async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ message: "Fel vid hämtning av rum", error });
  }
});

module.exports = router;
