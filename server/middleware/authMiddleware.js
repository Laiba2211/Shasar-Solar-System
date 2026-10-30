import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

/* ==========================================================
   ADMIN AUTHENTICATION MIDDLEWARE
   ----------------------------------------------------------
   Purpose:
   - Verify existing admin JWT
   - Confirm authenticated admin still exists
   - Confirm admin account is active
   - Attach admin information to req.admin

   IMPORTANT:
   - Does NOT handle admin login
   - Does NOT create tokens
   - Does NOT affect public contact submission
   - Does NOT interact with SMTP/email functionality
========================================================== */

const authMiddleware = async (req, res, next) => {
  try {
    /* ======================================================
       CHECK JWT CONFIGURATION
    ====================================================== */

    if (!process.env.JWT_SECRET) {
      console.error(
        "JWT_SECRET is not configured."
      );

      return res.status(500).json({
        success: false,
        message:
          "Authentication service is not configured.",
      });
    }

    /* ======================================================
       GET AUTHORIZATION HEADER
    ====================================================== */

    const authorizationHeader =
      req.headers.authorization;

    if (
      !authorizationHeader ||
      !authorizationHeader.startsWith("Bearer ")
    ) {
      return res.status(401).json({
        success: false,
        message:
          "Authentication required. Please log in as an admin.",
      });
    }

    /* ======================================================
       EXTRACT TOKEN
    ====================================================== */

    const token =
      authorizationHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message:
          "Authentication token is missing.",
      });
    }

    /* ======================================================
       VERIFY EXISTING JWT
    ====================================================== */

    let decoded;

    try {
      decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );
    } catch (tokenError) {
      if (tokenError.name === "TokenExpiredError") {
        return res.status(401).json({
          success: false,
          message:
            "Your admin session has expired. Please log in again.",
        });
      }

      return res.status(401).json({
        success: false,
        message:
          "Invalid authentication token.",
      });
    }

    /* ======================================================
       VALIDATE JWT PAYLOAD
    ====================================================== */

    if (!decoded?.id) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid authentication credentials.",
      });
    }

    /* ======================================================
       FIND ADMIN ACCOUNT
       ------------------------------------------------------
       We verify the account from MongoDB as well.

       This means an admin whose account has been disabled
       after login cannot continue accessing protected APIs.
    ====================================================== */

    const admin = await Admin.findById(
      decoded.id
    );

    if (!admin) {
      return res.status(401).json({
        success: false,
        message:
          "Admin account could not be found.",
      });
    }

    /* ======================================================
       CHECK ADMIN ACCOUNT STATUS
    ====================================================== */

    if (!admin.isActive) {
      return res.status(403).json({
        success: false,
        message:
          "This admin account has been disabled.",
      });
    }

    /* ======================================================
       CHECK ADMIN ROLE
    ====================================================== */

    if (
      !["admin", "superadmin"].includes(
        admin.role
      )
    ) {
      return res.status(403).json({
        success: false,
        message:
          "You do not have permission to access this resource.",
      });
    }

    /* ======================================================
       ATTACH ADMIN TO REQUEST
       ------------------------------------------------------
       Controllers can access:
          req.admin.id
          req.admin.email
          req.admin.role
========================================================== */

    req.admin = {
      id: admin._id.toString(),
      name: admin.name,
      email: admin.email,
      role: admin.role,
    };

    /* ======================================================
       CONTINUE
    ====================================================== */

    next();
  } catch (error) {
    console.error(
      "Admin authentication middleware error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Unable to verify admin authentication.",
    });
  }
};

export default authMiddleware;