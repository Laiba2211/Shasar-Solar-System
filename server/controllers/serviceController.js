import Service from "../models/Service.js";
import fs from "fs";
import path from "path";

// ==========================================================
// HELPERS
// ==========================================================

// ----------------------------------------------------------
// CLEAN SLUG
// ----------------------------------------------------------

const cleanServiceSlug = (value) => {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
};

// ----------------------------------------------------------
// BOOLEAN VALUE
// ----------------------------------------------------------

const parseBoolean = (value, defaultValue) => {
  if (value === undefined || value === null || value === "") {
    return defaultValue;
  }

  return String(value).toLowerCase() === "true";
};

// ----------------------------------------------------------
// SUITABLE FOR
// Supports:
// ["Villas", "Offices"]
// OR
// '["Villas","Offices"]'
// OR
// "Villas, Offices"
// ----------------------------------------------------------

const parseSuitableFor = (value) => {
  if (value === undefined || value === null || value === "") {
    return [];
  }

  if (Array.isArray(value)) {
    return value
      .map((item) => String(item).trim())
      .filter(Boolean);
  }

  const stringValue = String(value).trim();

  if (!stringValue) {
    return [];
  }

  try {
    const parsed = JSON.parse(stringValue);

    if (Array.isArray(parsed)) {
      return parsed
        .map((item) => String(item).trim())
        .filter(Boolean);
    }
  } catch {
    // Not JSON, continue with comma-separated parsing.
  }

  return stringValue
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
};

// ==========================================================
// GET ALL SERVICES
// GET /api/services
// ==========================================================

export const getServices = async (req, res) => {
  try {
    const services = await Service.find().sort({
      order: 1,
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: services.length,
      data: services,
    });
  } catch (error) {
    console.error("Get services error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch services.",
    });
  }
};

// ==========================================================
// GET SINGLE SERVICE
// GET /api/services/:id
// ==========================================================

export const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;

    const service = await Service.findById(id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: service,
    });
  } catch (error) {
    console.error("Get service error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch service.",
    });
  }
};

// ==========================================================
// CREATE SERVICE
// POST /api/services
// ==========================================================

