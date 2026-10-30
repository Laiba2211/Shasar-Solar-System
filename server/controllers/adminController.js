import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import Admin from "../models/Admin.js";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


// ==========================================================
// ADMIN LOGIN
// POST /api/admin/login
// ==========================================================

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ------------------------------------------------------
    // VALIDATION
    // ------------------------------------------------------

    if (!email || !email.trim()) {
      return res.status(400).json({
        success: false,
        message: "Email is required.",
      });
    }

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required.",
      });
    }

    const normalizedEmail =
      email.trim().toLowerCase();

    if (!emailRegex.test(normalizedEmail)) {
      return res.status(400).json({
        success: false,
        message:
          "Please enter a valid email address.",
      });
    }

    // ------------------------------------------------------
    // FIND ADMIN
    // ------------------------------------------------------

    const admin = await Admin.findOne({
      email: normalizedEmail,
    }).select("+password");

    // ------------------------------------------------------
    // LOGIN DEBUG
    // Safe: does NOT print password or password hash
    // ------------------------------------------------------

    console.log(
      "========== ADMIN LOGIN DEBUG =========="
    );

    console.log(
      "Login email:",
      normalizedEmail
    );

    console.log(
      "Admin found:",
      !!admin
    );

    if (admin) {
      console.log(
        "Admin ID:",
        admin._id.toString()
      );

      console.log(
        "Admin email:",
        admin.email
      );

      console.log(
        "Admin role:",
        admin.role
      );

      console.log(
        "Admin active:",
        admin.isActive
      );

      console.log(
        "Password exists:",
        !!admin.password
      );
    }

    console.log(
      "======================================="
    );

    // ------------------------------------------------------
    // ADMIN NOT FOUND
    // ------------------------------------------------------

    if (!admin) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid email or password.",
      });
    }

    // ------------------------------------------------------
    // CHECK ACTIVE STATUS
    // ------------------------------------------------------

    if (!admin.isActive) {
      return res.status(403).json({
        success: false,
        message:
          "This admin account is inactive.",
      });
    }

    // ------------------------------------------------------
    // CHECK PASSWORD
    // ------------------------------------------------------

    const isPasswordValid =
      await bcrypt.compare(
        password,
        admin.password
      );

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid email or password.",
      });
    }

    // ------------------------------------------------------
    // JWT SECRET
    // ------------------------------------------------------

    const jwtSecret =
      process.env.JWT_SECRET;

    if (!jwtSecret) {
      console.error(
        "JWT_SECRET is missing."
      );

      return res.status(500).json({
        success: false,
        message:
          "Authentication configuration error.",
      });
    }

    // ------------------------------------------------------
    // CREATE JWT TOKEN
    // ------------------------------------------------------

    const token = jwt.sign(
      {
        id: admin._id.toString(),
        email: admin.email,
        role: admin.role,
      },
      jwtSecret,
      {
        expiresIn:
          process.env.JWT_EXPIRES_IN ||
          "1d",
      }
    );

    // ------------------------------------------------------
    // UPDATE LAST LOGIN
    // ------------------------------------------------------

    admin.lastLogin = new Date();

    await admin.save();

    // ------------------------------------------------------
    // LOGIN SUCCESS DEBUG
    // Safe: does NOT print actual JWT token
    // ------------------------------------------------------

    console.log(
      "========== LOGIN SUCCESS DEBUG =========="
    );

    console.log(
      "JWT token created:",
      !!token
    );

    console.log(
      "Admin name:",
      admin.name
    );

    console.log(
      "Admin email:",
      admin.email
    );

    console.log(
      "Admin role:",
      admin.role
    );

    console.log(
      "Returning success response: true"
    );

    console.log(
      "========================================="
    );

    // ------------------------------------------------------
    // SUCCESS RESPONSE
    // ------------------------------------------------------

    return res.status(200).json({
      success: true,
      message:
        "Login successful.",

      data: {
        admin: {
          id: admin._id,
          name: admin.name,
          email: admin.email,
          role: admin.role,
        },

        token,
      },
    });

  } catch (error) {
    console.error(
      "Admin login error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Unable to login.",
    });
  }
};


