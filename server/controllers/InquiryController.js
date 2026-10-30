
import mongoose from "mongoose";
import Contact from "../models/Contact.js";

/* ==========================================================
   CONSTANTS
========================================================== */

const INQUIRY_STATUSES = [
  "new",
  "contacted",
  "qualified",
  "converted",
  "closed",
];

/* ==========================================================
   HELPERS
========================================================== */

/**
 * Escape special RegExp characters so user search input
 * cannot accidentally become a regular expression.
 */
const escapeRegex = (value = "") => {
  return String(value).replace(
    /[.*+?^${}()|[\]\\]/g,
    "\\$&",
  );
};

/**
 * Safely convert a value into a positive integer.
 */
const getPositiveInteger = (value, fallback) => {
  const parsed = Number.parseInt(value, 10);

  if (Number.isNaN(parsed) || parsed < 1) {
    return fallback;
  }

  return parsed;
};

/**
 * Create date boundaries for inquiry filtering.
 *
 * Supported filters:
 * today
 * week
 * month
 * all
 *
 * Custom dates:
 * from=YYYY-MM-DD
 * to=YYYY-MM-DD
 */
const getDateRange = (dateFilter, from, to) => {
  const now = new Date();

  let startDate = null;
  let endDate = null;

  /* ======================================================
     CUSTOM DATE RANGE
  ====================================================== */

  if (from || to) {
    if (from) {
      const customStart = new Date(`${from}T00:00:00`);

      if (!Number.isNaN(customStart.getTime())) {
        startDate = customStart;
      }
    }

    if (to) {
      const customEnd = new Date(`${to}T23:59:59.999`);

      if (!Number.isNaN(customEnd.getTime())) {
        endDate = customEnd;
      }
    }

    return {
      startDate,
      endDate,
    };
  }

  /* ======================================================
     ALL TIME
  ====================================================== */

  if (!dateFilter || dateFilter === "all") {
    return {
      startDate: null,
      endDate: null,
    };
  }

  /* ======================================================
     TODAY
  ====================================================== */

  if (dateFilter === "today") {
    startDate = new Date(now);

    startDate.setHours(0, 0, 0, 0);

    endDate = new Date(now);

    endDate.setHours(23, 59, 59, 999);

    return {
      startDate,
      endDate,
    };
  }

  /* ======================================================
     THIS WEEK
  ====================================================== */

  if (dateFilter === "week") {
    startDate = new Date(now);

    const day = startDate.getDay();

    const difference = day === 0 ? 6 : day - 1;

    startDate.setDate(
      startDate.getDate() - difference,
    );

    startDate.setHours(0, 0, 0, 0);

    endDate = new Date(now);

    endDate.setHours(23, 59, 59, 999);

    return {
      startDate,
      endDate,
    };
  }

  /* ======================================================
     THIS MONTH
  ====================================================== */

  if (dateFilter === "month") {
    startDate = new Date(
      now.getFullYear(),
      now.getMonth(),
      1,
      0,
      0,
      0,
      0,
    );

    endDate = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
      23,
      59,
      59,
      999,
    );

    return {
      startDate,
      endDate,
    };
  }

  return {
    startDate: null,
    endDate: null,
  };
};

/**
 * Build MongoDB filter used by the admin inquiry list.
 */
