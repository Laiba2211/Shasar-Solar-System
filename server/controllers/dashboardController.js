import Contact from "../models/Contact.js";
import Project from "../models/ProjectModel.js";
import Service from "../models/Service.js";
import Testimonial from "../models/TestimonialModel.js";

// ============================================================
// CONSTANTS
// ============================================================

const REPORTING_TIMEZONE = "Asia/Dubai";

const INQUIRY_STATUSES = [
  "new",
  "contacted",
  "qualified",
  "converted",
  "closed",
];

const RECENT_LIMIT = 5;

// ============================================================
// DATE HELPERS
// ============================================================

const isValidDateString = (value) => {
  return (
    typeof value === "string" &&
    /^\d{4}-\d{2}-\d{2}$/.test(value)
  );
};

const getDubaiDateParts = (date = new Date()) => {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: REPORTING_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const parts = formatter.formatToParts(date);

  const result = {};

  for (const part of parts) {
    if (
      part.type === "year" ||
      part.type === "month" ||
      part.type === "day"
    ) {
      result[part.type] = part.value;
    }
  }

  return {
    year: Number(result.year),
    month: Number(result.month),
    day: Number(result.day),
  };
};

const formatDate = (year, month, day) => {
  return `${year}-${String(month).padStart(
    2,
    "0"
  )}-${String(day).padStart(2, "0")}`;
};

const dubaiDateToUTC = (
  dateString,
  endOfDay = false
) => {
  const time = endOfDay
    ? "23:59:59.999"
    : "00:00:00.000";

  return new Date(
    `${dateString}T${time}+04:00`
  );
};

const addDays = (dateString, amount) => {
  const date = new Date(
    `${dateString}T00:00:00+04:00`
  );

  date.setUTCDate(
    date.getUTCDate() + amount
  );

  return date.toISOString().slice(0, 10);
};

// ============================================================
// REPORTING RANGE
// ============================================================

const getReportingRange = (
  filter = "last_30_days",
  from,
  to
) => {
  const todayParts =
    getDubaiDateParts();

  const today = formatDate(
    todayParts.year,
    todayParts.month,
    todayParts.day
  );

  // ----------------------------------------------------------
  // TODAY
  // ----------------------------------------------------------

  if (filter === "today") {
    return {
      startDay: today,
      endDay: today,
      startUTC: dubaiDateToUTC(today),
      endUTC: dubaiDateToUTC(
        addDays(today, 1)
      ),
    };
  }

  // ----------------------------------------------------------
  // YESTERDAY
  // ----------------------------------------------------------

  if (filter === "yesterday") {
    const yesterday =
      addDays(today, -1);

    return {
      startDay: yesterday,
      endDay: yesterday,
      startUTC:
        dubaiDateToUTC(yesterday),
      endUTC: dubaiDateToUTC(today),
    };
  }

  // ----------------------------------------------------------
  // LAST 7 DAYS
  // ----------------------------------------------------------

  if (
    filter === "last_7_days" ||
    filter === "7d"
  ) {
    const startDay =
      addDays(today, -6);

    return {
      startDay,
      endDay: today,
      startUTC:
        dubaiDateToUTC(startDay),
      endUTC: dubaiDateToUTC(
        addDays(today, 1)
      ),
    };
  }

  // ----------------------------------------------------------
  // LAST 30 DAYS
  // ----------------------------------------------------------

  if (
    filter === "last_30_days" ||
    filter === "30d"
  ) {
    const startDay =
      addDays(today, -29);

    return {
      startDay,
      endDay: today,
      startUTC:
        dubaiDateToUTC(startDay),
      endUTC: dubaiDateToUTC(
        addDays(today, 1)
      ),
    };
  }

  // ----------------------------------------------------------
  // THIS MONTH
  // ----------------------------------------------------------

  if (filter === "this_month") {
    const startDay = formatDate(
      todayParts.year,
      todayParts.month,
      1
    );

    return {
      startDay,
      endDay: today,
      startUTC:
        dubaiDateToUTC(startDay),
      endUTC: dubaiDateToUTC(
        addDays(today, 1)
      ),
    };
  }

  // ----------------------------------------------------------
  // LAST MONTH
  // ----------------------------------------------------------

  if (filter === "last_month") {
    let year = todayParts.year;
    let month =
      todayParts.month - 1;

    if (month === 0) {
      month = 12;
      year -= 1;
    }

    const startDay = formatDate(
      year,
      month,
      1
    );

    let nextYear = year;
    let nextMonth = month + 1;

    if (nextMonth === 13) {
      nextMonth = 1;
      nextYear += 1;
    }

    const nextMonthStart =
      formatDate(
        nextYear,
        nextMonth,
        1
      );

    const endDay = addDays(
      nextMonthStart,
      -1
    );

    return {
      startDay,
      endDay,
      startUTC:
        dubaiDateToUTC(startDay),
      endUTC:
        dubaiDateToUTC(
          nextMonthStart
        ),
    };
  }

  // ----------------------------------------------------------
  // THIS YEAR
  // ----------------------------------------------------------

  if (filter === "this_year") {
    const startDay =
      `${todayParts.year}-01-01`;

    return {
      startDay,
      endDay: today,
      startUTC:
        dubaiDateToUTC(startDay),
      endUTC: dubaiDateToUTC(
        addDays(today, 1)
      ),
    };
  }

  // ----------------------------------------------------------
  // CUSTOM
  // ----------------------------------------------------------

  if (
    filter === "custom" &&
    isValidDateString(from) &&
    isValidDateString(to)
  ) {
    return {
      startDay: from,
      endDay: to,
      startUTC:
        dubaiDateToUTC(from),
      endUTC: dubaiDateToUTC(
        addDays(to, 1)
      ),
    };
  }

  // ----------------------------------------------------------
  // ALL TIME
  // ----------------------------------------------------------

  if (
    filter === "all" ||
    filter === "all_time"
  ) {
    return {
      startDay: null,
      endDay: null,
      startUTC: null,
      endUTC: null,
    };
  }

  // ----------------------------------------------------------
  // DEFAULT
  // ----------------------------------------------------------

  const startDay =
    addDays(today, -29);

  return {
    startDay,
    endDay: today,
    startUTC:
      dubaiDateToUTC(startDay),
    endUTC: dubaiDateToUTC(
      addDays(today, 1)
    ),
  };
};

