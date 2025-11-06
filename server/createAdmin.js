require("dotenv").config();
const mongoose = require("mongoose");
const Admin = require("./models/Admin");
const connectDB = require("./config/database");

const createAdmin = async () => {
  try {
    await connectDB();

    // Prüfe ob Admin bereits existiert
    const existingAdmin = await Admin.findOne({ username: "admin" });
    if (existingAdmin) {
      console.log("❌ Admin existiert bereits!");
      process.exit(0);
    }

    // Erstelle neuen Admin
    const admin = new Admin({
      username: "admin",
      password: "admin123", // ÄNDERE DAS SPÄTER!
    });

    await admin.save();
    console.log("✅ Admin erfolgreich erstellt!");
    console.log("Username: admin");
    console.log("Password: admin123");
    console.log("⚠️  WICHTIG: Ändere das Passwort nach dem ersten Login!");

    process.exit(0);
  } catch (error) {
    console.error("❌ Fehler:", error);
    process.exit(1);
  }
};

createAdmin();
