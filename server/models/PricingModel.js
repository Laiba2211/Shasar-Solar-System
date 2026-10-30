// ==========================================================
// SHASAR SOLAR SYSTEM
// PRICING MODEL
// ADMIN PRICING MANAGEMENT
// MONGODB / MONGOOSE
// ==========================================================

import mongoose from "mongoose";

// ==========================================================
// PRICING SCHEMA
// ==========================================================

const pricingSchema = new mongoose.Schema(
  {
    // --------------------------------------------------------
    // BASIC INFORMATION
    // --------------------------------------------------------

    title: {
      type: String,
      required: [true, "Pricing title is required"],
      trim: true,
      maxlength: 150,
    },

    slug: {
      type: String,
      required: [true, "Pricing slug is required"],
      trim: true,
      lowercase: true,
      maxlength: 180,
    },

    description: {
      type: String,
      required: [true, "Short description is required"],
      trim: true,
      maxlength: 500,
    },

    // --------------------------------------------------------
    // CATEGORY
    // --------------------------------------------------------

    category: {
      type: String,
      required: [true, "Pricing category is required"],
      enum: [
        "Residential",
        "Commercial",
        "Industrial",
        "Battery Storage",
        "Maintenance",
        "Cleaning",
        "EV Charging",
        "Other",
      ],
      default: "Other",
      trim: true,
    },

    // --------------------------------------------------------
    // PRICE
    // --------------------------------------------------------

    startingPrice: {
      type: Number,
      min: 0,
      default: null,
    },

    price: {
      type: Number,
      min: 0,
      default: null,
    },

    currency: {
      type: String,
      trim: true,
      uppercase: true,
      default: "AED",
      maxlength: 10,
    },

    priceUnit: {
      type: String,
      enum: [
        "AED",
        "AED / kW",
        "AED / month",
        "AED / project",
        "Custom Quote",
      ],
      default: "AED",
      trim: true,
    },

    minimumPrice: {
      type: Number,
      min: 0,
      default: null,
    },

    maximumPrice: {
      type: Number,
      min: 0,
      default: null,
    },

    // --------------------------------------------------------
    // SYSTEM SIZE
    // --------------------------------------------------------

    systemSize: {
      type: String,
      enum: [
        "1–5 kW",
        "5–10 kW",
        "10–50 kW",
        "50–100 kW",
        "100+ kW",
        "Custom",
      ],
      default: "Custom",
      trim: true,
    },

    // --------------------------------------------------------
    // PRICING DESCRIPTION
    // --------------------------------------------------------

    pricingDescription: {
      type: String,
      trim: true,
      maxlength: 1000,
      default: "",
    },

    // --------------------------------------------------------
    // FEATURES
    // --------------------------------------------------------

    features: {
      type: [String],
      default: [],
      validate: {
        validator: function (features) {
          return Array.isArray(features);
        },
        message: "Features must be an array",
      },
    },

    // --------------------------------------------------------
    // STATUS
    // --------------------------------------------------------

    active: {
      type: Boolean,
      default: true,
    },

    featured: {
      type: Boolean,
      default: false,
    },

    // --------------------------------------------------------
    // DISPLAY ORDER
    // --------------------------------------------------------

    displayOrder: {
      type: Number,
      default: 0,
      min: 0,
    },

    // --------------------------------------------------------
    // INTERNAL ADMIN NOTES
    //
    // This field is intended for Admin Panel use only.
    // It must NOT be exposed by any public pricing API.
    // --------------------------------------------------------

    internalNotes: {
      type: String,
      trim: true,
      maxlength: 2000,
      default: "",
    },
  },
  {
    timestamps: true,
    collection: "pricing",
  }
);

// ==========================================================
// INDEXES
// ==========================================================

// Prevent duplicate pricing slugs.

pricingSchema.index(
  { slug: 1 },
  { unique: true }
);

// Useful for Admin Pricing listing/order.

pricingSchema.index({
  active: 1,
  featured: 1,
  displayOrder: 1,
});

// Useful for category filtering.

pricingSchema.index({
  category: 1,
});

// ==========================================================
// CLEAN FEATURES BEFORE SAVE
// ==========================================================

pricingSchema.pre("save", function (next) {
  if (Array.isArray(this.features)) {
    this.features = this.features
      .map((feature) => String(feature).trim())
      .filter(Boolean);
  }

  next();
});

// ==========================================================
// CLEAN FEATURES BEFORE FIND-AND-UPDATE
// ==========================================================

pricingSchema.pre(
  "findOneAndUpdate",
  function (next) {
    const update = this.getUpdate();

    if (
      update &&
      Array.isArray(update.features)
    ) {
      update.features = update.features
        .map((feature) => String(feature).trim())
        .filter(Boolean);
    }

    next();
  }
);

// ==========================================================
// MODEL
// ==========================================================

const Pricing = mongoose.model(
  "Pricing",
  pricingSchema
);

export default Pricing;