import mongoose from "mongoose";

const generalSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      trim: true,
      maxlength: 150,
      default: "Shasar Solar Energy System",
    },

    legalName: {
      type: String,
      trim: true,
      maxlength: 200,
      default:
        "Shasarsolar Energy Systems Contracting LLC",
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      maxlength: 150,
      default: "Shasartech@gamail.com",
    },

    phone: {
      type: String,
      trim: true,
      maxlength: 50,
      default: "",
    },

    website: {
      type: String,
      trim: true,
      maxlength: 250,
      default: "",
    },

    timezone: {
      type: String,
      trim: true,
      default: "Asia/Dubai",
    },
  },
  { _id: false }
);

const notificationsSchema = new mongoose.Schema(
  {
    emailNotifications: {
      type: Boolean,
      default: true,
    },

    newInquiry: {
      type: Boolean,
      default: true,
    },

    inquiryStatus: {
      type: Boolean,
      default: true,
    },

    testimonialSubmission: {
      type: Boolean,
      default: true,
    },

    systemAlerts: {
      type: Boolean,
      default: true,
    },
  },
  { _id: false }
);

const businessSchema = new mongoose.Schema(
  {
    address: {
      type: String,
      trim: true,
      maxlength: 300,
      default:
        "Saeed Khalid Building, Office #05, Saeed Port, Deira, Dubai, United Arab Emirates",
    },

    city: {
      type: String,
      trim: true,
      maxlength: 100,
      default: "Dubai",
    },

    country: {
      type: String,
      trim: true,
      maxlength: 100,
      default: "United Arab Emirates",
    },

    businessHours: {
      type: String,
      trim: true,
      maxlength: 100,
      default: "24/7",
    },

    website: {
      type: String,
      trim: true,
      maxlength: 250,
      default: "",
    },
  },
  { _id: false }
);

const settingsSchema = new mongoose.Schema(
  {
    general: {
      type: generalSchema,
      default: () => ({}),
    },

    notifications: {
      type: notificationsSchema,
      default: () => ({}),
    },

    business: {
      type: businessSchema,
      default: () => ({}),
    },
  },
  {
    timestamps: true,
    collection: "settings",
  }
);

const Settings =
  mongoose.models.Settings ||
  mongoose.model("Settings", settingsSchema);

export default Settings;