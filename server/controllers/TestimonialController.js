import Testimonial from "../models/TestimonialModel.js";


/* ==========================================================
   HELPERS
========================================================== */

/**
 * Build a public upload path from an uploaded multer file.
 */
const getUploadedFilePath = (file) => {
  if (!file) {
    return "";
  }

  return `/uploads/testimonials/${file.filename}`;
};


/**
 * Convert different boolean representations into
 * a reliable boolean value.
 */
const normalizeBoolean = (
  value,
  defaultValue = false
) => {
  if (
    value === undefined ||
    value === null ||
    value === ""
  ) {
    return defaultValue;
  }

  if (typeof value === "boolean") {
    return value;
  }

  if (typeof value === "string") {
    const normalized = value
      .trim()
      .toLowerCase();

    if (
      normalized === "true" ||
      normalized === "1" ||
      normalized === "yes" ||
      normalized === "on"
    ) {
      return true;
    }

    if (
      normalized === "false" ||
      normalized === "0" ||
      normalized === "no" ||
      normalized === "off"
    ) {
      return false;
    }
  }

  if (typeof value === "number") {
    return value !== 0;
  }

  return Boolean(value);
};


/**
 * Convert a value to a valid number.
 */
const normalizeNumber = (
  value,
  defaultValue = 0
) => {
  if (
    value === undefined ||
    value === null ||
    value === ""
  ) {
    return defaultValue;
  }

  const parsed = Number(value);

  return Number.isFinite(parsed)
    ? parsed
    : defaultValue;
};


/**
 * Normalize optional string values.
 */
const normalizeString = (
  value,
  defaultValue = ""
) => {
  if (
    value === undefined ||
    value === null
  ) {
    return defaultValue;
  }

  return String(value).trim();
};


/* ==========================================================
   BUILD TESTIMONIAL DATA
========================================================== */

const buildTestimonialData = (
  body = {},
  uploadedFile = null,
  existingTestimonial = null
) => {
  const data = {};


  /* --------------------------------------------------------
     CLIENT INFORMATION
  -------------------------------------------------------- */

  if (
    body.clientName !== undefined ||
    !existingTestimonial
  ) {
    data.clientName = normalizeString(
      body.clientName
    );
  }

  if (
    body.email !== undefined ||
    !existingTestimonial
  ) {
    data.email = normalizeString(
      body.email
    ).toLowerCase();
  }

  if (
    body.designation !== undefined ||
    !existingTestimonial
  ) {
    data.designation = normalizeString(
      body.designation
    );
  }

  if (
    body.location !== undefined ||
    !existingTestimonial
  ) {
    data.location = normalizeString(
      body.location
    );
  }


  /* --------------------------------------------------------
     SERVICE
  -------------------------------------------------------- */

  if (
    body.serviceType !== undefined ||
    !existingTestimonial
  ) {
    data.serviceType = normalizeString(
      body.serviceType
    );
  }


  /* --------------------------------------------------------
     RATING
  -------------------------------------------------------- */

  if (
    body.rating !== undefined ||
    !existingTestimonial
  ) {
    data.rating = normalizeNumber(
      body.rating,
      existingTestimonial?.rating ?? 5
    );
  }


  /* --------------------------------------------------------
     COMMENT
  -------------------------------------------------------- */

  if (
    body.comment !== undefined ||
    !existingTestimonial
  ) {
    data.comment = normalizeString(
      body.comment
    );
  }


  /* --------------------------------------------------------
     IMAGE
  -------------------------------------------------------- */

  if (uploadedFile) {
    data.imageUrl = getUploadedFilePath(
      uploadedFile
    );
  } else if (
    body.imageUrl !== undefined
  ) {
    data.imageUrl = normalizeString(
      body.imageUrl
    );
  }


  /* --------------------------------------------------------
     STATUS
  -------------------------------------------------------- */

  if (
    body.status !== undefined ||
    !existingTestimonial
  ) {
    const allowedStatuses = [
      "pending",
      "approved",
      "rejected",
    ];

    const status = normalizeString(
      body.status,
      existingTestimonial?.status || "pending"
    ).toLowerCase();

    data.status = allowedStatuses.includes(
      status
    )
      ? status
      : existingTestimonial?.status ||
        "pending";
  }


  /* --------------------------------------------------------
     CONSENT
  -------------------------------------------------------- */

  if (
    body.consentToPublish !== undefined ||
    !existingTestimonial
  ) {
    data.consentToPublish =
      normalizeBoolean(
        body.consentToPublish,
        existingTestimonial?.consentToPublish ??
          false
      );
  }


  /* --------------------------------------------------------
     FEATURED
  -------------------------------------------------------- */

  if (
    body.isFeatured !== undefined ||
    !existingTestimonial
  ) {
    data.isFeatured =
      normalizeBoolean(
        body.isFeatured,
        existingTestimonial?.isFeatured ??
          false
      );
  }


  /* --------------------------------------------------------
     DISPLAY ORDER
  -------------------------------------------------------- */

  if (
    body.displayOrder !== undefined ||
    !existingTestimonial
  ) {
    data.displayOrder =
      normalizeNumber(
        body.displayOrder,
        existingTestimonial?.displayOrder ??
          0
      );
  }


  /* --------------------------------------------------------
     ADMIN NOTE
  -------------------------------------------------------- */

  if (
    body.adminNote !== undefined ||
    !existingTestimonial
  ) {
    data.adminNote = normalizeString(
      body.adminNote
    );
  }


  return data;
};


