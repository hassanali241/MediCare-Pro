import mongoose from "mongoose";
import { config } from "dotenv";
import bcrypt from "bcryptjs";
import { Account } from "./models/account.model.js";

config({ path: "./config/.env" });

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "medicare_pro",
    });
    console.log("✓ Connected to database");

    const adminExists = await Account.findOne({ role: "admin" });
    if (adminExists) {
      console.log("✓ Admin account already exists");
      process.exit(0);
    }

    await Account.create({
      fullName: "Hassan Admin",
      email: "admin@medicare.com",
      contactNumber: "03001234567",
      cnic: "3520212345678",
      dateOfBirth: new Date("1995-01-15"),
      gender: "Male",
      password: "admin1234",
      role: "admin",
    });

    console.log("✓ Admin account created successfully");
    console.log("  Email: admin@medicare.com");
    console.log("  Password: admin1234");
    process.exit(0);
  } catch (err) {
    console.error("✗ Seeding failed:", err.message);
    process.exit(1);
  }
};

seedAdmin();
