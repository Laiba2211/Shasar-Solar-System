/* ==========================================================
   SHASAR SOLAR SYSTEM
   TESTIMONIAL MODEL
   MONGOOSE + ES MODULES
========================================================== */

import mongoose from "mongoose";


/* ==========================================================
   TESTIMONIAL SCHEMA
========================================================== */

const testimonialSchema =
  new mongoose.Schema(
    {
      /* ======================================================
         CLIENT INFORMATION
      ====================================================== */

      clientName: {
        type: String,
        required: [
          true,
          "Client name is required.",
        ],
        trim: true,
        minlength: [
          2,
          "Client name must contain at least 2 characters.",
        ],
        maxlength: [
          100,
          "Client name cannot exceed 100 characters.",
        ],
      },

      email: {
        type: String,
        trim: true,
        lowercase: true,
        maxlength: [
          150,
          "Email cannot exceed 150 characters.",
        ],
        default: "",
        validate: {
          validator: function (value) {
            if (!value) {
              return true;
            }

            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
              value
            );
          },

          message:
            "Please provide a valid email address.",
        },
      },

      designation: {
        type: String,
        trim: true,
        maxlength: [
          100,
          "Designation cannot exceed 100 characters.",
        ],
        default: "",
      },

      location: {
        type: String,
        trim: true,
        maxlength: [
          120,
          "Location cannot exceed 120 characters.",
        ],
        default: "",
      },


      /* ======================================================
         SERVICE
      ====================================================== */

      serviceType: {
        type: String,
        trim: true,
        maxlength: [
          150,
          "Service type cannot exceed 150 characters.",
        ],
        default: "",
        index: true,
      },


      /* ======================================================
         RATING
      ====================================================== */

      rating: {
        type: Number,
        required: [
          true,
          "Rating is required.",
        ],
        min: [
          1,
          "Rating must be at least 1.",
        ],
        max: [
          5,
          "Rating cannot exceed 5.",
        ],
        default: 5,
      },


      /* ======================================================
         CLIENT COMMENT
      ====================================================== */

      comment: {
        type: String,
        required: [
          true,
          "Comment is required.",
        ],
        trim: true,
        minlength: [
          10,
          "Comment must contain at least 10 characters.",
        ],
        maxlength: [
          1500,
          "Comment cannot exceed 1500 characters.",
        ],
      },


      /* ======================================================
         CLIENT IMAGE
      ====================================================== */

      imageUrl: {
        type: String,
        trim: true,
        maxlength: [
          500,
          "Image URL cannot exceed 500 characters.",
        ],
        default: "",
      },


      /* ======================================================
         MODERATION STATUS
      ====================================================== */

      status: {
        type: String,
        enum: {
          values: [
            "pending",
            "approved",
            "rejected",
          ],

          message:
            "Status must be pending, approved, or rejected.",
        },

        default: "pending",
        index: true,
      },


      /* ======================================================
         PUBLISHING CONSENT
      ====================================================== */

      consentToPublish: {
        type: Boolean,
        default: false,
        index: true,
      },


      /* ======================================================
         FEATURED
      ====================================================== */

      isFeatured: {
        type: Boolean,
        default: false,
        index: true,
      },


      /* ======================================================
         DISPLAY ORDER
      ====================================================== */

      displayOrder: {
        type: Number,
        default: 0,
        min: [
          0,
          "Display order cannot be negative.",
        ],
      },


      /* ======================================================
         ADMIN NOTE
      ====================================================== */

      adminNote: {
        type: String,
        trim: true,
        maxlength: [
          1000,
          "Admin note cannot exceed 1000 characters.",
        ],
        default: "",
      },
    },

    {
      timestamps: true,

      versionKey: false,
    }
  );


/* ==========================================================
   INDEXES
========================================================== */

/*
 * Admin listing:
 * newest testimonials grouped by status.
 */

testimonialSchema.index({
  status: 1,
  createdAt: -1,
});


/*
 * Public testimonial listing:
 *
 * approved
 * consentToPublish
 * featured
 * displayOrder
 */

testimonialSchema.index({
  status: 1,
  consentToPublish: 1,
  isFeatured: -1,
  displayOrder: 1,
  createdAt: -1,
});


/*
 * Service filtering.
 */

testimonialSchema.index({
  serviceType: 1,
});


/*
 * Display ordering.
 */

testimonialSchema.index({
  displayOrder: 1,
  createdAt: -1,
});


/* ==========================================================
   PUBLIC QUERY HELPER
========================================================== */

/**
 * Returns only testimonials that are approved
 * and have publishing consent.
 */

testimonialSchema.query.public =
  function () {
    return this.find({
      status: "approved",
      consentToPublish: true,
    });
  };


/* ==========================================================
   STATIC: GET PUBLISHED TESTIMONIALS
========================================================== */

testimonialSchema.statics.getPublished =
  function () {
    return this.find({
      status: "approved",
      consentToPublish: true,
    }).sort({
      isFeatured: -1,
      displayOrder: 1,
      createdAt: -1,
    });
  };


/* ==========================================================
   STATIC: GET STATISTICS
========================================================== */

testimonialSchema.statics.getStats =
  async function () {
    const [
      total,
      pending,
      approved,
      rejected,
      featured,
      published,
    ] = await Promise.all([
      this.countDocuments(),

      this.countDocuments({
        status: "pending",
      }),

      this.countDocuments({
        status: "approved",
      }),

      this.countDocuments({
        status: "rejected",
      }),

      this.countDocuments({
        isFeatured: true,
      }),

      this.countDocuments({
        status: "approved",
        consentToPublish: true,
      }),
    ]);

    return {
      total,
      pending,
      approved,
      rejected,
      featured,
      published,
    };
  };


/* ==========================================================
   PRE-SAVE
========================================================== */

testimonialSchema.pre(
  "save",
  function (next) {
    /* --------------------------------------------------------
       NORMALIZE RATING
    -------------------------------------------------------- */

    if (
      this.rating !== undefined &&
      this.rating !== null
    ) {
      this.rating = Math.min(
        5,
        Math.max(
          1,
          Math.round(
            Number(this.rating) * 10
          ) / 10
        )
      );
    }


    /* --------------------------------------------------------
       REJECTED TESTIMONIALS CANNOT BE FEATURED
    -------------------------------------------------------- */

    if (
      this.status === "rejected"
    ) {
      this.isFeatured = false;
    }


    next();
  }
);


/* ==========================================================
   JSON TRANSFORM
========================================================== */

testimonialSchema.set(
  "toJSON",
  {
    transform: (doc, ret) => {
      /*
       * versionKey is already disabled,
       * but this keeps the output clean
       * if schema settings change later.
       */

      delete ret.__v;

      return ret;
    },
  }
);


/* ==========================================================
   MODEL
========================================================== */

/*
 * Prevent OverwriteModelError when Vite,
 * nodemon, or hot reload loads the model
 * more than once.
 */

const Testimonial =
  mongoose.models.Testimonial ||
  mongoose.model(
    "Testimonial",
    testimonialSchema
  );


/* ==========================================================
   EXPORT
========================================================== */

export default Testimonial;