const buildInquiryFilter = (query) => {
  const {
    search = "",
    status = "",
    projectType = "",
    date = "all",
    from = "",
    to = "",
  } = query;

  const filter = {};

  /* ======================================================
     SEARCH
  ====================================================== */

  const cleanSearch = String(search).trim();

  if (cleanSearch) {
    const searchRegex = new RegExp(
      escapeRegex(cleanSearch),
      "i",
    );

    filter.$or = [
      {
        fullName: searchRegex,
      },
      {
        email: searchRegex,
      },
      {
        phone: searchRegex,
      },
      {
        companyName: searchRegex,
      },
      {
        projectType: searchRegex,
      },
      {
        location: searchRegex,
      },
      {
        systemSize: searchRegex,
      },
      {
        message: searchRegex,
      },
    ];
  }

  /* ======================================================
     STATUS
  ====================================================== */

  if (
    status &&
    INQUIRY_STATUSES.includes(status)
  ) {
    filter.status = status;
  }

  /* ======================================================
     PROJECT TYPE
  ====================================================== */

  if (projectType) {
    filter.projectType = projectType;
  }

  /* ======================================================
     DATE FILTER
  ====================================================== */

  const {
    startDate,
    endDate,
  } = getDateRange(
    date,
    from,
    to,
  );

  if (startDate || endDate) {
    filter.createdAt = {};

    if (startDate) {
      filter.createdAt.$gte = startDate;
    }

    if (endDate) {
      filter.createdAt.$lte = endDate;
    }
  }

  return filter;
};

/* ==========================================================
   GET ALL INQUIRIES
   GET /api/contact/admin
========================================================== */

export const getInquiries = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      sort = "newest",
    } = req.query;

    const currentPage = getPositiveInteger(
      page,
      1,
    );

    const requestedLimit = getPositiveInteger(
      limit,
      20,
    );

    const currentLimit = Math.min(
      requestedLimit,
      100,
    );

    const skip =
      (currentPage - 1) * currentLimit;

    const filter = buildInquiryFilter(
      req.query,
    );

    /* ====================================================
       SORT
    ==================================================== */

    const sortOption =
      sort === "oldest"
        ? {
            createdAt: 1,
          }
        : {
            createdAt: -1,
          };

    /* ====================================================
       DATABASE QUERIES
    ==================================================== */

    const [
      inquiries,
      total,
    ] = await Promise.all([
      Contact.find(filter)
        .sort(sortOption)
        .skip(skip)
        .limit(currentLimit)
        .lean(),

      Contact.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(
      total / currentLimit,
    );

    return res.status(200).json({
      success: true,

      message:
        "Inquiries fetched successfully.",

      data: {
        inquiries,

        pagination: {
          page: currentPage,
          limit: currentLimit,
          total,
          totalPages,
          hasNextPage:
            currentPage < totalPages,
          hasPreviousPage:
            currentPage > 1,
        },
      },
    });
  } catch (error) {
    console.error(
      "Get inquiries error:",
      error,
    );

    return res.status(500).json({
      success: false,
      message:
        "Unable to load inquiries right now.",
    });
  }
};

/* ==========================================================
   GET SINGLE INQUIRY
   GET /api/contact/admin/:id
========================================================== */

export const getInquiryById = async (
  req,
  res,
) => {
  try {
    const { id } = req.params;

    if (
      !mongoose.Types.ObjectId.isValid(id)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid inquiry ID.",
      });
    }

    const inquiry =
      await Contact.findById(id).lean();

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: "Inquiry not found.",
      });
    }

    return res.status(200).json({
      success: true,

      message:
        "Inquiry fetched successfully.",

      data: {
        inquiry,
      },
    });
  } catch (error) {
    console.error(
      "Get inquiry by ID error:",
      error,
    );

    return res.status(500).json({
      success: false,
      message:
        "Unable to load this inquiry right now.",
    });
  }
};

/* ==========================================================
   GET INQUIRY STATISTICS
   GET /api/contact/admin/stats
========================================================== */

export const getInquiryStats = async (
  req,
  res,
) => {
  try {
    const [
      total,
      newCount,
      contactedCount,
      qualifiedCount,
      convertedCount,
      closedCount,
      unreadCount,
    ] = await Promise.all([
      Contact.countDocuments(),

      Contact.countDocuments({
        status: "new",
      }),

      Contact.countDocuments({
        status: "contacted",
      }),

      Contact.countDocuments({
        status: "qualified",
      }),

      Contact.countDocuments({
        status: "converted",
      }),

      Contact.countDocuments({
        status: "closed",
      }),

      Contact.countDocuments({
        isRead: false,
      }),
    ]);

    return res.status(200).json({
      success: true,

      message:
        "Inquiry statistics fetched successfully.",

      data: {
        total,
        new: newCount,
        contacted: contactedCount,
        qualified: qualifiedCount,
        converted: convertedCount,
        closed: closedCount,
        unread: unreadCount,
      },
    });
  } catch (error) {
    console.error(
      "Get inquiry stats error:",
      error,
    );

    return res.status(500).json({
      success: false,
      message:
        "Unable to load inquiry statistics right now.",
    });
  }
};

