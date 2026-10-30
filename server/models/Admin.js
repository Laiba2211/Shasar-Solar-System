import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    /* =====================================================
       ADMIN INFORMATION
    ===================================================== */

    name: {
      type: String,
      required: [true, "Admin name is required"],
      trim: true,
      minlength: [2, "Admin name must contain at least 2 characters"],
      maxlength: [100, "Admin name cannot exceed 100 characters"],
    },

    email: {
      type: String,
      required: [true, "Admin email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      maxlength: [150, "Admin email cannot exceed 150 characters"],
    },

    password: {
      type: String,
      required: [true, "Admin password is required"],
      select: false,
    },

    role: {
      type: String,
      enum: ["admin", "superadmin"],
      default: "admin",
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    lastLogin: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    collection: "admins",
  }
);

/* ==========================================================
   ADMIN MODEL
========================================================== */

const Admin =
  mongoose.models.Admin || mongoose.model("Admin", adminSchema);

export default Admin;