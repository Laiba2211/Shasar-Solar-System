// ==========================================================
// SHASAR SOLAR SYSTEM
// PRICING CONTROLLER
// ADMIN PRICING CRUD
// ==========================================================

import mongoose from "mongoose";

import Pricing from "../models/PricingModel.js";

// ==========================================================
// HELPERS
// ==========================================================

const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

// ----------------------------------------------------------
// BOOLEAN NORMALIZER
// ----------------------------------------------------------

const normalizeBoolean = (value, defaultValue = false) => {
  if (value === undefined || value === null) {
    return defaultValue;
  }

  if (typeof value === "boolean") {
    return value;
  }

  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();

    if (normalized === "true") {
      return true;
    }

    if (normalized === "false") {
      return false;
    }
  }

  return Boolean(value);
};

// ----------------------------------------------------------
// NUMBER NORMALIZER
// ----------------------------------------------------------

const normalizeNumber = (value) => {
  if (
    value === undefined ||
    value === null ||
    value === ""
  ) {
    return null;
  }

  const number = Number(value);

  return Number.isFinite(number)
    ? number
    : null;
};

// ----------------------------------------------------------
// FEATURES NORMALIZER
// ----------------------------------------------------------

const normalizeFeatures = (features) => {
  if (!Array.isArray(features)) {
    return [];
  }

  return features
    .map((feature) => String(feature).trim())
    .filter(Boolean);
};

// ----------------------------------------------------------
// SLUG GENERATOR
// ----------------------------------------------------------

const generateSlug = (title) => {
  return String(title || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
};

// ----------------------------------------------------------
// PAYLOAD NORMALIZER
// ----------------------------------------------------------

const normalizePayload = (body = {}) => {
  const payload = {
    title:
      body.title !== undefined
        ? String(body.title).trim()
        : undefined,

    slug:
      body.slug !== undefined &&
      String(body.slug).trim()
        ? generateSlug(body.slug)
        : body.title
          ? generateSlug(body.title)
          : undefined,

    description:
      body.description !== undefined
        ? String(body.description).trim()
        : undefined,

    category:
      body.category !== undefined
        ? String(body.category).trim()
        : undefined,

    startingPrice:
      body.startingPrice !== undefined
        ? normalizeNumber(body.startingPrice)
        : undefined,

    price:
      body.price !== undefined
        ? normalizeNumber(body.price)
        : undefined,

    currency:
      body.currency !== undefined
        ? String(body.currency)
            .trim()
            .toUpperCase()
        : undefined,

    priceUnit:
      body.priceUnit !== undefined
        ? String(body.priceUnit).trim()
        : undefined,

    minimumPrice:
      body.minimumPrice !== undefined
        ? normalizeNumber(body.minimumPrice)
        : undefined,

    maximumPrice:
      body.maximumPrice !== undefined
        ? normalizeNumber(body.maximumPrice)
        : undefined,

    systemSize:
      body.systemSize !== undefined
        ? String(body.systemSize).trim()
        : undefined,

    pricingDescription:
      body.pricingDescription !== undefined
        ? String(body.pricingDescription).trim()
        : undefined,

    features:
      body.features !== undefined
        ? normalizeFeatures(body.features)
        : undefined,

    active:
      body.active !== undefined
        ? normalizeBoolean(body.active)
        : undefined,

    featured:
      body.featured !== undefined
        ? normalizeBoolean(body.featured)
        : undefined,

    displayOrder:
      body.displayOrder !== undefined
        ? normalizeNumber(body.displayOrder)
        : undefined,

    internalNotes:
      body.internalNotes !== undefined
        ? String(body.internalNotes).trim()
        : undefined,
  };

  // --------------------------------------------------------
  // Remove undefined values
  // --------------------------------------------------------

  Object.keys(payload).forEach((key) => {
    if (payload[key] === undefined) {
      delete payload[key];
    }
  });

  return payload;
};

// ==========================================================
// GET ALL PRICING
// ==========================================================

export const getPricing = async (req, res) => {
  try {
    const pricing = await Pricing.find({})
      .sort({
        displayOrder: 1,
        createdAt: -1,
      })
      .lean();

    return res.status(200).json({
      success: true,
      count: pricing.length,
      data: pricing,
    });
  } catch (error) {
    console.error(
      "GET /api/pricing error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch pricing plans.",
      error: error.message,
    });
  }
};

