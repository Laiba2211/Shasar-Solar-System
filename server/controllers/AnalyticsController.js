// ==========================================================
// SHASAR SOLAR SYSTEM
// ANALYTICS CONTROLLER
// MongoDB-backed Admin Analytics
// ==========================================================

import Contact from "../models/Contact.js";
import Project from "../models/ProjectModel.js";
import Service from "../models/Service.js";

const REPORTING_TIMEZONE = "Asia/Dubai";

const INQUIRY_STATUSES = [
  "new",
  "contacted",
  "qualified",
  "converted",
  "closed",
];

// ==========================================================
// DATE HELPERS
// ==========================================================

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
    if (part.type !== "literal") {
      result[part.type] = part.value;
    }
  }

  return {
    year: Number(result.year),
    month: Number(result.month),
    day: Number(result.day),
  };
};

// ==========================================================
// DUBAI DATE -> UTC
// ==========================================================

const dubaiDateToUTC = (
  year,
  month,
  day,
  endOfDay = false
) => {
  const hour = endOfDay ? 23 : 0;
  const minute = endOfDay ? 59 : 0;
  const second = endOfDay ? 59 : 0;
  const millisecond = endOfDay ? 999 : 0;

  return new Date(
    Date.UTC(
      year,
      month - 1,
      day,
      hour - 4,
      minute,
      second,
      millisecond
    )
  );
};

// ==========================================================
// ADD DAYS
// ==========================================================

const addDays = (
  dateString,
  amount
) => {
  const [
    year,
    month,
    day,
  ] = dateString
    .split("-")
    .map(Number);

  const date = new Date(
    Date.UTC(
      year,
      month - 1,
      day
    )
  );

  date.setUTCDate(
    date.getUTCDate() + amount
  );

  return date
    .toISOString()
    .slice(0, 10);
};

// ==========================================================
// VALID DATE
// ==========================================================

const isValidDateString = (
  value
) => {
  if (
    typeof value !== "string" ||
    !/^\d{4}-\d{2}-\d{2}$/.test(
      value
    )
  ) {
    return false;
  }

  const date = new Date(
    `${value}T00:00:00Z`
  );

  return (
    !Number.isNaN(
      date.getTime()
    ) &&
    date
      .toISOString()
      .slice(0, 10) === value
  );
};

// ==========================================================
// REPORTING RANGE
// ==========================================================

