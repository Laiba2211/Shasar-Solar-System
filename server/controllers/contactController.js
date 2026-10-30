import Contact from "../models/Contact.js";
import sendContactNotification from "../services/emailService.js";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const contactController = async (req, res) => {
  try {
    const {
      fullName,
      companyName,
      email,
      phone,
      projectType,
      location,
      systemSize,
      message,
    } = req.body;

    /* =====================================================
       REQUIRED FIELDS
    ===================================================== */

    if (
      !fullName ||
      !email ||
      !phone ||
      !projectType ||
      !location ||
      !message
    ) {
      return res.status(400).json({
        success: false,
        message: "Please complete all required fields.",
      });
    }

    /* =====================================================
       CLEAN DATA
    ===================================================== */

    const cleanData = {
      fullName: String(fullName).trim(),

      companyName: String(
        companyName || ""
      ).trim(),

      email: String(email)
        .trim()
        .toLowerCase(),

      phone: String(phone).trim(),

      projectType: String(
        projectType
      ).trim(),

      location: String(location).trim(),

      systemSize: String(
        systemSize || ""
      ).trim(),

      message: String(message).trim(),
    };

    /* =====================================================
       VALIDATION
    ===================================================== */

    if (cleanData.fullName.length < 3) {
      return res.status(400).json({
        success: false,
        message:
          "Full name must contain at least 3 characters.",
      });
    }

    if (cleanData.fullName.length > 100) {
      return res.status(400).json({
        success: false,
        message:
          "Full name cannot exceed 100 characters.",
      });
    }

    if (!emailRegex.test(cleanData.email)) {
      return res.status(400).json({
        success: false,
        message:
          "Please enter a valid email address.",
      });
    }

    if (
      cleanData.phone.length < 7 ||
      cleanData.phone.length > 30
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Please enter a valid phone number.",
      });
    }

    if (!cleanData.projectType) {
      return res.status(400).json({
        success: false,
        message:
          "Please select a project type.",
      });
    }

    if (!cleanData.location) {
      return res.status(400).json({
        success: false,
        message:
          "Please enter the project location.",
      });
    }

    if (cleanData.message.length < 20) {
      return res.status(400).json({
        success: false,
        message:
          "Project message must contain at least 20 characters.",
      });
    }

    if (cleanData.message.length > 1500) {
      return res.status(400).json({
        success: false,
        message:
          "Project message cannot exceed 1500 characters.",
      });
    }

    /* =====================================================
       SAVE TO MONGODB
    ===================================================== */

    const contact = await Contact.create(
      cleanData
    );

    console.log(
      "Contact saved to MongoDB:",
      contact._id
    );

    /* =====================================================
       SEND EMAIL
    ===================================================== */

    try {
      await sendContactNotification(
        cleanData
      );

      console.log(
        `Contact inquiry email sent for ${cleanData.email}`
      );
    } catch (emailError) {
      console.error(
        "Contact saved, but email notification failed:",
        emailError.message
      );
    }

    /* =====================================================
       SUCCESS RESPONSE
    ===================================================== */

    return res.status(201).json({
      success: true,

      message:
        "Thank you! Your message has been submitted successfully. Our team will contact you shortly.",

      data: {
        id: contact._id,
      },
    });
  } catch (error) {
    console.error(
      "Contact controller error:",
      error
    );

    /* =====================================================
       MONGOOSE VALIDATION ERROR
    ===================================================== */

    if (
      error.name === "ValidationError"
    ) {
      const firstError =
        Object.values(
          error.errors
        )[0];

      return res.status(400).json({
        success: false,

        message:
          firstError?.message ||
          "Invalid form data.",
      });
    }

    /* =====================================================
       SERVER ERROR
    ===================================================== */

    return res.status(500).json({
      success: false,

      message:
        "Unable to submit your inquiry right now. Please try again later.",
    });
  }
};

export default contactController;