// ==========================================================
// GET CURRENT ADMIN PROFILE
// GET /api/admin/profile
// ==========================================================

export const getAdminProfile = async (
  req,
  res
) => {
  try {
    const admin =
      await Admin.findById(
        req.admin.id
      ).select(
        "name email role isActive lastLogin"
      );

    if (!admin) {
      return res.status(404).json({
        success: false,
        message:
          "Admin profile not found.",
      });
    }

    return res.status(200).json({
      success: true,

      data: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        isActive: admin.isActive,
        lastLogin: admin.lastLogin,
      },
    });

  } catch (error) {
    console.error(
      "Get admin profile error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Unable to load admin profile.",
    });
  }
};


// ==========================================================
// UPDATE CURRENT ADMIN PROFILE
// PATCH /api/admin/profile
// ==========================================================

export const updateAdminProfile = async (
  req,
  res
) => {
  try {
    const {
      name,
      email,
    } = req.body;

    // ------------------------------------------------------
    // VALIDATION
    // ------------------------------------------------------

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message:
          "Admin name is required.",
      });
    }

    if (!email || !email.trim()) {
      return res.status(400).json({
        success: false,
        message:
          "Admin email is required.",
      });
    }

    const trimmedName =
      name.trim();

    const normalizedEmail =
      email.trim().toLowerCase();

    // ------------------------------------------------------
    // NAME LENGTH
    // ------------------------------------------------------

    if (trimmedName.length < 2) {
      return res.status(400).json({
        success: false,
        message:
          "Admin name must contain at least 2 characters.",
      });
    }

    if (trimmedName.length > 100) {
      return res.status(400).json({
        success: false,
        message:
          "Admin name cannot exceed 100 characters.",
      });
    }

    // ------------------------------------------------------
    // EMAIL LENGTH
    // ------------------------------------------------------

    if (normalizedEmail.length > 150) {
      return res.status(400).json({
        success: false,
        message:
          "Admin email cannot exceed 150 characters.",
      });
    }

    // ------------------------------------------------------
    // EMAIL VALIDATION
    // ------------------------------------------------------

    if (
      !emailRegex.test(
        normalizedEmail
      )
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Please enter a valid email address.",
      });
    }

    // ------------------------------------------------------
    // CHECK DUPLICATE EMAIL
    // ------------------------------------------------------

    const existingAdmin =
      await Admin.findOne({
        email: normalizedEmail,

        _id: {
          $ne: req.admin.id,
        },
      });

    if (existingAdmin) {
      return res.status(409).json({
        success: false,
        message:
          "This email address is already being used by another admin.",
      });
    }

    // ------------------------------------------------------
    // UPDATE PROFILE
    // ------------------------------------------------------

    const admin =
      await Admin.findByIdAndUpdate(
        req.admin.id,

        {
          $set: {
            name: trimmedName,
            email: normalizedEmail,
          },
        },

        {
          new: true,
          runValidators: true,
        }
      ).select(
        "name email role isActive lastLogin"
      );

    if (!admin) {
      return res.status(404).json({
        success: false,
        message:
          "Admin profile not found.",
      });
    }

    // ------------------------------------------------------
    // SUCCESS RESPONSE
    // ------------------------------------------------------

    return res.status(200).json({
      success: true,

      message:
        "Admin profile updated successfully.",

      data: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        isActive: admin.isActive,
        lastLogin: admin.lastLogin,
      },
    });

  } catch (error) {
    console.error(
      "Update admin profile error:",
      error
    );

    // ------------------------------------------------------
    // DUPLICATE EMAIL SAFETY
    // ------------------------------------------------------

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message:
          "This email address is already being used by another admin.",
      });
    }

    // ------------------------------------------------------
    // MONGOOSE VALIDATION ERROR
    // ------------------------------------------------------

    if (
      error.name ===
      "ValidationError"
    ) {
      const validationMessage =
        Object.values(
          error.errors
        )
          .map(
            (item) =>
              item.message
          )
          .join(" ");

      return res.status(400).json({
        success: false,

        message:
          validationMessage ||
          "Please check your profile information.",
      });
    }

    // ------------------------------------------------------
    // GENERAL ERROR
    // ------------------------------------------------------

    return res.status(500).json({
      success: false,
      message:
        "Unable to update admin profile.",
    });
  }
};


