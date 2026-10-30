import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

import {
  getTestimonials,
  getPublicTestimonials,
  getTestimonialById,
  createTestimonial,
  updateTestimonial,
  approveTestimonial,
  rejectTestimonial,
  toggleFeatured,
  deleteTestimonial,
  getTestimonialStats,
} from "../controllers/testimonialController.js";


/* ==========================================================
   ESM DIRECTORY HELPERS
========================================================== */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


/* ==========================================================
   ROUTER
========================================================== */

const router = express.Router();


/* ==========================================================
   UPLOAD DIRECTORY
========================================================== */

const uploadDirectory = path.join(
  __dirname,
  "../uploads/testimonials"
);


/*
 * Create testimonial upload directory
 * automatically if it does not exist.
 */

if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, {
    recursive: true,
  });
}


/* ==========================================================
   MULTER STORAGE
========================================================== */

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },

  filename: (req, file, cb) => {
    const extension = path
      .extname(file.originalname)
      .toLowerCase();

    const originalName = path
      .basename(file.originalname, extension)
      .replace(/[^a-zA-Z0-9-_]/g, "-")
      .replace(/-+/g, "-")
      .toLowerCase();

    const timestamp = Date.now();

    cb(
      null,
      `${originalName || "testimonial"}-${timestamp}${extension}`
    );
  },
});


/* ==========================================================
   FILE FILTER
========================================================== */

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "image/gif",
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
    return;
  }

  cb(
    new Error(
      "Only JPG, JPEG, PNG, WEBP, and GIF images are allowed."
    ),
    false
  );
};


/* ==========================================================
   MULTER CONFIGURATION
========================================================== */

const upload = multer({
  storage,
  fileFilter,

  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});


/* ==========================================================
   PUBLIC ROUTES
========================================================== */

/*
 * GET /api/testimonials/public
 *
 * Returns only:
 *
 * status = approved
 * consentToPublish = true
 */

router.get(
  "/public",
  getPublicTestimonials
);


/* ==========================================================
   ADMIN STATISTICS
========================================================== */

/*
 * GET /api/testimonials/stats
 */

router.get(
  "/stats",
  getTestimonialStats
);


/* ==========================================================
   GET ALL TESTIMONIALS
========================================================== */

/*
 * GET /api/testimonials
 *
 * Optional query parameters:
 *
 * ?status=pending
 * ?status=approved
 * ?status=rejected
 * ?serviceType=Commercial%20Solar%20Installation
 * ?search=dubai
 * ?featured=true
 */

router.get(
  "/",
  getTestimonials
);


/* ==========================================================
   CREATE TESTIMONIAL
========================================================== */

/*
 * POST /api/testimonials
 *
 * Supports:
 * - Admin-created testimonial
 * - Client-created testimonial
 * - Optional image upload
 *
 * FormData field:
 *
 * image
 */

router.post(
  "/",
  upload.single("image"),
  createTestimonial
);


/* ==========================================================
   GET SINGLE TESTIMONIAL
========================================================== */

/*
 * GET /api/testimonials/:id
 */

router.get(
  "/:id",
  getTestimonialById
);


/* ==========================================================
   UPDATE TESTIMONIAL
========================================================== */

/*
 * PUT /api/testimonials/:id
 *
 * Optional FormData field:
 *
 * image
 */

router.put(
  "/:id",
  upload.single("image"),
  updateTestimonial
);


/* ==========================================================
   APPROVE TESTIMONIAL
========================================================== */

/*
 * PATCH /api/testimonials/:id/approve
 */

router.patch(
  "/:id/approve",
  approveTestimonial
);


/* ==========================================================
   REJECT TESTIMONIAL
========================================================== */

/*
 * PATCH /api/testimonials/:id/reject
 */

router.patch(
  "/:id/reject",
  rejectTestimonial
);


/* ==========================================================
   TOGGLE FEATURED
========================================================== */

/*
 * PATCH /api/testimonials/:id/featured
 */

router.patch(
  "/:id/featured",
  toggleFeatured
);


/* ==========================================================
   DELETE TESTIMONIAL
========================================================== */

/*
 * DELETE /api/testimonials/:id
 */

router.delete(
  "/:id",
  deleteTestimonial
);


/* ==========================================================
   MULTER ERROR HANDLER
========================================================== */

router.use((error, req, res, next) => {
  if (!error) {
    return next();
  }


  /* -----------------------------------------------
     MULTER ERRORS
  ------------------------------------------------ */

  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        success: false,
        message: "Image size must not exceed 5 MB.",
      });
    }

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }


  /* -----------------------------------------------
     FILE TYPE ERROR
  ------------------------------------------------ */

  if (
    error.message &&
    error.message.includes("Only JPG")
  ) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }


  /* -----------------------------------------------
     UNKNOWN ERROR
  ------------------------------------------------ */

  console.error(
    "Testimonial route error:",
    error
  );

  return res.status(500).json({
    success: false,
    message:
      "Something went wrong while processing the testimonial.",
  });
});


/* ==========================================================
   EXPORT
========================================================== */

export default router;