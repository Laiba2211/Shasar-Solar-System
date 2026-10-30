// ==========================================================
// SHASAR SOLAR SYSTEM
// PROJECT MODEL
// PROJECT CRUD
// IMAGE + VIDEO MEDIA SUPPORT
// ==========================================================

import mongoose from "mongoose";

// ==========================================================
// PROJECT SCHEMA
// ==========================================================

const projectSchema = new mongoose.Schema(
  {
    // ------------------------------------------------------
    // BASIC PROJECT INFORMATION
    // ------------------------------------------------------

    title: {
      type: String,
      required: [true, "Project title is required"],
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Project description is required"],
      trim: true,
    },

    // ------------------------------------------------------
    // PROJECT DETAILS
    // ------------------------------------------------------

    location: {
      type: String,
      default: "",
      trim: true,
    },

    capacity: {
      type: String,
      default: "",
      trim: true,
    },

    type: {
      type: String,
      default: "",
      trim: true,
    },

    year: {
      type: Number,
      default: null,
    },

    // ------------------------------------------------------
    // PROJECT MEDIA
    //
    // IMAGE ONLY  -> allowed
    // VIDEO ONLY  -> allowed
    // BOTH       -> allowed
    // ------------------------------------------------------

    image: {
      type: String,
      default: "",
    },

    video: {
      type: String,
      default: "",
    },

    // ------------------------------------------------------
    // ADDITIONAL PROJECT INFORMATION
    // ------------------------------------------------------

    client: {
      type: String,
      default: "",
      trim: true,
    },

    status: {
      type: String,
      default: "",
      trim: true,
    },

    // ------------------------------------------------------
    // VISIBILITY
    // ------------------------------------------------------

    isActive: {
      type: Boolean,
      default: true,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    displayOrder: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// ==========================================================
// PROJECT MODEL
// ==========================================================

const Project =
  mongoose.models.Project ||
  mongoose.model("Project", projectSchema);



// ==========================================================
// EXPORT
// ==========================================================

export default Project;