const getReportingRange = (
  dateFilter,
  from,
  to
) => {
  const todayParts =
    getDubaiDateParts();

  const todayString =
    `${todayParts.year}-${String(
      todayParts.month
    ).padStart(2, "0")}-${String(
      todayParts.day
    ).padStart(2, "0")}`;

  // --------------------------------------------------------
  // CUSTOM
  // --------------------------------------------------------

  if (
    dateFilter === "custom" ||
    from ||
    to
  ) {
    if (
      !from ||
      !to ||
      !isValidDateString(from) ||
      !isValidDateString(to)
    ) {
      return {
        error:
          "Custom date range requires valid from and to dates in YYYY-MM-DD format.",
      };
    }

    if (from > to) {
      return {
        error:
          "The custom start date cannot be after the end date.",
      };
    }

    return {
      startDate:
        dubaiDateToUTC(
          ...from
            .split("-")
            .map(Number)
        ),

      endDate:
        dubaiDateToUTC(
          ...to
            .split("-")
            .map(Number),
          true
        ),

      startDay: from,
      endDay: to,
    };
  }

  // --------------------------------------------------------
  // ALL
  // --------------------------------------------------------

  if (
    !dateFilter ||
    dateFilter === "all"
  ) {
    return {
      startDate: null,
      endDate: null,
      startDay: null,
      endDay: null,
    };
  }

  // --------------------------------------------------------
  // TODAY
  // --------------------------------------------------------

  if (
    dateFilter === "today"
  ) {
    return {
      startDate:
        dubaiDateToUTC(
          todayParts.year,
          todayParts.month,
          todayParts.day
        ),

      endDate:
        dubaiDateToUTC(
          todayParts.year,
          todayParts.month,
          todayParts.day,
          true
        ),

      startDay: todayString,
      endDay: todayString,
    };
  }

  // --------------------------------------------------------
  // YESTERDAY
  // --------------------------------------------------------

  if (
    dateFilter === "yesterday"
  ) {
    const yesterday =
      addDays(
        todayString,
        -1
      );

    const [
      year,
      month,
      day,
    ] = yesterday
      .split("-")
      .map(Number);

    return {
      startDate:
        dubaiDateToUTC(
          year,
          month,
          day
        ),

      endDate:
        dubaiDateToUTC(
          year,
          month,
          day,
          true
        ),

      startDay: yesterday,
      endDay: yesterday,
    };
  }

  // --------------------------------------------------------
  // LAST 7 DAYS
  // --------------------------------------------------------

  if (dateFilter === "7d") {
    const startDay =
      addDays(
        todayString,
        -6
      );

    const [
      year,
      month,
      day,
    ] = startDay
      .split("-")
      .map(Number);

    return {
      startDate:
        dubaiDateToUTC(
          year,
          month,
          day
        ),

      endDate:
        dubaiDateToUTC(
          todayParts.year,
          todayParts.month,
          todayParts.day,
          true
        ),

      startDay,
      endDay: todayString,
    };
  }

  // --------------------------------------------------------
  // LAST 30 DAYS
  // --------------------------------------------------------

  if (
    dateFilter === "30d"
  ) {
    const startDay =
      addDays(
        todayString,
        -29
      );

    const [
      year,
      month,
      day,
    ] = startDay
      .split("-")
      .map(Number);

    return {
      startDate:
        dubaiDateToUTC(
          year,
          month,
          day
        ),

      endDate:
        dubaiDateToUTC(
          todayParts.year,
          todayParts.month,
          todayParts.day,
          true
        ),

      startDay,
      endDay: todayString,
    };
  }

  // --------------------------------------------------------
  // THIS MONTH
  // --------------------------------------------------------

  if (
    dateFilter ===
    "this_month"
  ) {
    const startDay =
      `${todayParts.year}-${String(
        todayParts.month
      ).padStart(2, "0")}-01`;

    return {
      startDate:
        dubaiDateToUTC(
          todayParts.year,
          todayParts.month,
          1
        ),

      endDate:
        dubaiDateToUTC(
          todayParts.year,
          todayParts.month,
          todayParts.day,
          true
        ),

      startDay,
      endDay: todayString,
    };
  }

  // --------------------------------------------------------
  // LAST MONTH
  // --------------------------------------------------------

  if (
    dateFilter ===
    "last_month"
  ) {
    let year =
      todayParts.year;

    let month =
      todayParts.month - 1;

    if (month === 0) {
      month = 12;
      year -= 1;
    }

    const lastDay =
      new Date(
        Date.UTC(
          year,
          month,
          0
        )
      ).getUTCDate();

    const startDay =
      `${year}-${String(
        month
      ).padStart(
        2,
        "0"
      )}-01`;

    const endDay =
      `${year}-${String(
        month
      ).padStart(
        2,
        "0"
      )}-${String(
        lastDay
      ).padStart(
        2,
        "0"
      )}`;

    return {
      startDate:
        dubaiDateToUTC(
          year,
          month,
          1
        ),

      endDate:
        dubaiDateToUTC(
          year,
          month,
          lastDay,
          true
        ),

      startDay,
      endDay,
    };
  }

  // --------------------------------------------------------
  // THIS YEAR
  // --------------------------------------------------------

  if (
    dateFilter ===
    "this_year"
  ) {
    return {
      startDate:
        dubaiDateToUTC(
          todayParts.year,
          1,
          1
        ),

      endDate:
        dubaiDateToUTC(
          todayParts.year,
          todayParts.month,
          todayParts.day,
          true
        ),

      startDay:
        `${todayParts.year}-01-01`,

      endDay:
        todayString,
    };
  }

  return {
    error:
      "Invalid analytics date filter.",
  };
};

// ==========================================================
// DATE MATCH
// ==========================================================

const buildDateMatch = (
  startDate,
  endDate
) => {
  const match = {};

  if (
    startDate ||
    endDate
  ) {
    match.createdAt = {};

    if (startDate) {
      match.createdAt.$gte =
        startDate;
    }

    if (endDate) {
      match.createdAt.$lte =
        endDate;
    }
  }

  return match;
};

// ==========================================================
// DATE LABELS
// ==========================================================

