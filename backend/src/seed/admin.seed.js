require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Admin = require("../models/Admin.model");

const MONGO_URI = process.env.MONGO_URI;

const seedAdmin = async () => {
  try {
    await mongoose.connect(MONGO_URI);

    const existingAdmin = await Admin.findOne({
      $or: [
        { email: "admin@example.com" },
        { username: "admin" },
        { mobile: "9090909090" },
      ],
    });

    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    await Admin.create({
      email: "admin@example.com",
      username: "admin",
      mobile: "9090909090",
      password: hashedPassword,
      role: "admin",
    });

    console.log("Admin seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("Admin seed error:", error);
    process.exit(1);
  }
};

seedAdmin();
