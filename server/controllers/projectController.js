// ==========================================================
// SHASAR SOLAR SYSTEM
// PROJECT CONTROLLER
// PROJECT CRUD
// IMAGE + VIDEO MEDIA SUPPORT
// ==========================================================

import fs from "fs";
import path from "path";

import Project from "../models/ProjectModel.js";

// ==========================================================
// MEDIA PATH HELPER
// ==========================================================

const getMediaPath = (file) => {
  if (!file) {
    return "";
  }

  return `/uploads/projects/${file.filename}`;
};

// ==========================================================
// DELETE MEDIA FILE
// ==========================================================

const deleteMediaFile = (mediaPath) => {
  if (!mediaPath) {
    return;
  }

  try {
    const cleanPath = mediaPath.replace(/^\/+/, "");

    const absolutePath = path.join(
      process.cwd(),
      cleanPath
    );

    if (fs.existsSync(absolutePath)) {
      fs.unlinkSync(absolutePath);
    }
  } catch (error) {
    console.error(
      "Media deletion error:",
      error.message
    );
  }
};

// ==========================================================
// GET PUBLIC PROJECTS
// ==========================================================

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      isActive: true,
    })
      .sort({
        displayOrder: 1,
        createdAt: -1,
      })
      .lean();

    return res.status(200).json({
      success: true,
      data: projects,
    });
  } catch (error) {
    console.error(
      "Get projects error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch projects.",
    });
  }
};

// ==========================================================
// GET ADMIN PROJECTS
// ==========================================================

export const getAdminProjects = async (
  req,
  res
) => {
  try {
    const projects = await Project.find()
      .sort({
        displayOrder: 1,
        createdAt: -1,
      })
      .lean();

    return res.status(200).json({
      success: true,
      data: projects,
    });
  } catch (error) {
    console.error(
      "Get admin projects error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch projects.",
    });
  }
};

// ==========================================================
// GET SINGLE PROJECT
// ==========================================================

export const getProjectById = async (
  req,
  res
) => {
  try {
    const project =
      await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    console.error(
      "Get project by ID error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch project.",
    });
  }
};

// ==========================================================
// CREATE PROJECT
// ==========================================================

export const createProject = async (
  req,
  res
) => {
  let uploadedImagePath = "";
  let uploadedVideoPath = "";

  try {
    // ------------------------------------------------------
    // GET UPLOADED MEDIA
    // ------------------------------------------------------

    const imageFile =
      req.files?.image?.[0] || null;

    const videoFile =
      req.files?.video?.[0] || null;

    // ------------------------------------------------------
    // MEDIA VALIDATION
    //
    // IMAGE ONLY      -> VALID
    // VIDEO ONLY      -> VALID
    // IMAGE + VIDEO   -> VALID
    // NOTHING         -> INVALID
    // ------------------------------------------------------

    if (!imageFile && !videoFile) {
      return res.status(400).json({
        success: false,
        message:
          "Please upload at least one project image or video.",
      });
    }

    // ------------------------------------------------------
    // CREATE MEDIA PATHS
    // ------------------------------------------------------

    uploadedImagePath =
      getMediaPath(imageFile);

    uploadedVideoPath =
      getMediaPath(videoFile);

    // ------------------------------------------------------
    // CREATE PROJECT
    // ------------------------------------------------------

    const project = await Project.create({
      title: req.body.title,
      description: req.body.description,
      location: req.body.location,
      capacity: req.body.capacity,
      type: req.body.type,
      year: Number(req.body.year),

      image: uploadedImagePath,
      video: uploadedVideoPath,

      isActive:
        req.body.isActive === undefined
          ? true
          : req.body.isActive === "true" ||
            req.body.isActive === true,

      isFeatured:
        req.body.isFeatured === undefined
          ? false
          : req.body.isFeatured === "true" ||
            req.body.isFeatured === true,

      displayOrder:
        req.body.displayOrder === undefined ||
        req.body.displayOrder === ""
          ? 0
          : Number(req.body.displayOrder),

      client: req.body.client || "",
      status: req.body.status || "",
    });

    return res.status(201).json({
      success: true,
      message: "Project created successfully.",
      data: project,
    });
  } catch (error) {
    console.error(
      "Create project error:",
      error
    );

    // ------------------------------------------------------
    // CLEAN UP UPLOADED FILES IF DATABASE SAVE FAILS
    // ------------------------------------------------------

    if (uploadedImagePath) {
      deleteMediaFile(uploadedImagePath);
    }

    if (uploadedVideoPath) {
      deleteMediaFile(uploadedVideoPath);
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message:
          Object.values(error.errors)
            .map((item) => item.message)
            .join(", "),
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to create project.",
    });
  }
};

