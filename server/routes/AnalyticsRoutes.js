
// ==========================================================
// SHASAR SOLAR SYSTEM
// ANALYTICS ROUTES
// ==========================================================

import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  getAnalyticsOverview,
} from "../controllers/AnalyticsController.js";

const router = express.Router();

// ==========================================================
// ANALYTICS OVERVIEW
// GET /api/analytics/overview
// ==========================================================

router.get(
  "/overview",
  authMiddleware,
  getAnalyticsOverview,
);

export default router;