/* ==========================================================
   VALIDATION
========================================================== */

const validateTestimonialData = (
  data
) => {
  const errors = [];


  /* --------------------------------------------------------
     CLIENT NAME
  -------------------------------------------------------- */

  if (!data.clientName) {
    errors.push(
      "Client name is required."
    );
  } else if (
    data.clientName.length < 2
  ) {
    errors.push(
      "Client name must contain at least 2 characters."
    );
  } else if (
    data.clientName.length > 100
  ) {
    errors.push(
      "Client name cannot exceed 100 characters."
    );
  }


  /* --------------------------------------------------------
     EMAIL
  -------------------------------------------------------- */

  if (data.email) {
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(data.email)) {
      errors.push(
        "Please provide a valid email address."
      );
    }

    if (data.email.length > 150) {
      errors.push(
        "Email cannot exceed 150 characters."
      );
    }
  }


  /* --------------------------------------------------------
     DESIGNATION
  -------------------------------------------------------- */

  if (
    data.designation &&
    data.designation.length > 100
  ) {
    errors.push(
      "Designation cannot exceed 100 characters."
    );
  }


  /* --------------------------------------------------------
     LOCATION
  -------------------------------------------------------- */

  if (
    data.location &&
    data.location.length > 120
  ) {
    errors.push(
      "Location cannot exceed 120 characters."
    );
  }


  /* --------------------------------------------------------
     SERVICE
  -------------------------------------------------------- */

  if (
    data.serviceType &&
    data.serviceType.length > 150
  ) {
    errors.push(
      "Service type cannot exceed 150 characters."
    );
  }


  /* --------------------------------------------------------
     RATING
  -------------------------------------------------------- */

  if (
    data.rating === undefined ||
    data.rating === null ||
    Number.isNaN(Number(data.rating))
  ) {
    errors.push(
      "Rating is required."
    );
  } else if (
    Number(data.rating) < 1 ||
    Number(data.rating) > 5
  ) {
    errors.push(
      "Rating must be between 1 and 5."
    );
  }


  /* --------------------------------------------------------
     COMMENT
  -------------------------------------------------------- */

  if (!data.comment) {
    errors.push(
      "Comment is required."
    );
  } else if (
    data.comment.length < 10
  ) {
    errors.push(
      "Comment must contain at least 10 characters."
    );
  } else if (
    data.comment.length > 1500
  ) {
    errors.push(
      "Comment cannot exceed 1500 characters."
    );
  }


  /* --------------------------------------------------------
     IMAGE URL
  -------------------------------------------------------- */

  if (
    data.imageUrl &&
    data.imageUrl.length > 500
  ) {
    errors.push(
      "Image URL cannot exceed 500 characters."
    );
  }


  /* --------------------------------------------------------
     DISPLAY ORDER
  -------------------------------------------------------- */

  if (
    data.displayOrder !== undefined &&
    Number(data.displayOrder) < 0
  ) {
    errors.push(
      "Display order cannot be negative."
    );
  }


  /* --------------------------------------------------------
     ADMIN NOTE
  -------------------------------------------------------- */

  if (
    data.adminNote &&
    data.adminNote.length > 1000
  ) {
    errors.push(
      "Admin note cannot exceed 1000 characters."
    );
  }


  return errors;
};


