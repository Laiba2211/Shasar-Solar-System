import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  getSettings,
  updateGeneralSettings,
  updateNotificationSettings,
  updateBusinessSettings,
} from "../controllers/SettingsController.js";

const router = express.Router();

// ==========================================================
// SETTINGS
// All routes require authenticated admin
// ==========================================================

// GET /api/settings
router.get("/", authMiddleware, getSettings);

// PATCH /api/settings/general
router.patch(
  "/general",
  authMiddleware,
  updateGeneralSettings
);

// PATCH /api/settings/notifications
router.patch(
  "/notifications",
  authMiddleware,
  updateNotificationSettings
);

// PATCH /api/settings/business
router.patch(
  "/business",
  authMiddleware,
  updateBusinessSettings
);

export default router;