// ==========================================================
// UPDATE PROJECT
// ==========================================================

export const updateProject = async (
  req,
  res
) => {
  try {
    const project =
      await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found.",
      });
    }

    // ------------------------------------------------------
    // NEW MEDIA
    // ------------------------------------------------------

    const newImageFile =
      req.files?.image?.[0] || null;

    const newVideoFile =
      req.files?.video?.[0] || null;

    // ------------------------------------------------------
    // KEEP EXISTING MEDIA UNLESS REPLACED
    // ------------------------------------------------------

    let imagePath =
      project.image || "";

    let videoPath =
      project.video || "";

    const oldImagePath =
      project.image || "";

    const oldVideoPath =
      project.video || "";

    // ------------------------------------------------------
    // REPLACE IMAGE
    // ------------------------------------------------------

    if (newImageFile) {
      imagePath =
        getMediaPath(newImageFile);
    }

    // ------------------------------------------------------
    // REPLACE VIDEO
    // ------------------------------------------------------

    if (newVideoFile) {
      videoPath =
        getMediaPath(newVideoFile);
    }

    // ------------------------------------------------------
    // OPTIONAL VIDEO REMOVAL
    // ------------------------------------------------------

    const removeVideo =
      req.body.removeVideo === "true" ||
      req.body.removeVideo === true;

    if (removeVideo && !newVideoFile) {
      videoPath = "";
    }

    // ------------------------------------------------------
    // FINAL MEDIA VALIDATION
    //
    // The project must always contain at least
    // one media type after the update.
    // ------------------------------------------------------

    if (!imagePath && !videoPath) {
      return res.status(400).json({
        success: false,
        message:
          "Please upload at least one project image or video.",
      });
    }

    // ------------------------------------------------------
    // UPDATE PROJECT
    // ------------------------------------------------------

    project.title =
      req.body.title ?? project.title;

    project.description =
      req.body.description ??
      project.description;

    project.location =
      req.body.location ??
      project.location;

    project.capacity =
      req.body.capacity ??
      project.capacity;

    project.type =
      req.body.type ?? project.type;

    if (
      req.body.year !== undefined &&
      req.body.year !== ""
    ) {
      project.year =
        Number(req.body.year);
    }

    if (req.body.isActive !== undefined) {
      project.isActive =
        req.body.isActive === "true" ||
        req.body.isActive === true;
    }

    if (req.body.isFeatured !== undefined) {
      project.isFeatured =
        req.body.isFeatured === "true" ||
        req.body.isFeatured === true;
    }

    if (
      req.body.displayOrder !== undefined &&
      req.body.displayOrder !== ""
    ) {
      project.displayOrder =
        Number(req.body.displayOrder);
    }

    if (req.body.client !== undefined) {
      project.client =
        req.body.client;
    }

    if (req.body.status !== undefined) {
      project.status =
        req.body.status;
    }

    project.image = imagePath;
    project.video = videoPath;

    // ------------------------------------------------------
    // SAVE
    // ------------------------------------------------------

    const updatedProject =
      await project.save();

    // ------------------------------------------------------
    // REMOVE OLD MEDIA AFTER SUCCESSFUL SAVE
    // ------------------------------------------------------

    if (
      newImageFile &&
      oldImagePath &&
      oldImagePath !== imagePath
    ) {
      deleteMediaFile(oldImagePath);
    }

    if (
      (newVideoFile || removeVideo) &&
      oldVideoPath &&
      oldVideoPath !== videoPath
    ) {
      deleteMediaFile(oldVideoPath);
    }

    return res.status(200).json({
      success: true,
      message: "Project updated successfully.",
      data: updatedProject,
    });
  } catch (error) {
    console.error(
      "Update project error:",
      error
    );

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message:
          Object.values(error.errors)
            .map((item) => item.message)
            .join(", "),
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to update project.",
    });
  }
};

// ==========================================================
// DELETE PROJECT
// ==========================================================

export const deleteProject = async (
  req,
  res
) => {
  try {
    const project =
      await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found.",
      });
    }

    // ------------------------------------------------------
    // DELETE PROJECT MEDIA
    // ------------------------------------------------------

    if (project.image) {
      deleteMediaFile(project.image);
    }

    if (project.video) {
      deleteMediaFile(project.video);
    }

    // ------------------------------------------------------
    // DELETE DATABASE RECORD
    // ------------------------------------------------------

    await Project.findByIdAndDelete(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message: "Project deleted successfully.",
    });
  } catch (error) {
    console.error(
      "Delete project error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to delete project.",
    });
  }
};