/* ==========================================================
   GET ALL TESTIMONIALS
========================================================== */

export const getTestimonials = async (
  req,
  res
) => {
  try {
    const {
      status,
      serviceType,
      search,
      featured,
    } = req.query;

    const filter = {};


    /* --------------------------------------------------------
       STATUS FILTER
    -------------------------------------------------------- */

    if (status) {
      const allowedStatuses = [
        "pending",
        "approved",
        "rejected",
      ];

      if (
        allowedStatuses.includes(
          String(status).toLowerCase()
        )
      ) {
        filter.status =
          String(status).toLowerCase();
      }
    }


    /* --------------------------------------------------------
       SERVICE FILTER
    -------------------------------------------------------- */

    if (serviceType) {
      filter.serviceType = serviceType;
    }


    /* --------------------------------------------------------
       FEATURED FILTER
    -------------------------------------------------------- */

    if (
      featured !== undefined
    ) {
      filter.isFeatured =
        normalizeBoolean(featured);
    }


    /* --------------------------------------------------------
       SEARCH
    -------------------------------------------------------- */

    if (search) {
      const searchTerm =
        String(search).trim();

      if (searchTerm) {
        filter.$or = [
          {
            clientName: {
              $regex: searchTerm,
              $options: "i",
            },
          },
          {
            email: {
              $regex: searchTerm,
              $options: "i",
            },
          },
          {
            designation: {
              $regex: searchTerm,
              $options: "i",
            },
          },
          {
            location: {
              $regex: searchTerm,
              $options: "i",
            },
          },
          {
            serviceType: {
              $regex: searchTerm,
              $options: "i",
            },
          },
          {
            comment: {
              $regex: searchTerm,
              $options: "i",
            },
          },
        ];
      }
    }


    /* --------------------------------------------------------
       QUERY
    -------------------------------------------------------- */

    const testimonials =
      await Testimonial.find(filter)
        .sort({
          isFeatured: -1,
          displayOrder: 1,
          createdAt: -1,
        })
        .lean();


    return res.status(200).json({
      success: true,
      count: testimonials.length,
      data: testimonials,
    });
  } catch (error) {
    console.error(
      "Get testimonials error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch testimonials.",
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : undefined,
    });
  }
};


/* ==========================================================
   GET PUBLIC TESTIMONIALS
========================================================== */

export const getPublicTestimonials =
  async (req, res) => {
    try {
      const testimonials =
        await Testimonial.find({
          status: "approved",
          consentToPublish: true,
        })
          .sort({
            isFeatured: -1,
            displayOrder: 1,
            createdAt: -1,
          })
          .lean();


      return res.status(200).json({
        success: true,
        count: testimonials.length,
        data: testimonials,
      });
    } catch (error) {
      console.error(
        "Get public testimonials error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to fetch public testimonials.",
      });
    }
  };


/* ==========================================================
   GET SINGLE TESTIMONIAL
========================================================== */

export const getTestimonialById =
  async (req, res) => {
    try {
      const {
        id,
      } = req.params;

      const testimonial =
        await Testimonial.findById(id);

      if (!testimonial) {
        return res.status(404).json({
          success: false,
          message:
            "Testimonial not found.",
        });
      }

      return res.status(200).json({
        success: true,
        data: testimonial,
      });
    } catch (error) {
      console.error(
        "Get testimonial by ID error:",
        error
      );

      if (
        error.name ===
        "CastError"
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid testimonial ID.",
        });
      }

      return res.status(500).json({
        success: false,
        message:
          "Failed to fetch testimonial.",
      });
    }
  };


/* ==========================================================
   CREATE TESTIMONIAL
========================================================== */

