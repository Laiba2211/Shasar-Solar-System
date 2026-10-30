import express from "express";

import {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
} from "../controllers/serviceController.js";

import uploadServiceMedia from "../middleware/uploadServiceMedia.js";

const router = express.Router();

// ==========================================================
// GET ALL SERVICES
// GET /api/services
// ==========================================================

router.get("/", getServices);

// ==========================================================
// GET SINGLE SERVICE
// GET /api/services/:id
// ==========================================================

router.get("/:id", getServiceById);

// ==========================================================
// CREATE SERVICE
// POST /api/services
// ==========================================================

router.post(
  "/",
  uploadServiceMedia.single("media"),
  createService
);

// ==========================================================
// UPDATE SERVICE
// PUT /api/services/:id
// ==========================================================

router.put(
  "/:id",
  uploadServiceMedia.single("media"),
  updateService
);

// ==========================================================
// DELETE SERVICE
// DELETE /api/services/:id
// ==========================================================

router.delete(
  "/:id",
  deleteService
);

export default router;