/* ==========================================================
   UPDATE INQUIRY STATUS
   PATCH /api/contact/admin/:id/status
========================================================== */

export const updateInquiryStatus = async (
  req,
  res,
) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    /* ====================================================
       VALIDATE ID
    ==================================================== */

    if (
      !mongoose.Types.ObjectId.isValid(id)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid inquiry ID.",
      });
    }

    /* ====================================================
       VALIDATE STATUS
    ==================================================== */

    if (
      !INQUIRY_STATUSES.includes(status)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid inquiry status.",
      });
    }

    /* ====================================================
       UPDATE
    ==================================================== */

    const inquiry =
      await Contact.findByIdAndUpdate(
        id,
        {
          $set: {
            status,
            isRead: true,
          },
        },
        {
          new: true,
          runValidators: true,
        },
      ).lean();

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: "Inquiry not found.",
      });
    }

    return res.status(200).json({
      success: true,

      message:
        "Inquiry status updated successfully.",

      data: {
        inquiry,
      },
    });
  } catch (error) {
    console.error(
      "Update inquiry status error:",
      error,
    );

    if (
      error.name === "ValidationError"
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid inquiry status.",
      });
    }

    return res.status(500).json({
      success: false,
      message:
        "Unable to update inquiry status right now.",
    });
  }
};

/* ==========================================================
   MARK INQUIRY AS READ / UNREAD
   PATCH /api/contact/admin/:id/read
========================================================== */

export const updateInquiryReadStatus =
  async (req, res) => {
    try {
      const { id } = req.params;
      const { isRead } = req.body;

      /* ====================================================
         VALIDATE ID
      ==================================================== */

      if (
        !mongoose.Types.ObjectId.isValid(id)
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid inquiry ID.",
        });
      }

      /* ====================================================
         VALIDATE BOOLEAN
      ==================================================== */

      if (
        typeof isRead !== "boolean"
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Read status must be true or false.",
        });
      }

      /* ====================================================
         UPDATE
      ==================================================== */

      const inquiry =
        await Contact.findByIdAndUpdate(
          id,
          {
            $set: {
              isRead,
            },
          },
          {
            new: true,
            runValidators: true,
          },
        ).lean();

      if (!inquiry) {
        return res.status(404).json({
          success: false,
          message:
            "Inquiry not found.",
        });
      }

      return res.status(200).json({
        success: true,

        message: isRead
          ? "Inquiry marked as read."
          : "Inquiry marked as unread.",

        data: {
          inquiry,
        },
      });
    } catch (error) {
      console.error(
        "Update inquiry read status error:",
        error,
      );

      return res.status(500).json({
        success: false,
        message:
          "Unable to update inquiry read status.",
      });
    }
  };

/* ==========================================================
   DELETE INQUIRY
   DELETE /api/contact/admin/:id
========================================================== */

export const deleteInquiry = async (
  req,
  res,
) => {
  try {
    const { id } = req.params;

    /* ====================================================
       VALIDATE ID
    ==================================================== */

    if (
      !mongoose.Types.ObjectId.isValid(id)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid inquiry ID.",
      });
    }

    /* ====================================================
       DELETE
    ==================================================== */

    const inquiry =
      await Contact.findByIdAndDelete(id);

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: "Inquiry not found.",
      });
    }

    return res.status(200).json({
      success: true,

      message:
        "Inquiry deleted successfully.",

      data: {
        id: inquiry._id,
      },
    });
  } catch (error) {
    console.error(
      "Delete inquiry error:",
      error,
    );

    return res.status(500).json({
      success: false,
      message:
        "Unable to delete inquiry right now.",
    });
  }
};