export const createTestimonial =
  async (req, res) => {
    try {
      const data =
        buildTestimonialData(
          req.body,
          req.file
        );


      /* ------------------------------------------------------
         VALIDATION
      ------------------------------------------------------ */

      const errors =
        validateTestimonialData(
          data
        );

      if (errors.length > 0) {
        return res.status(400).json({
          success: false,
          message:
            errors[0],
          errors,
        });
      }


      /* ------------------------------------------------------
         IMMEDIATE PUBLICATION
         
         Every newly submitted testimonial is
         immediately visible on the public website.
         
         We intentionally override incoming
         status/consent values here so the
         client-side form cannot accidentally
         create a hidden "pending" testimonial.
      ------------------------------------------------------ */

      data.status = "approved";
      data.consentToPublish = true;


      /* ------------------------------------------------------
         CREATE
      ------------------------------------------------------ */

      const testimonial =
        await Testimonial.create(
          data
        );


      return res.status(201).json({
        success: true,
        message:
          "Testimonial published successfully.",
        data: testimonial,
      });
    } catch (error) {
      console.error(
        "Create testimonial error:",
        error
      );


      /* ------------------------------------------------------
         MONGOOSE VALIDATION ERROR
      ------------------------------------------------------ */

      if (
        error.name ===
        "ValidationError"
      ) {
        const errors =
          Object.values(
            error.errors
          ).map(
            (item) => item.message
          );

        return res.status(400).json({
          success: false,
          message:
            errors[0] ||
            "Validation failed.",
          errors,
        });
      }


      return res.status(500).json({
        success: false,
        message:
          "Failed to create testimonial.",
      });
    }
  };


/* ==========================================================
   UPDATE TESTIMONIAL
========================================================== */

export const updateTestimonial =
  async (req, res) => {
    try {
      const {
        id,
      } = req.params;

      const testimonial =
        await Testimonial.findById(id);

      if (!testimonial) {
        return res.status(404).json({
          success: false,
          message:
            "Testimonial not found.",
        });
      }


      /* ------------------------------------------------------
         BUILD UPDATED DATA
      ------------------------------------------------------ */

      const data =
        buildTestimonialData(
          req.body,
          req.file,
          testimonial
        );


      /* ------------------------------------------------------
         VALIDATION
      ------------------------------------------------------ */

      const mergedData = {
        clientName:
          data.clientName ??
          testimonial.clientName,

        email:
          data.email ??
          testimonial.email,

        designation:
          data.designation ??
          testimonial.designation,

        location:
          data.location ??
          testimonial.location,

        serviceType:
          data.serviceType ??
          testimonial.serviceType,

        rating:
          data.rating ??
          testimonial.rating,

        comment:
          data.comment ??
          testimonial.comment,

        imageUrl:
          data.imageUrl ??
          testimonial.imageUrl,

        status:
          data.status ??
          testimonial.status,

        consentToPublish:
          data.consentToPublish ??
          testimonial.consentToPublish,

        isFeatured:
          data.isFeatured ??
          testimonial.isFeatured,

        displayOrder:
          data.displayOrder ??
          testimonial.displayOrder,

        adminNote:
          data.adminNote ??
          testimonial.adminNote,
      };


      const errors =
        validateTestimonialData(
          mergedData
        );

      if (errors.length > 0) {
        return res.status(400).json({
          success: false,
          message:
            errors[0],
          errors,
        });
      }


      /* ------------------------------------------------------
         APPLY UPDATE
      ------------------------------------------------------ */

      Object.assign(
        testimonial,
        data
      );


      /* ------------------------------------------------------
         REJECTED TESTIMONIALS
         CANNOT REMAIN FEATURED
      ------------------------------------------------------ */

      if (
        testimonial.status ===
        "rejected"
      ) {
        testimonial.isFeatured =
          false;
      }


      await testimonial.save();


      return res.status(200).json({
        success: true,
        message:
          "Testimonial updated successfully.",
        data: testimonial,
      });
    } catch (error) {
      console.error(
        "Update testimonial error:",
        error
      );


      if (
        error.name ===
        "CastError"
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid testimonial ID.",
        });
      }


      if (
        error.name ===
        "ValidationError"
      ) {
        const errors =
          Object.values(
            error.errors
          ).map(
            (item) => item.message
          );

        return res.status(400).json({
          success: false,
          message:
            errors[0] ||
            "Validation failed.",
          errors,
        });
      }


      return res.status(500).json({
        success: false,
        message:
          "Failed to update testimonial.",
      });
    }
  };


/* ==========================================================
   APPROVE TESTIMONIAL
========================================================== */

