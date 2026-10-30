import express from "express";

import {
  getPricing,
  getPricingById,
  createPricing,
  updatePricing,
  deletePricing,
  togglePricingActive,
  togglePricingFeatured,
} from "../controllers/pricingController.js";

const router = express.Router();

// CRUD
router.get("/", getPricing);
router.get("/:id", getPricingById);
router.post("/", createPricing);
router.put("/:id", updatePricing);
router.delete("/:id", deletePricing);

// Quick actions
router.patch(
  "/:id/active",
  togglePricingActive
);

router.patch(
  "/:id/featured",
  togglePricingFeatured
);

export default router;