
import "dotenv/config";

import { fileURLToPath } from "url";
import express from "express";
import cors from "cors";
import path from "path";

// ==========================================================
// CONFIG / DATABASE / SERVICES
// ==========================================================

import connectDB from "./config/db.js";
import { verifyEmailConnection } from "./services/emailService.js";

// ==========================================================
// ROUTES
// ==========================================================

import contactRoutes from "./routes/contactRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import pricingRoutes from "./routes/pricingRoutes.js";
import testimonialRoutes from "./routes/TestimonialRoutes.js";
import analyticsRoutes from "./routes/AnalyticsRoutes.js";
import settingsRoutes from "./routes/SettingsRoutes.js";
// ==========================================================
// APP INITIALIZATION
// ==========================================================

const app = express();

// ==========================================================
// ES MODULE PATH
// ==========================================================

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ==========================================================
// PORT
// ==========================================================

const PORT = process.env.PORT || 5000;

// ==========================================================
// CORS CONFIGURATION
// ==========================================================

// Default development origins
const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:5174",
  "http://127.0.0.1:5174",
];

// Add CLIENT_URL from .env
if (process.env.CLIENT_URL) {
  const clientUrl = process.env.CLIENT_URL.trim();

  if (
    clientUrl &&
    !allowedOrigins.includes(clientUrl)
  ) {
    allowedOrigins.push(clientUrl);
  }
}

// Optional additional frontend origins.
// Example:
// CLIENT_URLS=http://localhost:5173,http://localhost:5174
if (process.env.CLIENT_URLS) {
  const additionalOrigins =
    process.env.CLIENT_URLS
      .split(",")
      .map((origin) => origin.trim())
      .filter(Boolean);

  additionalOrigins.forEach((origin) => {
    if (!allowedOrigins.includes(origin)) {
      allowedOrigins.push(origin);
    }
  });
}

console.log(
  "Allowed CORS origins:",
  allowedOrigins,
);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without Origin header.
      // Useful for Postman, curl and server-to-server requests.
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.error(
        `CORS blocked request from origin: ${origin}`,
      );

      return callback(
        new Error(
          `CORS blocked request from origin: ${origin}`,
        ),
      );
    },

    credentials: true,

    methods: [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
      "OPTIONS",
    ],

    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
  }),
);

// ==========================================================
// BODY PARSERS
// ==========================================================

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  }),
);

// ==========================================================
// SERVE UPLOADED SERVICE MEDIA
// ==========================================================

app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "uploads"),
  ),
);

// ==========================================================
// API ROUTES
// ==========================================================

// Contact
app.use(
  "/api/contact",
  contactRoutes,
);

// Admin
app.use(
  "/api/admin",
  adminRoutes,
);

// Services
app.use( "/api/services", serviceRoutes,);

// Pricing
app.use("/api/pricing", pricingRoutes);

 // projects
app.use("/api/projects", projectRoutes);
 // Testimonials
 app.use("/api/testimonials", testimonialRoutes);
 // Analytics
 app.use("/api/analytics", analyticsRoutes);
//  settings
app.use("/api/settings", settingsRoutes);
      
      // ==========================================================
// ROOT HEALTH CHECK
// ==========================================================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Shasar Solar API is running.",
  });
});

// ==========================================================
// API HEALTH CHECK
// ==========================================================

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Shasar Solar API is healthy.",
    port: PORT,
  });
});

// ==========================================================
// SERVICES API TEST
// ==========================================================

app.get("/api/services-test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Services API route is reachable.",
  });
});

// ==========================================================
// 404 HANDLER
// ==========================================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API endpoint not found.",
    path: req.originalUrl,
  });
});

// ==========================================================
// GLOBAL ERROR HANDLER
// ==========================================================

app.use((error, req, res, next) => {
  console.error(
    "Server error:",
    error.message,
  );

  // --------------------------------------------------------
  // CORS ERROR
  // --------------------------------------------------------

  if (
    error.message?.startsWith(
      "CORS blocked request",
    )
  ) {
    return res.status(403).json({
      success: false,
      message: error.message,
    });
  }

  // --------------------------------------------------------
  // GENERAL ERROR
  // --------------------------------------------------------

  return res.status(
    error.statusCode || 500,
  ).json({
    success: false,
    message:
      error.message ||
      "Internal server error.",
  });
});

// ==========================================================
// START SERVER
// ==========================================================

const startServer = async () => {
  try {
    // ------------------------------------------------------
    // CONNECT DATABASE
    // ------------------------------------------------------

    await connectDB();

    // ------------------------------------------------------
    // VERIFY EMAIL CONNECTION
    // ------------------------------------------------------

    await verifyEmailConnection();

    // ------------------------------------------------------
    // START EXPRESS SERVER
    // ------------------------------------------------------

    app.listen(PORT, () => {
      console.log("");
      console.log(
        "==========================================",
      );
      console.log(
        "        SHASAR SOLAR API SERVER",
      );
      console.log(
        "==========================================",
      );

      console.log(
        `Server running on port: ${PORT}`,
      );

      console.log(
        `Local API: http://localhost:${PORT}`,
      );

      console.log(
        `Health Check: http://localhost:${PORT}/api/health`,
      );

      console.log(
        `Services API: http://localhost:${PORT}/api/services`,
      );

      console.log(
        "==========================================",
      );
      console.log("");
    });
  } catch (error) {
    console.error("");
    console.error(
      "==========================================",
    );
    console.error(
      "       SERVER STARTUP FAILED",
    );
    console.error(
      "==========================================",
    );

    console.error(
      error.message,
    );

    console.error(
      "==========================================",
    );
    console.error("");

    process.exit(1);
  }
};

// ==========================================================
// RUN SERVER
// ==========================================================

startServer();

