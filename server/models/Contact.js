
import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      minlength: [3, "Full name must contain at least 3 characters"],
      maxlength: [100, "Full name cannot exceed 100 characters"],
    },

    companyName: {
      type: String,
      trim: true,
      maxlength: [150, "Company name cannot exceed 150 characters"],
      default: "",
    },

    email: {
      type: String,
      required: [true, "Email address is required"],
      trim: true,
      lowercase: true,
      maxlength: [150, "Email address cannot exceed 150 characters"],
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      minlength: [7, "Phone number is invalid"],
      maxlength: [30, "Phone number is invalid"],
    },

    projectType: {
      type: String,
      required: [true, "Project type is required"],
      trim: true,
      enum: [
        "Residential Solar",
        "Commercial Solar",
        "Industrial Solar",
        "Solar Battery Storage",
        "Solar Maintenance",
        "Solar Cleaning",
        "EV Charging",
        "Solar Consultation",
        "Other",
      ],
    },

    location: {
      type: String,
      required: [true, "Project location is required"],
      trim: true,
      maxlength: [150, "Project location cannot exceed 150 characters"],
    },

    systemSize: {
      type: String,
      trim: true,
      maxlength: [100, "System size cannot exceed 100 characters"],
      default: "",
    },

    message: {
      type: String,
      required: [true, "Project message is required"],
      trim: true,
      minlength: [20, "Message must contain at least 20 characters"],
      maxlength: [1500, "Message cannot exceed 1500 characters"],
    },

    status: {
      type: String,
      enum: ["new", "contacted", "qualified", "converted", "closed"],
      default: "new",
      trim: true,
    },

    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    collection: "contact",
  }
);

const Contact =
  mongoose.models.Contact || mongoose.model("Contact", contactSchema);

export default Contact;

