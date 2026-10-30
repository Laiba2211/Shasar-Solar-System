// ==========================================================
// SHASAR SOLAR SYSTEM
// PROJECT ROUTES
// ==========================================================

import express from "express";

import {
  getProjects,
  getAdminProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";

import uploadProjectMedia from "../middleware/uploadProjectMedia.js";

const router = express.Router();


// ==========================================================
// PUBLIC PROJECTS
// GET /api/projects
// ==========================================================

router.get("/", getProjects);


// ==========================================================
// ADMIN PROJECTS
// GET /api/projects/admin
//
// IMPORTANT:
// This route MUST come before /:id
// otherwise "admin" can be treated as a project ID.
// ==========================================================

router.get("/admin", getAdminProjects);


// ==========================================================
// GET SINGLE PROJECT
// GET /api/projects/:id
// ==========================================================

router.get("/:id", getProjectById);


// ==========================================================
// CREATE PROJECT
// POST /api/projects
//
// Supports:
// - image
// - video
// ==========================================================

router.post(
  "/",
  uploadProjectMedia.fields([
    {
      name: "image",
      maxCount: 1,
    },
    {
      name: "video",
      maxCount: 1,
    },
  ]),
  createProject
);


// ==========================================================
// UPDATE PROJECT
// PUT /api/projects/:id
//
// Supports:
// - replace image
// - replace video
// - remove video
// - update project information
// ==========================================================

router.put(
  "/:id",
  uploadProjectMedia.fields([
    {
      name: "image",
      maxCount: 1,
    },
    {
      name: "video",
      maxCount: 1,
    },
  ]),
  updateProject
);


// ==========================================================
// DELETE PROJECT
// DELETE /api/projects/:id
// ==========================================================

router.delete(
  "/:id",
  deleteProject
);


export default router;