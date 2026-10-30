// ==========================================================
// SHASAR SOLAR SYSTEM
// PROJECT MEDIA UPLOAD MIDDLEWARE
// IMAGE + VIDEO
// ==========================================================

import multer from "multer";
import path from "path";
import fs from "fs";

// ==========================================================
// UPLOAD DIRECTORY
// ==========================================================

const uploadDirectory = path.join(
  process.cwd(),
  "uploads",
  "projects"
);

// Create directory if it does not exist
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, {
    recursive: true,
  });
}

// ==========================================================
// STORAGE CONFIGURATION
// ==========================================================

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },

  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);

    const originalName = path
      .basename(file.originalname, extension)
      .replace(/[^a-zA-Z0-9-_]/g, "-")
      .replace(/-+/g, "-")
      .toLowerCase();

    const uniqueName = `${originalName}-${Date.now()}${extension}`;

    cb(null, uniqueName);
  },
});

// ==========================================================
// ALLOWED FILE TYPES
// ==========================================================

const allowedImageTypes = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const allowedVideoTypes = [
  "video/mp4",
  "video/webm",
  "video/quicktime",
];

const allowedTypes = [
  ...allowedImageTypes,
  ...allowedVideoTypes,
];

// ==========================================================
// FILE FILTER
// ==========================================================

const fileFilter = (req, file, cb) => {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
    return;
  }

  cb(
    new Error(
      "Only JPG, JPEG, PNG, WEBP, MP4, WEBM and MOV files are allowed."
    ),
    false
  );
};

// ==========================================================
// MULTER CONFIGURATION
// ==========================================================

const uploadProjectMedia = multer({
  storage,
  fileFilter,

  limits: {
    // Maximum file size = 100 MB
    fileSize: 100 * 1024 * 1024,

    // Maximum number of uploaded files
    files: 2,
  },
});

export default uploadProjectMedia;