// ==========================================================
// CHANGE ADMIN PASSWORD
// PATCH /api/admin/change-password
// ==========================================================

export const changeAdminPassword = async (
  req,
  res
) => {
  try {
    const {
      currentPassword,
      newPassword,
      confirmPassword,
    } = req.body;

    // ------------------------------------------------------
    // VALIDATION
    // ------------------------------------------------------

    if (!currentPassword) {
      return res.status(400).json({
        success: false,
        message:
          "Current password is required.",
      });
    }

    if (!newPassword) {
      return res.status(400).json({
        success: false,
        message:
          "New password is required.",
      });
    }

    if (!confirmPassword) {
      return res.status(400).json({
        success: false,
        message:
          "Please confirm your new password.",
      });
    }

    // ------------------------------------------------------
    // PASSWORD LENGTH
    // ------------------------------------------------------

    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message:
          "New password must contain at least 8 characters.",
      });
    }

    // ------------------------------------------------------
    // CONFIRM PASSWORD
    // ------------------------------------------------------

    if (
      newPassword !==
      confirmPassword
    ) {
      return res.status(400).json({
        success: false,
        message:
          "New password and confirmation password do not match.",
      });
    }

    // ------------------------------------------------------
    // FIND ADMIN WITH PASSWORD
    // ------------------------------------------------------

    const admin =
      await Admin.findById(
        req.admin.id
      ).select("+password");

    if (!admin) {
      return res.status(404).json({
        success: false,
        message:
          "Admin account not found.",
      });
    }

    // ------------------------------------------------------
    // CHECK ACTIVE STATUS
    // ------------------------------------------------------

    if (!admin.isActive) {
      return res.status(403).json({
        success: false,
        message:
          "This admin account is inactive.",
      });
    }

    // ------------------------------------------------------
    // VERIFY CURRENT PASSWORD
    // ------------------------------------------------------

    const isCurrentPasswordValid =
      await bcrypt.compare(
        currentPassword,
        admin.password
      );

    if (!isCurrentPasswordValid) {
      return res.status(401).json({
        success: false,
        message:
          "Current password is incorrect.",
      });
    }

    // ------------------------------------------------------
    // PREVENT SAME PASSWORD
    // ------------------------------------------------------

    const isSamePassword =
      await bcrypt.compare(
        newPassword,
        admin.password
      );

    if (isSamePassword) {
      return res.status(400).json({
        success: false,
        message:
          "New password must be different from the current password.",
      });
    }

    // ------------------------------------------------------
    // HASH NEW PASSWORD
    // ------------------------------------------------------

    const saltRounds = 12;

    const hashedPassword =
      await bcrypt.hash(
        newPassword,
        saltRounds
      );

    // ------------------------------------------------------
    // SAVE NEW PASSWORD
    // ------------------------------------------------------

    admin.password =
      hashedPassword;

    await admin.save();

    // ------------------------------------------------------
    // SUCCESS RESPONSE
    // ------------------------------------------------------

    return res.status(200).json({
      success: true,
      message:
        "Admin password changed successfully.",
    });

  } catch (error) {
    console.error(
      "Change admin password error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Unable to change admin password.",
    });
  }
};