export const createService = async (req, res) => {
  let uploadedFilePath = null;

  try {
    const {
      title,
      description,
      detailedDescription,
      slug,

      category,
      serviceType,

      serviceArea,
      suitableFor,
      systemSize,

      startingPrice,
      priceUnit,
      pricingDescription,

      mediaType,
      mediaUrl,

      isActive,
      isFeatured,
      order,
    } = req.body;

    // ======================================================
    // REQUIRED TEXT FIELD VALIDATION
    // ======================================================

    if (
      !title ||
      String(title).trim() === "" ||
      !description ||
      String(description).trim() === "" ||
      !slug ||
      String(slug).trim() === ""
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Title, description and slug are required.",
      });
    }

    // ======================================================
    // MEDIA
    // ======================================================

    let finalMediaType = mediaType;
    let finalMediaUrl = mediaUrl;

    // ------------------------------------------------------
    // FILE UPLOADED FROM ADMIN PANEL
    // ------------------------------------------------------

    if (req.file) {
      uploadedFilePath = path.join(
        process.cwd(),
        "uploads",
        "services",
        req.file.filename
      );

      finalMediaUrl = `/uploads/services/${req.file.filename}`;

      // ----------------------------------------------------
      // DETERMINE MEDIA TYPE FROM FILE MIME TYPE
      // ----------------------------------------------------

      if (req.file.mimetype.startsWith("video/")) {
        finalMediaType = "video";
      } else if (req.file.mimetype.startsWith("image/")) {
        finalMediaType = "image";
      } else {
        return res.status(400).json({
          success: false,
          message:
            "Only image and video files are allowed.",
        });
      }
    }

    // ======================================================
    // MEDIA VALIDATION
    // ======================================================

    if (!finalMediaType || !finalMediaUrl) {
      return res.status(400).json({
        success: false,
        message: "Service media is required.",
      });
    }

    finalMediaType = String(finalMediaType).toLowerCase();

    if (!["image", "video"].includes(finalMediaType)) {
      return res.status(400).json({
        success: false,
        message:
          "Media type must be either image or video.",
      });
    }

    finalMediaUrl = String(finalMediaUrl).trim();

    // ======================================================
    // CLEAN SLUG
    // ======================================================

    const cleanSlug = cleanServiceSlug(slug);

    if (!cleanSlug) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid service slug.",
      });
    }

    // ======================================================
    // VALIDATE ORDER
    // ======================================================

    let finalOrder = 0;

    if (
      order !== undefined &&
      order !== null &&
      String(order).trim() !== ""
    ) {
      finalOrder = Number(order);

      if (Number.isNaN(finalOrder) || finalOrder < 0) {
        return res.status(400).json({
          success: false,
          message: "Order must be a valid non-negative number.",
        });
      }
    }

    // ======================================================
    // VALIDATE STARTING PRICE
    // ======================================================

    let finalStartingPrice = null;

    if (
      startingPrice !== undefined &&
      startingPrice !== null &&
      String(startingPrice).trim() !== ""
    ) {
      finalStartingPrice = Number(startingPrice);

      if (
        Number.isNaN(finalStartingPrice) ||
        finalStartingPrice < 0
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Starting price must be a valid non-negative number.",
        });
      }
    }

    // ======================================================
    // CHECK DUPLICATE SLUG
    // ======================================================

    const existingService = await Service.findOne({
      slug: cleanSlug,
    });

    if (existingService) {
      return res.status(409).json({
        success: false,
        message:
          "A service with this slug already exists.",
      });
    }

    // ======================================================
    // BOOLEAN VALUES
    // ======================================================

    const finalIsActive = parseBoolean(
      isActive,
      true
    );

    const finalIsFeatured = parseBoolean(
      isFeatured,
      false
    );

    // ======================================================
    // SUITABLE FOR
    // ======================================================

    const finalSuitableFor =
      parseSuitableFor(suitableFor);

    // ======================================================
    // CREATE SERVICE
    // ======================================================

    const service = await Service.create({
      // ----------------------------------------------------
      // 01. BASIC INFORMATION
      // ----------------------------------------------------

      title: String(title).trim(),

      description: String(description).trim(),

      detailedDescription:
        detailedDescription !== undefined
          ? String(detailedDescription).trim()
          : "",

      slug: cleanSlug,

      // ----------------------------------------------------
      // 02. MEDIA
      // ----------------------------------------------------

      mediaType: finalMediaType,

      mediaUrl: finalMediaUrl,

      // ----------------------------------------------------
      // 03. SERVICE DETAILS
      // ----------------------------------------------------

      category:
        category !== undefined
          ? String(category).trim()
          : "",

      serviceType:
        serviceType !== undefined
          ? String(serviceType).trim()
          : "",

      // ----------------------------------------------------
      // 04. DUBAI / UAE SERVICE INFORMATION
      // ----------------------------------------------------

      serviceArea:
        serviceArea !== undefined
          ? String(serviceArea).trim()
          : "",

      suitableFor: finalSuitableFor,

      systemSize:
        systemSize !== undefined
          ? String(systemSize).trim()
          : "",

      // ----------------------------------------------------
      // 05. PRICING
      // ----------------------------------------------------

      startingPrice: finalStartingPrice,

      priceUnit:
        priceUnit !== undefined
          ? String(priceUnit).trim()
          : "",

      pricingDescription:
        pricingDescription !== undefined
          ? String(pricingDescription).trim()
          : "",

      // ----------------------------------------------------
      // PUBLISHING
      // ----------------------------------------------------

      isActive: finalIsActive,

      isFeatured: finalIsFeatured,

      order: finalOrder,
    });

    // ======================================================
    // SUCCESS RESPONSE
    // ======================================================

    return res.status(201).json({
      success: true,
      message: "Service created successfully.",
      data: service,
    });
  } catch (error) {
    console.error(
      "Create service error:",
      error
    );

    // ======================================================
    // DELETE UPLOADED FILE IF DATABASE CREATION FAILS
    // ======================================================

    if (
      uploadedFilePath &&
      fs.existsSync(uploadedFilePath)
    ) {
      try {
        fs.unlinkSync(uploadedFilePath);

        console.log(
          "Uploaded file removed after failed service creation."
        );
      } catch (fileError) {
        console.error(
          "Failed to remove uploaded file:",
          fileError
        );
      }
    }

    // ======================================================
    // DUPLICATE KEY ERROR
    // ======================================================

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message:
          "A service with this slug already exists.",
      });
    }

    // ======================================================
    // MONGOOSE VALIDATION ERROR
    // ======================================================

    if (error.name === "ValidationError") {
      const messages = Object.values(
        error.errors
      ).map((item) => item.message);

      return res.status(400).json({
        success: false,
        message: messages.join(" "),
      });
    }

    // ======================================================
    // SERVER ERROR
    // ======================================================

    return res.status(500).json({
      success: false,
      message: "Unable to create service.",
    });
  }
};

// ==========================================================
// UPDATE SERVICE
// PUT /api/services/:id
// ==========================================================

