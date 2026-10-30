import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    // ========================================================
    // 01. BASIC INFORMATION
    // ========================================================

    title: {
      type: String,
      required: [true, "Service title is required"],
      trim: true,
      maxlength: 150,
    },

    description: {
      type: String,
      required: [true, "Service description is required"],
      trim: true,
      maxlength: 500,
    },

    detailedDescription: {
      type: String,
      trim: true,
      default: "",
    },

    slug: {
      type: String,
      required: [true, "Service slug is required"],
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: 180,
    },

    // ========================================================
    // 02. SERVICE MEDIA
    // image OR video
    // ========================================================

    mediaType: {
      type: String,
      enum: ["image", "video"],
      required: [true, "Service media type is required"],
    },

    mediaUrl: {
      type: String,
      required: [true, "Service media URL is required"],
      trim: true,
    },

    // ========================================================
    // 03. SERVICE DETAILS
    // ========================================================

    category: {
      type: String,
      trim: true,
      default: "",
    },

    serviceType: {
      type: String,
      trim: true,
      default: "",
    },

    // ========================================================
    // 04. DUBAI / UAE SERVICE INFORMATION
    // ========================================================

    serviceArea: {
      type: String,
      trim: true,
      default: "",
    },

    suitableFor: {
      type: [String],
      default: [],
    },

    systemSize: {
      type: String,
      trim: true,
      default: "",
    },

    // ========================================================
    // 05. PRICING
    // ========================================================

    startingPrice: {
      type: Number,
      default: null,
      min: 0,
    },

    priceUnit: {
      type: String,
      trim: true,
      default: "",
    },

    pricingDescription: {
      type: String,
      trim: true,
      default: "",
    },

    // ========================================================
    // PUBLISHING SETTINGS
    // ========================================================

    isActive: {
      type: Boolean,
      default: true,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    order: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
    collection: "services",
  }
);

// ============================================================
// INDEXES
// ============================================================

serviceSchema.index({
  isActive: 1,
  order: 1,
});

serviceSchema.index({
  slug: 1,
});

// ============================================================
// MODEL
// ============================================================

const Service =
  mongoose.models.Service ||
  mongoose.model("Service", serviceSchema);

export default Service;