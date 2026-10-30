import multer from "multer";
import path from "path";
import fs from "fs";

// ==========================================================
// SERVICES UPLOAD DIRECTORY
// ==========================================================

const uploadDirectory = path.join(
  process.cwd(),
  "uploads",
  "services"
);

// Create directory if it does not exist
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, {
    recursive: true,
  });
}

// ==========================================================
// STORAGE
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
      .toLowerCase();

    const uniqueName = `${originalName}-${Date.now()}${extension}`;

    cb(null, uniqueName);
  },
});

// ==========================================================
// FILE FILTER
// ==========================================================

const fileFilter = (req, file, cb) => {
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

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Only JPG, PNG, WEBP, MP4, WEBM and MOV files are allowed."
      ),
      false
    );
  }
};

// ==========================================================
// MULTER CONFIGURATION
// ==========================================================

const uploadServiceMedia = multer({
  storage,
  fileFilter,

  limits: {
    fileSize: 100 * 1024 * 1024,
  },
});

export default uploadServiceMedia;