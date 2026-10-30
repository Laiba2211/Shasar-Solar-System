
import "dotenv/config";

import bcrypt from "bcryptjs";
import mongoose from "mongoose";

import connectDB from "../config/db.js";
import Admin from "../models/Admin.js";

// ==========================================================
// SUPER ADMIN DETAILS
// ==========================================================

const ADMIN_NAME = "Shasar Solar Admin";

const ADMIN_EMAIL = "admin@shasartech.com";

const ADMIN_PASSWORD = "Shasartech@123";

// ==========================================================
// CREATE / UPDATE SUPER ADMIN
// ==========================================================

const createSuperAdmin = async () => {
  try {
    console.log("\n==========================================");
    console.log("   SHASAR SOLAR — SUPER ADMIN SETUP");
    console.log("==========================================\n");

    // ========================================================
    // CONNECT TO MONGODB
    // ========================================================

    await connectDB();

    console.log("MongoDB connected successfully.");

    // ========================================================
    // FIND EXISTING ADMIN
    // ========================================================

    const existingAdmin = await Admin.findOne({
      email: ADMIN_EMAIL.toLowerCase(),
    });

    // ========================================================
    // UPDATE EXISTING ADMIN
    // ========================================================

    if (existingAdmin) {
      console.log(
        `\nAdmin already exists: ${ADMIN_EMAIL}`
      );

      console.log(
        "Updating Super Admin account..."
      );

      // ------------------------------------------------------
      // Hash the password
      // ------------------------------------------------------

      const hashedPassword = await bcrypt.hash(
        ADMIN_PASSWORD,
        12
      );

      // ------------------------------------------------------
      // Update admin information
      // ------------------------------------------------------

      existingAdmin.name = ADMIN_NAME;
      existingAdmin.email = ADMIN_EMAIL.toLowerCase();
      existingAdmin.password = hashedPassword;
      existingAdmin.role = "superadmin";
      existingAdmin.isActive = true;
      existingAdmin.lastLogin = null;

      await existingAdmin.save();

      console.log(
        "\n=========================================="
      );

      console.log(
        "   SUPER ADMIN UPDATED SUCCESSFULLY"
      );

      console.log(
        "==========================================\n"
      );

      console.log(
        `Name:  ${existingAdmin.name}`
      );

      console.log(
        `Email: ${existingAdmin.email}`
      );

      console.log(
        `Role:  ${existingAdmin.role}`
      );

      console.log(
        "Password has been securely hashed."
      );

      console.log(
        "The plain-text password was NOT stored in MongoDB."
      );

      console.log(
        "\nYou can now login to the Admin Portal."
      );

      console.log(
        "\n==========================================\n"
      );

      await mongoose.connection.close();

      process.exit(0);
    }

    // ========================================================
    // HASH PASSWORD
    // ========================================================

    const hashedPassword = await bcrypt.hash(
      ADMIN_PASSWORD,
      12
    );

    // ========================================================
    // CREATE ADMIN
    // ========================================================

    const admin = await Admin.create({
      name: ADMIN_NAME,

      email: ADMIN_EMAIL.toLowerCase(),

      password: hashedPassword,

      role: "superadmin",

      isActive: true,

      lastLogin: null,
    });

    // ========================================================
    // SUCCESS
    // ========================================================

    console.log(
      "\n=========================================="
    );

    console.log(
      "   SUPER ADMIN CREATED SUCCESSFULLY"
    );

    console.log(
      "==========================================\n"
    );

    console.log(
      `Name:  ${admin.name}`
    );

    console.log(
      `Email: ${admin.email}`
    );

    console.log(
      `Role:  ${admin.role}`
    );

    console.log(
      "Password has been securely hashed."
    );

    console.log(
      "The plain-text password was NOT stored in MongoDB."
    );

    console.log(
      "\nYou can now login to the Admin Portal."
    );

    console.log(
      "\n==========================================\n"
    );

    await mongoose.connection.close();

    process.exit(0);
  } catch (error) {
    console.error(
      "\nFailed to create/update Super Admin:"
    );

    console.error(error);

    try {
      await mongoose.connection.close();
    } catch {
      // Ignore connection close errors
    }

    process.exit(1);
  }
};

createSuperAdmin();

