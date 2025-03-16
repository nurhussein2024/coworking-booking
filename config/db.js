const mongoose = require("mongoose");

// Temporary hardcoded connection string for testing
const MONGODB_URI = "mongodb+srv://nurhussein2024:Sefelal2024@cluster0.wcmm0.mongodb.net/coworkingDB?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Anslutning till MongoDB lyckades");
  } catch (error) {
    console.error("❌ Misslyckades med att ansluta till databasen", error);
    process.exit(1);
  }
};

connectDB();
module.exports = mongoose;