export const approveTestimonial =
  async (req, res) => {
    try {
      const {
        id,
      } = req.params;

      const testimonial =
        await Testimonial.findById(id);

      if (!testimonial) {
        return res.status(404).json({
          success: false,
          message:
            "Testimonial not found.",
        });
      }


      testimonial.status =
        "approved";

      /*
       * Approval means the testimonial
       * is allowed to appear publicly.
       *
       * If no explicit consent value is
       * supplied, enable publishing.
       */
      if (
        req.body &&
        req.body.consentToPublish !==
          undefined
      ) {
        testimonial.consentToPublish =
          normalizeBoolean(
            req.body
              .consentToPublish
          );
      } else {
        testimonial.consentToPublish =
          true;
      }


      await testimonial.save();


      return res.status(200).json({
        success: true,
        message:
          "Testimonial approved and published successfully.",
        data: testimonial,
      });
    } catch (error) {
      console.error(
        "Approve testimonial error:",
        error
      );


      if (
        error.name ===
        "CastError"
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid testimonial ID.",
        });
      }


      return res.status(500).json({
        success: false,
        message:
          "Failed to approve testimonial.",
      });
    }
  };


/* ==========================================================
   REJECT TESTIMONIAL
========================================================== */

export const rejectTestimonial =
  async (req, res) => {
    try {
      const {
        id,
      } = req.params;

      const testimonial =
        await Testimonial.findById(id);

      if (!testimonial) {
        return res.status(404).json({
          success: false,
          message:
            "Testimonial not found.",
        });
      }


      testimonial.status =
        "rejected";

      testimonial.isFeatured =
        false;


      await testimonial.save();


      return res.status(200).json({
        success: true,
        message:
          "Testimonial rejected successfully.",
        data: testimonial,
      });
    } catch (error) {
      console.error(
        "Reject testimonial error:",
        error
      );


      if (
        error.name ===
        "CastError"
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid testimonial ID.",
        });
      }


      return res.status(500).json({
        success: false,
        message:
          "Failed to reject testimonial.",
      });
    }
  };


/* ==========================================================
   TOGGLE FEATURED
========================================================== */

export const toggleFeatured =
  async (req, res) => {
    try {
      const {
        id,
      } = req.params;

      const testimonial =
        await Testimonial.findById(id);

      if (!testimonial) {
        return res.status(404).json({
          success: false,
          message:
            "Testimonial not found.",
        });
      }


      /*
       * Rejected testimonials cannot
       * become featured.
       */

      if (
        testimonial.status ===
        "rejected"
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Rejected testimonials cannot be featured.",
        });
      }


      testimonial.isFeatured =
        !testimonial.isFeatured;


      await testimonial.save();


      return res.status(200).json({
        success: true,
        message:
          testimonial.isFeatured
            ? "Testimonial marked as featured."
            : "Testimonial removed from featured.",
        data: testimonial,
      });
    } catch (error) {
      console.error(
        "Toggle featured testimonial error:",
        error
      );


      if (
        error.name ===
        "CastError"
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid testimonial ID.",
        });
      }


      return res.status(500).json({
        success: false,
        message:
          "Failed to update featured status.",
      });
    }
  };


/* ==========================================================
   DELETE TESTIMONIAL
========================================================== */

export const deleteTestimonial =
  async (req, res) => {
    try {
      const {
        id,
      } = req.params;

      const testimonial =
        await Testimonial.findById(id);

      if (!testimonial) {
        return res.status(404).json({
          success: false,
          message:
            "Testimonial not found.",
        });
      }


      await Testimonial.findByIdAndDelete(
        id
      );


      return res.status(200).json({
        success: true,
        message:
          "Testimonial deleted successfully.",
      });
    } catch (error) {
      console.error(
        "Delete testimonial error:",
        error
      );


      if (
        error.name ===
        "CastError"
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid testimonial ID.",
        });
      }


      return res.status(500).json({
        success: false,
        message:
          "Failed to delete testimonial.",
      });
    }
  };


/* ==========================================================
   GET TESTIMONIAL STATISTICS
========================================================== */

export const getTestimonialStats =
  async (req, res) => {
    try {
      const [
        total,
        pending,
        approved,
        rejected,
        featured,
        published,
      ] = await Promise.all([
        Testimonial.countDocuments(),

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

        Testimonial.countDocuments({
          status: "approved",
          consentToPublish: true,
        }),
      ]);


      return res.status(200).json({
        success: true,

        data: {
          total,
          pending,
          approved,
          rejected,
          featured,
          published,
        },
      });
    } catch (error) {
      console.error(
        "Get testimonial stats error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to fetch testimonial statistics.",
      });
    }
  };