const generateDateLabels = (
  startDay,
  endDay
) => {
  if (
    !startDay ||
    !endDay
  ) {
    return [];
  }

  const labels = [];

  let current = startDay;

  while (
    current <= endDay
  ) {
    labels.push(current);

    if (
      current === endDay
    ) {
      break;
    }

    current = addDays(
      current,
      1
    );
  }

  return labels;
};

// ==========================================================
// ANALYTICS OVERVIEW
// ==========================================================

export const getAnalyticsOverview =
  async (req, res) => {
    try {
      const {
        date = "30d",
        from = "",
        to = "",
      } = req.query;

      // ----------------------------------------------------
      // REPORTING RANGE
      // ----------------------------------------------------

      const range =
        getReportingRange(
          date,
          from,
          to
        );

      if (range.error) {
        return res.status(400).json({
          success: false,
          message:
            range.error,
        });
      }

      const {
        startDate,
        endDate,
        startDay,
        endDay,
      } = range;

      const dateMatch =
        buildDateMatch(
          startDate,
          endDate
        );

      // ====================================================
      // IMPORTANT LOGIC
      //
      // Database totals are ALL-TIME.
      //
      // Date filter is used for:
      // - status distribution
      // - trend
      // - recent inquiries
      //
      // NOT for:
      // - total inquiries
      // - unread inquiries
      // - total projects
      // - total services
      // ====================================================

      const [
        inquiryDatabaseTotal,
        inquiryDatabaseUnread,

        inquiryStatus,
        inquiryTrendRaw,
        recentInquiries,

        projectOverview,
        projectByType,
        projectByYear,

        serviceOverview,
        serviceByCategory,
      ] = await Promise.all([
        // ==================================================
        // ALL INQUIRIES IN DATABASE
        // ==================================================

        Contact.countDocuments({}),

        // ==================================================
        // ALL UNREAD INQUIRIES IN DATABASE
        // ==================================================

        Contact.countDocuments({
          $or: [
            {
              isRead: false,
            },
            {
              isRead: {
                $exists: false,
              },
            },
          ],
        }),

        // ==================================================
        // STATUS DISTRIBUTION
        // SELECTED PERIOD
        // ==================================================

        Contact.aggregate([
          {
            $match:
              dateMatch,
          },

          {
            $project: {
              normalizedStatus: {
                $switch: {
                  branches: [
                    {
                      case: {
                        $eq: [
                          {
                            $toLower: {
                              $trim: {
                                input: {
                                  $ifNull:
                                    [
                                      "$status",
                                      "",
                                    ],
                                },
                              },
                            },
                          },
                          "new",
                        ],
                      },
                      then: "new",
                    },

                    {
                      case: {
                        $eq: [
                          {
                            $toLower: {
                              $trim: {
                                input: {
                                  $ifNull:
                                    [
                                      "$status",
                                      "",
                                    ],
                                },
                              },
                            },
                          },
                          "contacted",
                        ],
                      },
                      then: "contacted",
                    },

                    {
                      case: {
                        $eq: [
                          {
                            $toLower: {
                              $trim: {
                                input: {
                                  $ifNull:
                                    [
                                      "$status",
                                      "",
                                    ],
                                },
                              },
                            },
                          },
                          "qualified",
                        ],
                      },
                      then: "qualified",
                    },

                    {
                      case: {
                        $eq: [
                          {
                            $toLower: {
                              $trim: {
                                input: {
                                  $ifNull:
                                    [
                                      "$status",
                                      "",
                                    ],
                                },
                              },
                            },
                          },
                          "converted",
                        ],
                      },
                      then: "converted",
                    },

                    {
                      case: {
                        $eq: [
                          {
                            $toLower: {
                              $trim: {
                                input: {
                                  $ifNull:
                                    [
                                      "$status",
                                      "",
                                    ],
                                },
                              },
                            },
                          },
                          "closed",
                        ],
                      },
                      then: "closed",
                    },
                  ],

                  default: "new",
                },
              },
            },
          },

          {
            $group: {
              _id:
                "$normalizedStatus",

              count: {
                $sum: 1,
              },
            },
          },
        ]),

        // ==================================================
        // INQUIRY TREND
        // SELECTED PERIOD
        // ==================================================

        startDate
          ? Contact.aggregate([
              {
                $match:
                  dateMatch,
              },

              {
                $group: {
                  _id: {
                    $dateToString: {
                      format:
                        "%Y-%m-%d",

                      date:
                        "$createdAt",

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
                $project: {
                  _id: 0,
                  date: "$_id",
                  count: 1,
                },
              },

              {
                $sort: {
                  date: 1,
                },
              },
            ])
          : Promise.resolve([]),

        // ==================================================
        // RECENT INQUIRIES
        // SELECTED PERIOD
        // ==================================================

        Contact.find(
          dateMatch
        )
          .select(
            "_id fullName companyName email phone projectType location status isRead createdAt"
          )
          .sort({
            createdAt: -1,
          })
          .limit(10)
          .lean(),

        // ==================================================
        // ALL PROJECTS
        // ==================================================

        Project.aggregate([
          {
            $group: {
              _id: null,

              total: {
                $sum: 1,
              },

              active: {
                $sum: {
                  $cond: [
                    {
                      $eq: [
                        "$isActive",
                        true,
                      ],
                    },
                    1,
                    0,
                  ],
                },
              },

              inactive: {
                $sum: {
                  $cond: [
                    {
                      $eq: [
                        "$isActive",
                        false,
                      ],
                    },
                    1,
                    0,
                  ],
                },
              },

              featured: {
                $sum: {
                  $cond: [
                    {
                      $eq: [
                        "$isFeatured",
                        true,
                      ],
                    },
                    1,
                    0,
                  ],
                },
              },
            },
          },
        ]),

        // ==================================================
        // PROJECTS BY TYPE
        // ==================================================

        Project.aggregate([
          {
            $project: {
              normalizedType: {
                $cond: [
                  {
                    $eq: [
                      {
                        $trim: {
                          input: {
                            $ifNull: [
                              "$type",
                              "",
                            ],
                          },
                        },
                      },
                      "",
                    ],
                  },

                  "Uncategorized",

                  {
                    $trim: {
                      input:
                        "$type",
                    },
                  },
                ],
              },
            },
          },

          {
            $group: {
              _id:
                "$normalizedType",

              count: {
                $sum: 1,
              },
            },
          },

          {
            $sort: {
              count: -1,
              _id: 1,
            },
          },
        ]),

        // ==================================================
        // PROJECTS BY YEAR
        // ==================================================

        Project.aggregate([
          {
            $match: {
              year: {
                $ne: null,
              },
            },
          },

          {
            $group: {
              _id: "$year",

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
        ]),

        // ==================================================
        // ALL SERVICES
        // ==================================================

        Service.aggregate([
          {
            $group: {
              _id: null,

              total: {
                $sum: 1,
              },

              active: {
                $sum: {
                  $cond: [
                    {
                      $eq: [
                        "$isActive",
                        true,
                      ],
                    },
                    1,
                    0,
                  ],
                },
              },

              inactive: {
                $sum: {
                  $cond: [
                    {
                      $eq: [
                        "$isActive",
                        false,
                      ],
                    },
                    1,
                    0,
                  ],
                },
              },

              featured: {
                $sum: {
                  $cond: [
                    {
                      $eq: [
                        "$isFeatured",
                        true,
                      ],
                    },
                    1,
                    0,
                  ],
                },
              },
            },
          },
        ]),

        // ==================================================
        // SERVICES BY CATEGORY
        // ==================================================

        Service.aggregate([
          {
            $project: {
              normalizedCategory: {
                $cond: [
                  {
                    $eq: [
                      {
                        $trim: {
                          input: {
                            $ifNull: [
                              "$category",
                              "",
                            ],
                          },
                        },
                      },
                      "",
                    ],
                  },

                  "Uncategorized",

                  {
                    $trim: {
                      input:
                        "$category",
                    },
                  },
                ],
              },
            },
          },

          {
            $group: {
              _id:
                "$normalizedCategory",

              count: {
                $sum: 1,
              },
            },
          },

          {
            $sort: {
              count: -1,
              _id: 1,
            },
          },
        ]),
      ]);

      // ====================================================
      // STATUS MAP
      // ====================================================

      const statusMap =
        new Map();

      for (
        const item of inquiryStatus
      ) {
        statusMap.set(
          item._id,
          Number(
            item.count
          ) || 0
        );
      }

      // ====================================================
      // ALWAYS RETURN ALL STATUSES
      // ====================================================

      const statusDistribution =
        INQUIRY_STATUSES.map(
          (status) => ({
            status,

            count:
              statusMap.get(
                status
              ) || 0,
          })
        );

      // ====================================================
      // TREND
      // ====================================================

      let trend = [];

      if (startDate) {
        const trendMap =
          new Map();

        for (
          const item of inquiryTrendRaw
        ) {
          trendMap.set(
            item.date,
            Number(
              item.count
            ) || 0
          );
        }

        const labels =
          generateDateLabels(
            startDay,
            endDay
          );

        trend =
          labels.map(
            (dateLabel) => ({
              date:
                dateLabel,

              count:
                trendMap.get(
                  dateLabel
                ) || 0,
            })
          );
      }

      // ====================================================
      // PROJECT DATA
      // ====================================================

      const projectData =
        projectOverview[0] || {
          total: 0,
          active: 0,
          inactive: 0,
          featured: 0,
        };

      // ====================================================
      // SERVICE DATA
      // ====================================================

      const serviceData =
        serviceOverview[0] || {
          total: 0,
          active: 0,
          inactive: 0,
          featured: 0,
        };

      // ====================================================
      // DEBUG
      // ====================================================

      console.log(
        "=========================================="
      );

      console.log(
        "SHASAR SOLAR ANALYTICS"
      );

      console.log(
        "Date Filter:",
        date
      );

      console.log(
        "Reporting Range:",
        startDay,
        "TO",
        endDay
      );

      console.log(
        "Total Inquiries:",
        inquiryDatabaseTotal
      );

      console.log(
        "Unread Inquiries:",
        inquiryDatabaseUnread
      );

      console.log(
        "Status Distribution:",
        statusDistribution
      );

      console.log(
        "Trend:",
        trend
      );

      console.log(
        "Total Projects:",
        projectData.total
      );

      console.log(
        "Total Services:",
        serviceData.total
      );

      console.log(
        "=========================================="
      );

      // ====================================================
      // RESPONSE
      // ====================================================

      return res.status(200).json({
        success: true,

        message:
          "Analytics overview fetched successfully.",

        data: {
          // ==============================================
          // REPORTING
          // ==============================================

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

          // ==============================================
          // INQUIRIES
          // ==============================================

          inquiries: {
            // ALL DATABASE INQUIRIES
            total:
              Number(
                inquiryDatabaseTotal
              ) || 0,

            // ALL DATABASE UNREAD
            unread:
              Number(
                inquiryDatabaseUnread
              ) || 0,

            // SELECTED DATE RANGE
            statusDistribution,

            // SELECTED DATE RANGE
            trend,

            // SELECTED DATE RANGE
            recent:
              recentInquiries,
          },

          // ==============================================
          // PROJECTS
          // ==============================================

          projects: {
            total:
              Number(
                projectData.total
              ) || 0,

            active:
              Number(
                projectData.active
              ) || 0,

            inactive:
              Number(
                projectData.inactive
              ) || 0,

            featured:
              Number(
                projectData.featured
              ) || 0,

            byType:
              projectByType.map(
                (item) => ({
                  type:
                    item._id,

                  count:
                    Number(
                      item.count
                    ) || 0,
                })
              ),

            byYear:
              projectByYear.map(
                (item) => ({
                  year:
                    item._id,

                  count:
                    Number(
                      item.count
                    ) || 0,
                })
              ),
          },

          // ==============================================
          // SERVICES
          // ==============================================

          services: {
            total:
              Number(
                serviceData.total
              ) || 0,

            active:
              Number(
                serviceData.active
              ) || 0,

            inactive:
              Number(
                serviceData.inactive
              ) || 0,

            featured:
              Number(
                serviceData.featured
              ) || 0,

            byCategory:
              serviceByCategory.map(
                (item) => ({
                  category:
                    item._id,

                  count:
                    Number(
                      item.count
                    ) || 0,
                })
              ),
          },
        },
      });
    } catch (error) {
      console.error(
        "Analytics overview error:",
        error
      );

      return res.status(500).json({
        success: false,

        message:
          "Unable to load analytics right now.",
      });
    }
  };