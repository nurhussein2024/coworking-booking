require("dotenv").config();
const express = require("express");
const mongoose = require("./config/db");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const app = express();

// Säkerhetsinställningar
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

// Rutter
app.get("/", (req, res) => {
  res.send("Bokningsplattformen fungerar!");
});

const userRoutes = require("./routes/userRoutes");
const roomRoutes = require("./routes/roomRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const authenticate = require("./middlewares/authMiddleware");
const authorizeAdmin = require("./middlewares/roleMiddleware");

app.use("/api/users", userRoutes); // Rutter för användare
app.use("/api/rooms", authenticate, authorizeAdmin, roomRoutes); // Rutter för rum (endast admin)
app.use("/api/bookings", authenticate, bookingRoutes); // Rutter för bokningar (alla användare)

const http = require("http");
const socketIo = require("socket.io");

// Skapa en HTTP-server och sätt upp WebSocket
const server = http.createServer(app);
const io = socketIo(server);

// Hantera händelser på WebSocket
io.on("connection", (socket) => {
  console.log("Ansluten användare till WebSocket");

  // Skicka notifikation vid ny bokning
  socket.on("newBooking", (message) => {
    io.emit("notification", message); // Skicka notifikation till alla anslutna användare
  });

  // Hantera bortkoppling
  socket.on("disconnect", () => {
    console.log("Användare bortkopplad från WebSocket");
  });
});

// Starta servern
server.listen(process.env.PORT || 3000, () => console.log(`Servern kör på port ${process.env.PORT || 3000}`));
