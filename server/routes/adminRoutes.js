import express from "express";

import {
  loginAdmin,
  getAdminProfile,
  updateAdminProfile,
  changeAdminPassword,
} from "../controllers/adminController.js";

import {
  getDashboard,
} from "../controllers/dashboardController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", loginAdmin);

router.get(
  "/profile",
  authMiddleware,
  getAdminProfile
);

router.patch(
  "/profile",
  authMiddleware,
  updateAdminProfile
);

router.patch(
  "/change-password",
  authMiddleware,
  changeAdminPassword
);

router.get(
  "/dashboard",
  authMiddleware,
  getDashboard
);

export default router;