// ============================================================
// DATE MATCH
// ============================================================

const buildDateMatch = (
  field,
  startUTC,
  endUTC
) => {
  if (!startUTC && !endUTC) {
    return {};
  }

  const match = {};

  match[field] = {};

  if (startUTC) {
    match[field].$gte = startUTC;
  }

  if (endUTC) {
    match[field].$lt = endUTC;
  }

  return match;
};

// ============================================================
// GENERATE DATE LABELS SAFELY
// ============================================================

const generateDateLabels = (
  startDay,
  endDay
) => {
  if (!startDay || !endDay) {
    return [];
  }

  const labels = [];

  const start = new Date(
    `${startDay}T00:00:00Z`
  );

  const end = new Date(
    `${endDay}T00:00:00Z`
  );

  if (
    Number.isNaN(start.getTime()) ||
    Number.isNaN(end.getTime())
  ) {
    return [];
  }

  let current = start.getTime();
  const endTime = end.getTime();

  // Safety limit: dashboard trend can never need
  // more than 366 daily labels.
  let safetyCounter = 0;

  while (
    current <= endTime &&
    safetyCounter < 366
  ) {
    labels.push(
      new Date(current)
        .toISOString()
        .slice(0, 10)
    );

    current +=
      24 * 60 * 60 * 1000;

    safetyCounter += 1;
  }

  return labels;
};

// ============================================================
// GET DASHBOARD
// GET /api/admin/dashboard
// ============================================================

