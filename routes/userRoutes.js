const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Registrera ny användare
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const userExists = await User.findOne({ username });
    if (userExists) return res.status(400).json({ message: "Användarnamnet är redan taget" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "Användare registrerad!" });
  } catch (error) {
    res.status(500).json({ message: "Fel vid registrering", error });
  }
});

// Logga in användare och skapa JWT
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "Användaren finns inte" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Fel lösenord" });

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ message: "Inloggning lyckades", token });
  } catch (error) {
    res.status(500).json({ message: "Fel vid inloggning", error });
  }
});

module.exports = router;