// ==========================================================
// GET SINGLE PRICING
// ==========================================================

export const getPricingById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid pricing ID.",
      });
    }

    const pricing = await Pricing.findById(id).lean();

    if (!pricing) {
      return res.status(404).json({
        success: false,
        message: "Pricing plan not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: pricing,
    });
  } catch (error) {
    console.error(
      "GET /api/pricing/:id error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch pricing plan.",
      error: error.message,
    });
  }
};

// ==========================================================
// CREATE PRICING
// ==========================================================

export const createPricing = async (req, res) => {
  try {
    const payload = normalizePayload(req.body);

    // ------------------------------------------------------
    // Required fields
    // ------------------------------------------------------

    if (!payload.title) {
      return res.status(400).json({
        success: false,
        message: "Pricing title is required.",
      });
    }

    if (!payload.description) {
      return res.status(400).json({
        success: false,
        message: "Short description is required.",
      });
    }

    if (!payload.category) {
      return res.status(400).json({
        success: false,
        message: "Pricing category is required.",
      });
    }

    // ------------------------------------------------------
    // Generate slug
    // ------------------------------------------------------

    if (!payload.slug) {
      payload.slug = generateSlug(payload.title);
    }

    // ------------------------------------------------------
    // Price validation
    // ------------------------------------------------------

    if (
      payload.minimumPrice !== null &&
      payload.maximumPrice !== null &&
      payload.minimumPrice !== undefined &&
      payload.maximumPrice !== undefined &&
      payload.minimumPrice > payload.maximumPrice
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Minimum price cannot be greater than maximum price.",
      });
    }

    // ------------------------------------------------------
    // Duplicate slug
    // ------------------------------------------------------

    const existingSlug = await Pricing.findOne({
      slug: payload.slug,
    }).lean();

    if (existingSlug) {
      return res.status(409).json({
        success: false,
        message:
          "A pricing plan with this slug already exists.",
      });
    }

    // ------------------------------------------------------
    // Defaults
    // ------------------------------------------------------

    if (payload.active === undefined) {
      payload.active = true;
    }

    if (payload.featured === undefined) {
      payload.featured = false;
    }

    if (payload.displayOrder === undefined) {
      payload.displayOrder = 0;
    }

    // ------------------------------------------------------
    // Create
    // ------------------------------------------------------

    const pricing = await Pricing.create(payload);

    return res.status(201).json({
      success: true,
      message: "Pricing plan created successfully.",
      data: pricing,
    });
  } catch (error) {
    console.error(
      "POST /api/pricing error:",
      error
    );

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message:
          "A pricing plan with this slug already exists.",
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: Object.values(error.errors)
          .map((item) => item.message)
          .join(", "),
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to create pricing plan.",
      error: error.message,
    });
  }
};

// ==========================================================
// UPDATE PRICING
// ==========================================================

