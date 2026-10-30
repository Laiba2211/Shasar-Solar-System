import express from "express";

import contactController from "../controllers/contactController.js";
import authMiddleware from "../middleware/authMiddleware.js";

import {
  getInquiries,
  getInquiryById,
  getInquiryStats,
  updateInquiryStatus,
  updateInquiryReadStatus,
  deleteInquiry,
} from "../controllers/InquiryController.js";

const router = express.Router();

/* ==========================================================
   PUBLIC CONTACT FORM
   ----------------------------------------------------------
   IMPORTANT:
   - Keep this route public.
   - Existing client contact form continues using this route.
   - Existing MongoDB save + SMTP email flow remains untouched.
========================================================== */

router.post("/", contactController);


/* ==========================================================
   PROTECTED ADMIN INQUIRY ROUTES
   ----------------------------------------------------------
   All routes below require a valid admin JWT.
========================================================== */

/* ==========================================================
   GET INQUIRY STATISTICS
   GET /api/contact/admin/stats
========================================================== */

router.get(
  "/admin/stats",
  authMiddleware,
  getInquiryStats,
);


/* ==========================================================
   GET ALL INQUIRIES
   GET /api/contact/admin
========================================================== */

router.get(
  "/admin",
  authMiddleware,
  getInquiries,
);


/* ==========================================================
   GET SINGLE INQUIRY
   GET /api/contact/admin/:id
========================================================== */

router.get(
  "/admin/:id",
  authMiddleware,
  getInquiryById,
);


/* ==========================================================
   UPDATE INQUIRY STATUS
   PATCH /api/contact/admin/:id/status
========================================================== */

router.patch(
  "/admin/:id/status",
  authMiddleware,
  updateInquiryStatus,
);


/* ==========================================================
   MARK INQUIRY READ / UNREAD
   PATCH /api/contact/admin/:id/read
========================================================== */

router.patch(
  "/admin/:id/read",
  authMiddleware,
  updateInquiryReadStatus,
);


/* ==========================================================
   DELETE INQUIRY
   DELETE /api/contact/admin/:id
========================================================== */

router.delete(
  "/admin/:id",
  authMiddleware,
  deleteInquiry,
);


export default router;