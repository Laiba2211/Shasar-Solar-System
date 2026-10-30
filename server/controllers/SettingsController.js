import Settings from "../models/Settings.js";

// ==========================================================
// GET SETTINGS
// GET /api/settings
// ==========================================================

export const getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();

    // Create default settings document if none exists
    if (!settings) {
      settings = await Settings.create({});
    }

    return res.status(200).json({
      success: true,
      data: settings,
    });
  } catch (error) {
    console.error("Get settings error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to load settings.",
    });
  }
};

// ==========================================================
// UPDATE GENERAL SETTINGS
// PATCH /api/settings/general
// ==========================================================

export const updateGeneralSettings = async (req, res) => {
  try {
    const {
      companyName,
      legalName,
      email,
      phone,
      website,
      timezone,
    } = req.body;

    const updateData = {
      "general.companyName": companyName,
      "general.legalName": legalName,
      "general.email": email,
      "general.phone": phone,
      "general.website": website,
      "general.timezone": timezone,
    };

    const settings = await Settings.findOneAndUpdate(
      {},
      { $set: updateData },
      {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: "General settings updated successfully.",
      data: settings.general,
    });
  } catch (error) {
    console.error(
      "Update general settings error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Unable to update general settings.",
    });
  }
};

// ==========================================================
// UPDATE NOTIFICATION SETTINGS
// PATCH /api/settings/notifications
// ==========================================================

export const updateNotificationSettings = async (
  req,
  res
) => {
  try {
    const {
      emailNotifications,
      newInquiry,
      inquiryStatus,
      testimonialSubmission,
      systemAlerts,
    } = req.body;

    const updateData = {
      "notifications.emailNotifications":
        emailNotifications,
      "notifications.newInquiry": newInquiry,
      "notifications.inquiryStatus":
        inquiryStatus,
      "notifications.testimonialSubmission":
        testimonialSubmission,
      "notifications.systemAlerts": systemAlerts,
    };

    const settings = await Settings.findOneAndUpdate(
      {},
      { $set: updateData },
      {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      }
    );

    return res.status(200).json({
      success: true,
      message:
        "Notification settings updated successfully.",
      data: settings.notifications,
    });
  } catch (error) {
    console.error(
      "Update notification settings error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Unable to update notification settings.",
    });
  }
};

// ==========================================================
// UPDATE BUSINESS SETTINGS
// PATCH /api/settings/business
// ==========================================================

export const updateBusinessSettings = async (
  req,
  res
) => {
  try {
    const {
      address,
      city,
      country,
      businessHours,
      website,
    } = req.body;

    const updateData = {
      "business.address": address,
      "business.city": city,
      "business.country": country,
      "business.businessHours": businessHours,
      "business.website": website,
    };

    const settings = await Settings.findOneAndUpdate(
      {},
      { $set: updateData },
      {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      }
    );

    return res.status(200).json({
      success: true,
      message:
        "Business settings updated successfully.",
      data: settings.business,
    });
  } catch (error) {
    console.error(
      "Update business settings error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Unable to update business settings.",
    });
  }
};