export const updatePricing = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid pricing ID.",
      });
    }

    const existingPricing =
      await Pricing.findById(id);

    if (!existingPricing) {
      return res.status(404).json({
        success: false,
        message: "Pricing plan not found.",
      });
    }

    const payload = normalizePayload(req.body);

    // ------------------------------------------------------
    // Slug
    // ------------------------------------------------------

    if (!payload.slug && payload.title) {
      payload.slug = generateSlug(payload.title);
    }

    // ------------------------------------------------------
    // Required fields
    // ------------------------------------------------------

    if (
      payload.title !== undefined &&
      !payload.title
    ) {
      return res.status(400).json({
        success: false,
        message: "Pricing title cannot be empty.",
      });
    }

    if (
      payload.description !== undefined &&
      !payload.description
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Short description cannot be empty.",
      });
    }

    // ------------------------------------------------------
    // Duplicate slug
    // ------------------------------------------------------

    if (payload.slug) {
      const duplicate = await Pricing.findOne({
        slug: payload.slug,
        _id: { $ne: id },
      }).lean();

      if (duplicate) {
        return res.status(409).json({
          success: false,
          message:
            "Another pricing plan already uses this slug.",
        });
      }
    }

    // ------------------------------------------------------
    // Price range
    // ------------------------------------------------------

    const minimum =
      payload.minimumPrice !== undefined
        ? payload.minimumPrice
        : existingPricing.minimumPrice;

    const maximum =
      payload.maximumPrice !== undefined
        ? payload.maximumPrice
        : existingPricing.maximumPrice;

    if (
      minimum !== null &&
      minimum !== undefined &&
      maximum !== null &&
      maximum !== undefined &&
      minimum > maximum
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Minimum price cannot be greater than maximum price.",
      });
    }

    // ------------------------------------------------------
    // Update
    // ------------------------------------------------------

    const updatedPricing =
      await Pricing.findByIdAndUpdate(
        id,
        {
          $set: payload,
        },
        {
          new: true,
          runValidators: true,
        }
      );

    return res.status(200).json({
      success: true,
      message:
        "Pricing plan updated successfully.",
      data: updatedPricing,
    });
  } catch (error) {
    console.error(
      "PUT /api/pricing/:id error:",
      error
    );

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message:
          "A pricing plan with this slug already exists.",
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: Object.values(error.errors)
          .map((item) => item.message)
          .join(", "),
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to update pricing plan.",
      error: error.message,
    });
  }
};

// ==========================================================
// DELETE PRICING
// ==========================================================

export const deletePricing = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid pricing ID.",
      });
    }

    const pricing =
      await Pricing.findByIdAndDelete(id);

    if (!pricing) {
      return res.status(404).json({
        success: false,
        message: "Pricing plan not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message:
        "Pricing plan deleted successfully.",
      data: pricing,
    });
  } catch (error) {
    console.error(
      "DELETE /api/pricing/:id error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to delete pricing plan.",
      error: error.message,
    });
  }
};

// ==========================================================
// TOGGLE ACTIVE
// ==========================================================

export const togglePricingActive = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid pricing ID.",
      });
    }

    const pricing =
      await Pricing.findById(id);

    if (!pricing) {
      return res.status(404).json({
        success: false,
        message: "Pricing plan not found.",
      });
    }

    // ------------------------------------------------------
    // If client provides a value, use it.
    // Otherwise simply toggle current value.
    // ------------------------------------------------------

    if (req.body?.active !== undefined) {
      pricing.active = normalizeBoolean(
        req.body.active
      );
    } else {
      pricing.active = !pricing.active;
    }

    await pricing.save();

    return res.status(200).json({
      success: true,
      message: pricing.active
        ? "Pricing plan activated."
        : "Pricing plan deactivated.",
      data: pricing,
    });
  } catch (error) {
    console.error(
      "PATCH /api/pricing/:id/active error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to update pricing status.",
      error: error.message,
    });
  }
};

// ==========================================================
// TOGGLE FEATURED
// ==========================================================

export const togglePricingFeatured = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid pricing ID.",
      });
    }

    const pricing =
      await Pricing.findById(id);

    if (!pricing) {
      return res.status(404).json({
        success: false,
        message: "Pricing plan not found.",
      });
    }

    if (req.body?.featured !== undefined) {
      pricing.featured = normalizeBoolean(
        req.body.featured
      );
    } else {
      pricing.featured = !pricing.featured;
    }

    await pricing.save();

    return res.status(200).json({
      success: true,
      message: pricing.featured
        ? "Pricing plan marked as featured."
        : "Pricing plan removed from featured.",
      data: pricing,
    });
  } catch (error) {
    console.error(
      "PATCH /api/pricing/:id/featured error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to update featured status.",
      error: error.message,
    });
  }
};