export const getDashboard = async (
  req,
  res
) => {
  try {
    console.log(
      "========================================"
    );

    console.log(
      "DASHBOARD START"
    );

    console.log(
      "Dashboard request received."
    );

    console.log(
      "Query:",
      req.query
    );

    console.log(
      "========================================"
    );

    // ========================================================
    // 1. DATE FILTER
    // ========================================================

    const {
      date = "last_30_days",
      from,
      to,
    } = req.query;

    // ========================================================
    // 2. REPORTING RANGE
    // ========================================================

    const reporting =
      getReportingRange(
        date,
        from,
        to
      );

    const {
      startDay,
      endDay,
      startUTC,
      endUTC,
    } = reporting;

    console.log(
      "DASHBOARD DATE RANGE:",
      {
        date,
        startDay,
        endDay,
        startUTC,
        endUTC,
      }
    );

    // ========================================================
    // 3. DATE MATCH
    // ========================================================

    const dateMatch =
      buildDateMatch(
        "createdAt",
        startUTC,
        endUTC
      );

    console.log(
      "DASHBOARD DATE MATCH:",
      dateMatch
    );

    // ========================================================
    // 4. INVENTORY COUNTS
    // ========================================================

    console.log(
      "DASHBOARD STEP 4: Starting inventory counts..."
    );

    const [
      totalInquiries,

      totalProjects,
      activeProjects,
      inactiveProjects,
      featuredProjects,

      totalServices,
      activeServices,
      inactiveServices,
      featuredServices,

      totalTestimonials,
      pendingTestimonials,
      approvedTestimonials,
      rejectedTestimonials,
      featuredTestimonials,
    ] = await Promise.all([
      Contact.countDocuments({}),

      Project.countDocuments({}),

      Project.countDocuments({
        isActive: true,
      }),

      Project.countDocuments({
        isActive: false,
      }),

      Project.countDocuments({
        isFeatured: true,
      }),

      Service.countDocuments({}),

      Service.countDocuments({
        isActive: true,
      }),

      Service.countDocuments({
        isActive: false,
      }),

      Service.countDocuments({
        isFeatured: true,
      }),

      Testimonial.countDocuments({}),

      Testimonial.countDocuments({
        status: "pending",
      }),

      Testimonial.countDocuments({
        status: "approved",
      }),

      Testimonial.countDocuments({
        status: "rejected",
      }),

      Testimonial.countDocuments({
        isFeatured: true,
      }),
    ]);

    console.log(
      "DASHBOARD STEP 4: Inventory counts completed."
    );

    // ========================================================
    // 5. LEAD COUNTS
    // ========================================================

    console.log(
      "DASHBOARD STEP 5: Starting lead counts..."
    );

    const [
      newLeads,
      qualifiedLeads,
      convertedLeads,
    ] = await Promise.all([
      Contact.countDocuments({
        ...dateMatch,
        status: "new",
      }),

      Contact.countDocuments({
        ...dateMatch,
        status: "qualified",
      }),

      Contact.countDocuments({
        ...dateMatch,
        status: "converted",
      }),
    ]);

    console.log(
      "DASHBOARD STEP 5: Lead counts completed."
    );

    // ========================================================
    // 6. INQUIRY STATUS
    // ========================================================

    console.log(
      "DASHBOARD STEP 6: Starting status aggregation..."
    );

    const statusDistributionRaw =
      await Contact.aggregate([
        {
          $match: dateMatch,
        },
        {
          $group: {
            _id: "$status",
            count: {
              $sum: 1,
            },
          },
        },
      ]);

    const statusDistribution =
      INQUIRY_STATUSES.map(
        (status) => {
          const item =
            statusDistributionRaw.find(
              (entry) =>
                entry._id === status
            );

          return {
            status,
            count: item
              ? item.count
              : 0,
          };
        }
      );

    console.log(
      "DASHBOARD STEP 6: Status aggregation completed."
    );

    // ========================================================
    // 7. INQUIRY TREND
    // ========================================================

    console.log(
      "DASHBOARD STEP 7: Starting inquiry trend..."
    );

    /*
     * Important:
     * The aggregation itself returns only one row per day.
     * We additionally limit the output to 366 rows as a
     * protection against malformed/unexpected data.
     */

    const inquiryTrendRaw =
      await Contact.aggregate([
        {
          $match: dateMatch,
        },

        {
          $group: {
            _id: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: "$createdAt",
                timezone:
                  REPORTING_TIMEZONE,
              },
            },

            count: {
              $sum: 1,
            },
          },
        },

        {
          $sort: {
            _id: 1,
          },
        },

        {
          $limit: 366,
        },
      ]);

    console.log(
      "DASHBOARD STEP 7: Inquiry trend aggregation completed."
    );

    console.log(
      "DASHBOARD TREND ROWS:",
      inquiryTrendRaw.length
    );

    // --------------------------------------------------------
    // Build trend map
    // --------------------------------------------------------

    const inquiryTrendMap =
      new Map();

    for (
      const item of inquiryTrendRaw
    ) {
      if (
        typeof item._id === "string"
      ) {
        inquiryTrendMap.set(
          item._id,
          Number(item.count) || 0
        );
      }
    }

    console.log(
      "DASHBOARD TREND MAP COMPLETED."
    );

    // --------------------------------------------------------
    // Generate labels
    // --------------------------------------------------------

    const dateLabels =
      generateDateLabels(
        startDay,
        endDay
      );

    console.log(
      "DASHBOARD DATE LABELS:",
      dateLabels.length
    );

    // --------------------------------------------------------
    // Build trend
    // --------------------------------------------------------

    const inquiryTrend =
      dateLabels.map(
        (dateLabel) => ({
          date: dateLabel,
          count:
            inquiryTrendMap.get(
              dateLabel
            ) || 0,
        })
      );

    console.log(
      "DASHBOARD STEP 7: Inquiry trend completed."
    );

    // ========================================================
    // 8. CUSTOMER SERVICE DEMAND
    // ========================================================

    console.log(
      "DASHBOARD STEP 8: Starting service demand..."
    );

    const serviceDemandRaw =
      await Contact.aggregate([
        {
          $match: dateMatch,
        },

        {
          $group: {
            _id: {
              $ifNull: [
                "$projectType",
                "Other",
              ],
            },

            count: {
              $sum: 1,
            },
          },
        },

        {
          $sort: {
            count: -1,
          },
        },

        {
          $limit: 20,
        },
      ]);

    const serviceDemand =
      serviceDemandRaw.map(
        (item) => ({
          serviceType:
            item._id || "Other",

          count:
            Number(item.count) || 0,
        })
      );

    console.log(
      "DASHBOARD STEP 8: Service demand completed."
    );

    // ========================================================
    // 9. RECENT INQUIRIES
    // ========================================================

    console.log(
      "DASHBOARD STEP 9: Starting recent inquiries..."
    );

    const recentInquiries =
      await Contact.find({})
        .select(
          [
            "fullName",
            "companyName",
            "email",
            "phone",
            "projectType",
            "location",
            "systemSize",
            "message",
            "status",
            "isRead",
            "createdAt",
          ].join(" ")
        )
        .sort({
          createdAt: -1,
        })
        .limit(RECENT_LIMIT)
        .lean();

    console.log(
      "DASHBOARD STEP 9: Recent inquiries completed."
    );

    // ========================================================
    // 10. RECENT PROJECTS
    // ========================================================

    console.log(
      "DASHBOARD STEP 10: Starting recent projects..."
    );

    const recentProjects =
      await Project.find({})
        .select(
          [
            "title",
            "description",
            "location",
            "capacity",
            "type",
            "year",
            "image",
            "video",
            "client",
            "status",
            "isActive",
            "isFeatured",
            "displayOrder",
            "createdAt",
          ].join(" ")
        )
        .sort({
          createdAt: -1,
        })
        .limit(RECENT_LIMIT)
        .lean();

    console.log(
      "DASHBOARD STEP 10: Recent projects completed."
    );

    // ========================================================
    // 11. RECENT TESTIMONIALS
    // ========================================================

    console.log(
      "DASHBOARD STEP 11: Starting recent testimonials..."
    );

    const recentTestimonials =
      await Testimonial.find({})
        .select(
          [
            "clientName",
            "designation",
            "location",
            "serviceType",
            "rating",
            "comment",
            "imageUrl",
            "status",
            "consentToPublish",
            "isFeatured",
            "displayOrder",
            "createdAt",
          ].join(" ")
        )
        .sort({
          createdAt: -1,
        })
        .limit(RECENT_LIMIT)
        .lean();

    console.log(
      "DASHBOARD STEP 11: Recent testimonials completed."
    );

    // ========================================================
    // 12. PUBLISHED TESTIMONIALS
    // ========================================================

    console.log(
      "DASHBOARD STEP 12: Starting published testimonials..."
    );

    const publishedTestimonials =
      await Testimonial.countDocuments({
        status: "approved",
        consentToPublish: true,
      });

    console.log(
      "DASHBOARD STEP 12: Published testimonials completed."
    );

    // ========================================================
    // 13. AVERAGE RATING
    // ========================================================

    console.log(
      "DASHBOARD STEP 13: Starting average rating..."
    );

    const averageRatingRaw =
      await Testimonial.aggregate([
        {
          $match: {
            status: "approved",
            consentToPublish: true,
          },
        },

        {
          $group: {
            _id: null,

            averageRating: {
              $avg: "$rating",
            },
          },
        },
      ]);

    const averageRating =
      averageRatingRaw.length > 0 &&
      typeof averageRatingRaw[0]
        .averageRating === "number"
        ? Number(
            averageRatingRaw[0]
              .averageRating
              .toFixed(1)
          )
        : 0;

    console.log(
      "DASHBOARD STEP 13: Average rating completed."
    );

    // ========================================================
    // 14. ATTENTION REQUIRED
    // ========================================================

    const attention = [];

    if (newLeads > 0) {
      attention.push({
        type: "inquiries",

        title:
          "New inquiries need attention",

        description:
          `${newLeads} new inquiry${
            newLeads === 1
              ? ""
              : "ies"
          } require follow-up.`,

        count: newLeads,

        priority: "high",

        action:
          "/admin/inquiries",
      });
    }

    if (
      pendingTestimonials > 0
    ) {
      attention.push({
        type: "testimonials",

        title:
          "Testimonials awaiting review",

        description:
          `${pendingTestimonials} testimonial${
            pendingTestimonials === 1
              ? ""
              : "s"
          } are pending moderation.`,

        count:
          pendingTestimonials,

        priority: "medium",

        action:
          "/admin/testimonials",
      });
    }

    if (inactiveServices > 0) {
      attention.push({
        type: "services",

        title:
          "Inactive services",

        description:
          `${inactiveServices} service${
            inactiveServices === 1
              ? ""
              : "s"
          } are currently inactive.`,

        count:
          inactiveServices,

        priority: "low",

        action:
          "/admin/services",
      });
    }

    // ========================================================
    // 15. FINAL RESPONSE
    // ========================================================

    console.log(
      "========================================"
    );

    console.log(
      "DASHBOARD COMPLETE"
    );

    console.log(
      "========================================"
    );

    return res.status(200).json({
      success: true,

      data: {
        // ----------------------------------------------------
        // REPORTING
        // ----------------------------------------------------

        reporting: {
          timezone:
            REPORTING_TIMEZONE,

          dateFilter:
            date,

          from:
            startDay || null,

          to:
            endDay || null,
        },

        // ----------------------------------------------------
        // MAIN KPI OVERVIEW
        // ----------------------------------------------------

        overview: {
          totalInquiries,

          newLeads,

          qualifiedLeads,

          convertedLeads,

          totalProjects,

          activeServices,
        },

        // ----------------------------------------------------
        // INQUIRIES
        // ----------------------------------------------------

        inquiries: {
          total:
            totalInquiries,

          newLeads,

          qualifiedLeads,

          convertedLeads,

          statusDistribution,

          trend:
            inquiryTrend,

          serviceDemand,

          recent:
            recentInquiries,
        },

        // ----------------------------------------------------
        // PROJECTS
        // ----------------------------------------------------

        projects: {
          total:
            totalProjects,

          active:
            activeProjects,

          inactive:
            inactiveProjects,

          featured:
            featuredProjects,

          recent:
            recentProjects,
        },

        // ----------------------------------------------------
        // SERVICES
        // ----------------------------------------------------

        services: {
          total:
            totalServices,

          active:
            activeServices,

          inactive:
            inactiveServices,

          featured:
            featuredServices,
        },

        // ----------------------------------------------------
        // TESTIMONIALS
        // ----------------------------------------------------

        testimonials: {
          total:
            totalTestimonials,

          pending:
            pendingTestimonials,

          approved:
            approvedTestimonials,

          rejected:
            rejectedTestimonials,

          published:
            publishedTestimonials,

          featured:
            featuredTestimonials,

          averageRating,

          recent:
            recentTestimonials,
        },

        // ----------------------------------------------------
        // ATTENTION
        // ----------------------------------------------------

        attention,
      },
    });
  } catch (error) {
    console.error(
      "========================================"
    );

    console.error(
      "DASHBOARD CONTROLLER ERROR"
    );

    console.error(error);

    console.error(
      "========================================"
    );

    return res.status(500).json({
      success: false,

      message:
        "Failed to load dashboard data.",

      error:
        process.env.NODE_ENV ===
        "development"
          ? error.message
          : undefined,
    });
  }
};