export const updateService = async (req, res) => {
  let uploadedFilePath = null;

  try {
    const { id } = req.params;

    const {
      title,
      description,
      detailedDescription,
      slug,

      category,
      serviceType,

      serviceArea,
      suitableFor,
      systemSize,

      startingPrice,
      priceUnit,
      pricingDescription,

      mediaType,
      mediaUrl,

      isActive,
      isFeatured,
      order,
    } = req.body;

    // ======================================================
    // FIND SERVICE
    // ======================================================

    const service = await Service.findById(id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found.",
      });
    }

    const oldMediaUrl = service.mediaUrl;

    // ======================================================
    // 01. BASIC INFORMATION
    // ======================================================

    // ------------------------------------------------------
    // TITLE
    // ------------------------------------------------------

    if (title !== undefined) {
      if (String(title).trim() === "") {
        return res.status(400).json({
          success: false,
          message: "Service title cannot be empty.",
        });
      }

      service.title = String(title).trim();
    }

    // ------------------------------------------------------
    // DESCRIPTION
    // ------------------------------------------------------

    if (description !== undefined) {
      if (String(description).trim() === "") {
        return res.status(400).json({
          success: false,
          message:
            "Service description cannot be empty.",
        });
      }

      service.description =
        String(description).trim();
    }

    // ------------------------------------------------------
    // DETAILED DESCRIPTION
    // ------------------------------------------------------

    if (detailedDescription !== undefined) {
      service.detailedDescription =
        String(detailedDescription).trim();
    }

    // ------------------------------------------------------
    // SLUG
    // ------------------------------------------------------

    let cleanSlug = service.slug;

    if (slug !== undefined) {
      cleanSlug = cleanServiceSlug(slug);

      if (!cleanSlug) {
        return res.status(400).json({
          success: false,
          message:
            "Please provide a valid service slug.",
        });
      }
    }

    // ======================================================
    // DUPLICATE SLUG CHECK
    // ======================================================

    if (cleanSlug !== service.slug) {
      const existingService =
        await Service.findOne({
          slug: cleanSlug,
          _id: { $ne: id },
        });

      if (existingService) {
        return res.status(409).json({
          success: false,
          message:
            "A service with this slug already exists.",
        });
      }

      service.slug = cleanSlug;
    }

    // ======================================================
    // 02. SERVICE MEDIA
    // ======================================================

    if (req.file) {
      uploadedFilePath = path.join(
        process.cwd(),
        "uploads",
        "services",
        req.file.filename
      );

      // ----------------------------------------------------
      // CHECK FILE TYPE
      // ----------------------------------------------------

      if (req.file.mimetype.startsWith("video/")) {
        service.mediaType = "video";
      } else if (req.file.mimetype.startsWith("image/")) {
        service.mediaType = "image";
      } else {
        return res.status(400).json({
          success: false,
          message:
            "Only image and video files are allowed.",
        });
      }

      service.mediaUrl =
        `/uploads/services/${req.file.filename}`;
    } else {
      // ----------------------------------------------------
      // UPDATE MEDIA TYPE
      // ----------------------------------------------------

      if (mediaType !== undefined) {
        const cleanMediaType =
          String(mediaType).toLowerCase();

        if (
          !["image", "video"].includes(
            cleanMediaType
          )
        ) {
          return res.status(400).json({
            success: false,
            message:
              "Media type must be either image or video.",
          });
        }

        service.mediaType =
          cleanMediaType;
      }

      // ----------------------------------------------------
      // UPDATE MEDIA URL
      // ----------------------------------------------------

      if (mediaUrl !== undefined) {
        const cleanMediaUrl =
          String(mediaUrl).trim();

        if (!cleanMediaUrl) {
          return res.status(400).json({
            success: false,
            message:
              "Media URL cannot be empty.",
          });
        }

        service.mediaUrl =
          cleanMediaUrl;
      }
    }

    // ======================================================
    // 03. SERVICE DETAILS
    // ======================================================

    if (category !== undefined) {
      service.category =
        String(category).trim();
    }

    if (serviceType !== undefined) {
      service.serviceType =
        String(serviceType).trim();
    }

    // ======================================================
    // 04. DUBAI / UAE SERVICE INFORMATION
    // ======================================================

    if (serviceArea !== undefined) {
      service.serviceArea =
        String(serviceArea).trim();
    }

    if (suitableFor !== undefined) {
      service.suitableFor =
        parseSuitableFor(suitableFor);
    }

    if (systemSize !== undefined) {
      service.systemSize =
        String(systemSize).trim();
    }

    // ======================================================
    // 05. PRICING
    // ======================================================

    if (startingPrice !== undefined) {
      if (
        startingPrice === null ||
        String(startingPrice).trim() === ""
      ) {
        service.startingPrice = null;
      } else {
        const finalStartingPrice =
          Number(startingPrice);

        if (
          Number.isNaN(finalStartingPrice) ||
          finalStartingPrice < 0
        ) {
          return res.status(400).json({
            success: false,
            message:
              "Starting price must be a valid non-negative number.",
          });
        }

        service.startingPrice =
          finalStartingPrice;
      }
    }

    if (priceUnit !== undefined) {
      service.priceUnit =
        String(priceUnit).trim();
    }

    if (pricingDescription !== undefined) {
      service.pricingDescription =
        String(pricingDescription).trim();
    }

    // ======================================================
    // PUBLISHING SETTINGS
    // ======================================================

    if (isActive !== undefined) {
      service.isActive =
        String(isActive).toLowerCase() ===
        "true";
    }

    if (isFeatured !== undefined) {
      service.isFeatured =
        String(isFeatured).toLowerCase() ===
        "true";
    }

    // ======================================================
    // DISPLAY ORDER
    // ======================================================

    if (
      order !== undefined &&
      order !== null &&
      String(order).trim() !== ""
    ) {
      const finalOrder = Number(order);

      if (
        Number.isNaN(finalOrder) ||
        finalOrder < 0
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Order must be a valid non-negative number.",
        });
      }

      service.order = finalOrder;
    }

    // ======================================================
    // SAVE
    // ======================================================

    await service.save();

    // ======================================================
    // DELETE OLD UPLOADED MEDIA
    // ======================================================

    if (
      req.file &&
      oldMediaUrl &&
      oldMediaUrl.startsWith(
        "/uploads/services/"
      )
    ) {
      const oldFilePath = path.join(
        process.cwd(),
        oldMediaUrl
      );

      if (fs.existsSync(oldFilePath)) {
        try {
          fs.unlinkSync(oldFilePath);

          console.log(
            "Old service media deleted successfully."
          );
        } catch (fileError) {
          console.error(
            "Failed to delete old service media:",
            fileError
          );
        }
      }
    }

    // ======================================================
    // SUCCESS RESPONSE
    // ======================================================

    return res.status(200).json({
      success: true,
      message: "Service updated successfully.",
      data: service,
    });
  } catch (error) {
    console.error(
      "Update service error:",
      error
    );

    // ======================================================
    // CLEAN NEW UPLOAD IF UPDATE FAILED
    // ======================================================

    if (
      uploadedFilePath &&
      fs.existsSync(uploadedFilePath)
    ) {
      try {
        fs.unlinkSync(uploadedFilePath);

        console.log(
          "New uploaded file removed after failed update."
        );
      } catch (fileError) {
        console.error(
          "Failed to remove uploaded file:",
          fileError
        );
      }
    }

    // ======================================================
    // DUPLICATE KEY ERROR
    // ======================================================

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message:
          "A service with this slug already exists.",
      });
    }

    // ======================================================
    // VALIDATION ERROR
    // ======================================================

    if (error.name === "ValidationError") {
      const messages = Object.values(
        error.errors
      ).map((item) => item.message);

      return res.status(400).json({
        success: false,
        message: messages.join(" "),
      });
    }

    // ======================================================
    // SERVER ERROR
    // ======================================================

    return res.status(500).json({
      success: false,
      message: "Unable to update service.",
    });
  }
};

// ==========================================================
// DELETE SERVICE
// DELETE /api/services/:id
// ==========================================================

export const deleteService = async (req, res) => {
  try {
    const { id } = req.params;

    // ======================================================
    // FIND SERVICE
    // ======================================================

    const service =
      await Service.findByIdAndDelete(id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found.",
      });
    }

    // ======================================================
    // DELETE UPLOADED MEDIA
    // ======================================================

    if (
      service.mediaUrl &&
      service.mediaUrl.startsWith(
        "/uploads/services/"
      )
    ) {
      const filePath = path.join(
        process.cwd(),
        service.mediaUrl
      );

      if (fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);

          console.log(
            "Service media deleted successfully."
          );
        } catch (fileError) {
          console.error(
            "Failed to delete service media:",
            fileError
          );
        }
      }
    }

    // ======================================================
    // SUCCESS RESPONSE
    // ======================================================

    return res.status(200).json({
      success: true,
      message: "Service deleted successfully.",
      data: {
        id: service._id,
      },
    });
  } catch (error) {
    console.error(
      "Delete service error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Unable to delete service.",
    });
  }
};