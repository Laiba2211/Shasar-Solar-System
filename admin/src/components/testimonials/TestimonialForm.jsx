
import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  X,
  Star,
  ImagePlus,
  Upload,
  UserRound,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

import "./TestimonialForm.css";

/* ==========================================================
   API BASE URL
========================================================== */

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:5000";

/* ==========================================================
   DEFAULT FORM
========================================================== */

const DEFAULT_FORM = {
  clientName: "",
  email: "",
  designation: "",
  location: "",
  serviceType: "",
  rating: 5,
  comment: "",
  imageUrl: "",
  imageFile: null,
  status: "approved",
  consentToPublish: true,
  isFeatured: false,
  displayOrder: 0,
  adminNote: "",
};

/* ==========================================================
   SERVICE OPTIONS
========================================================== */

const SERVICE_OPTIONS = [
  "Residential Solar Installation",
  "Commercial Solar Installation",
  "Industrial Solar Installation",
  "Solar Battery Storage",
  "Solar Maintenance",
  "Solar Panel Cleaning",
  "Solar Design & Engineering",
  "Energy Audit",
  "EV Charging",
  "Agricultural Solar",
  "Solar Carport",
  "Other",
];

/* ==========================================================
   IMAGE LIMIT
========================================================== */

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
];

/* ==========================================================
   IMAGE URL HELPER
========================================================== */

const getImageUrl = (imageUrl) => {
  if (
    !imageUrl ||
    typeof imageUrl !== "string"
  ) {
    return "";
  }

  const value = imageUrl.trim();

  if (!value) {
    return "";
  }

  /* --------------------------------------------------------
     Ignore local Windows paths
  -------------------------------------------------------- */

  if (
    /^[a-zA-Z]:[\\/]/.test(value) ||
    value.startsWith("\\\\") ||
    value.includes("\\Users\\") ||
    value.includes("\\Downloads\\")
  ) {
    return "";
  }

  /* --------------------------------------------------------
     Already complete URL
  -------------------------------------------------------- */

  if (
    value.startsWith("http://") ||
    value.startsWith("https://") ||
    value.startsWith("data:") ||
    value.startsWith("blob:")
  ) {
    return value;
  }

  /* --------------------------------------------------------
     Normalize backslashes
  -------------------------------------------------------- */

  const normalized =
    value.replace(/\\/g, "/");

  /* --------------------------------------------------------
     /uploads/...
  -------------------------------------------------------- */

  if (
    normalized.startsWith("/uploads")
  ) {
    return `${API_BASE_URL}${normalized}`;
  }

  /* --------------------------------------------------------
     uploads/...
  -------------------------------------------------------- */

  if (
    normalized.startsWith("uploads/")
  ) {
    return `${API_BASE_URL}/${normalized}`;
  }

  /* --------------------------------------------------------
     Other relative server path
  -------------------------------------------------------- */

  if (normalized.startsWith("/")) {
    return `${API_BASE_URL}${normalized}`;
  }

  return `${API_BASE_URL}/${normalized}`;
};

/* ==========================================================
   COMPONENT
========================================================== */

/*
  IMPORTANT FIX:

  Testimonials.jsx sends:

    onClose={handleCloseForm}

  Therefore this component must receive:

    onClose

  NOT:

    onCancel
*/

const TestimonialForm = ({
  testimonial,
  onSave,
  onClose,
}) => {
  /* ========================================================
     STATE
  ======================================================== */

  const [formData, setFormData] =
    useState(DEFAULT_FORM);

  const [errors, setErrors] =
    useState({});

  const [imagePreview, setImagePreview] =
    useState("");

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [imageError, setImageError] =
    useState("");

  const fileInputRef =
    useRef(null);

  const previewObjectUrlRef =
    useRef(null);

  /* ========================================================
     EDIT MODE
  ======================================================== */

  const isEditing =
    Boolean(testimonial?._id);

  /* ========================================================
     LOAD TESTIMONIAL
  ======================================================== */

  useEffect(() => {
    /*
      Clean previous object URL when
      switching between records.
    */

    if (
      previewObjectUrlRef.current
    ) {
      URL.revokeObjectURL(
        previewObjectUrlRef.current
      );

      previewObjectUrlRef.current =
        null;
    }

    if (testimonial) {
      const existingImage =
        typeof testimonial.imageUrl ===
        "string"
          ? testimonial.imageUrl.trim()
          : "";

      /*
        Never use local Windows paths.
      */

      const safeExistingImage =
        getImageUrl(existingImage);

      const storedImagePath =
        existingImage &&
        !/^[a-zA-Z]:[\\/]/.test(
          existingImage
        ) &&
        !existingImage.includes(
          "\\Users\\"
        ) &&
        !existingImage.includes(
          "\\Downloads\\"
        )
          ? existingImage
          : "";

      setFormData({
        clientName:
          testimonial.clientName ||
          "",

        email:
          testimonial.email || "",

        designation:
          testimonial.designation ||
          "",

        location:
          testimonial.location || "",

        serviceType:
          testimonial.serviceType ||
          "",

        rating:
          Number(testimonial.rating) ||
          5,

        comment:
          testimonial.comment || "",

        imageUrl:
          storedImagePath,

        imageFile: null,

        status:
          testimonial.status ||
          "approved",

        consentToPublish:
          testimonial.consentToPublish ??
          true,

        isFeatured:
          testimonial.isFeatured ??
          false,

        displayOrder:
          Number(
            testimonial.displayOrder
          ) || 0,

        adminNote:
          testimonial.adminNote ||
          "",
      });

      setImagePreview(
        safeExistingImage
      );
    } else {
      setFormData({
        ...DEFAULT_FORM,
      });

      setImagePreview("");
    }

    setErrors({});
    setImageError("");
  }, [testimonial]);

  /* ========================================================
     CLEANUP PREVIEW URL
  ======================================================== */

  useEffect(() => {
    return () => {
      if (
        previewObjectUrlRef.current
      ) {
        URL.revokeObjectURL(
          previewObjectUrlRef.current
        );

        previewObjectUrlRef.current =
          null;
      }
    };
  }, []);

  /* ========================================================
     HANDLE NORMAL INPUT
  ======================================================== */

  const handleChange = (event) => {
    const {
      name,
      value,
      type,
      checked,
    } = event.target;

    setFormData((current) => ({
      ...current,

      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));

    if (errors[name]) {
      setErrors((current) => {
        const updated = {
          ...current,
        };

        delete updated[name];

        return updated;
      });
    }
  };

  /* ========================================================
     RATING
  ======================================================== */

  const handleRatingChange = (
    rating
  ) => {
    setFormData((current) => ({
      ...current,
      rating,
    }));

    if (errors.rating) {
      setErrors((current) => {
        const updated = {
          ...current,
        };

        delete updated.rating;

        return updated;
      });
    }
  };

  /* ========================================================
     OPEN FILE PICKER
  ======================================================== */

  const handleOpenFilePicker = () => {
    if (
      fileInputRef.current
    ) {
      fileInputRef.current.click();
    }
  };

  /* ========================================================
     HANDLE IMAGE FILE
  ======================================================== */

  const handleImageChange = (
    event
  ) => {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    setImageError("");

    /* ------------------------------------------------------
       FILE TYPE VALIDATION
    ------------------------------------------------------ */

    if (
      !ALLOWED_IMAGE_TYPES.includes(
        file.type
      )
    ) {
      setImageError(
        "Please select a JPG, JPEG, PNG, WEBP, or GIF image."
      );

      event.target.value = "";

      return;
    }

    /* ------------------------------------------------------
       FILE SIZE VALIDATION
    ------------------------------------------------------ */

    if (
      file.size > MAX_IMAGE_SIZE
    ) {
      setImageError(
        "Image size must not exceed 5 MB."
      );

      event.target.value = "";

      return;
    }

    /* ------------------------------------------------------
       CLEAN OLD OBJECT URL
    ------------------------------------------------------ */

    if (
      previewObjectUrlRef.current
    ) {
      URL.revokeObjectURL(
        previewObjectUrlRef.current
      );
    }

    /* ------------------------------------------------------
       CREATE LOCAL PREVIEW
    ------------------------------------------------------ */

    const previewUrl =
      URL.createObjectURL(file);

    previewObjectUrlRef.current =
      previewUrl;

    setImagePreview(
      previewUrl
    );

    /* ------------------------------------------------------
       SAVE ACTUAL FILE
    ------------------------------------------------------ */

    setFormData((current) => ({
      ...current,

      imageUrl: "",

      imageFile: file,
    }));

    /* ------------------------------------------------------
       REMOVE IMAGE ERROR
    ------------------------------------------------------ */

    setErrors((current) => {
      const updated = {
        ...current,
      };

      delete updated.imageUrl;

      return updated;
    });
  };

  /* ========================================================
     REMOVE IMAGE
  ======================================================== */

  const handleRemoveImage = () => {
    if (
      previewObjectUrlRef.current
    ) {
      URL.revokeObjectURL(
        previewObjectUrlRef.current
      );

      previewObjectUrlRef.current =
        null;
    }

    setImagePreview("");
    setImageError("");

    setFormData((current) => ({
      ...current,

      imageUrl: "",
      imageFile: null,
    }));

    if (
      fileInputRef.current
    ) {
      fileInputRef.current.value =
        "";
    }
  };

  /* ========================================================
     IMAGE ERROR
  ======================================================== */

  const handleImageError = () => {
    setImageError(
      "The current profile image could not be loaded."
    );

    setImagePreview("");
  };

  /* ========================================================
     VALIDATION
  ======================================================== */

  const validateForm = () => {
    const nextErrors = {};

    /* CLIENT NAME */

    if (
      !formData.clientName.trim()
    ) {
      nextErrors.clientName =
        "Client name is required.";
    } else if (
      formData.clientName
        .trim()
        .length < 2
    ) {
      nextErrors.clientName =
        "Client name must be at least 2 characters.";
    }

    /* EMAIL */

    if (
      formData.email.trim()
    ) {
      const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (
        !emailPattern.test(
          formData.email.trim()
        )
      ) {
        nextErrors.email =
          "Please enter a valid email address.";
      }
    }

    /* SERVICE */

    if (
      !formData.serviceType.trim()
    ) {
      nextErrors.serviceType =
        "Please select a service.";
    }

    /* RATING */

    const rating =
      Number(formData.rating);

    if (
      !Number.isFinite(rating) ||
      rating < 1 ||
      rating > 5
    ) {
      nextErrors.rating =
        "Please select a rating between 1 and 5.";
    }

    /* COMMENT */

    if (
      !formData.comment.trim()
    ) {
      nextErrors.comment =
        "Client experience is required.";
    } else if (
      formData.comment
        .trim()
        .length < 10
    ) {
      nextErrors.comment =
        "Experience should contain at least 10 characters.";
    }

    /* IMAGE URL */

    if (formData.imageUrl) {
      const imageValue =
        formData.imageUrl.trim();

      const isLocalWindowsPath =
        /^[a-zA-Z]:[\\/]/.test(
          imageValue
        ) ||
        imageValue.includes(
          "\\Users\\"
        ) ||
        imageValue.includes(
          "\\Downloads\\"
        );

      if (
        isLocalWindowsPath
      ) {
        nextErrors.imageUrl =
          "Local computer paths cannot be used. Please upload the image using Choose Photo.";
      } else if (
        imageValue.length > 500
      ) {
        nextErrors.imageUrl =
          "Image URL cannot exceed 500 characters.";
      }
    }

    setErrors(nextErrors);

    return (
      Object.keys(nextErrors)
        .length === 0
    );
  };

  /* ========================================================
     SUBMIT
  ======================================================== */

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    const isValid =
      validateForm();

    if (!isValid) {
      return;
    }

    try {
      setIsSubmitting(true);

      const hasNewImage =
        formData.imageFile instanceof
        File;

      const cleanedData = {
        ...formData,

        clientName:
          formData.clientName.trim(),

        email:
          formData.email.trim(),

        designation:
          formData.designation.trim(),

        location:
          formData.location.trim(),

        serviceType:
          formData.serviceType.trim(),

        comment:
          formData.comment.trim(),

        imageUrl: hasNewImage
          ? ""
          : formData.imageUrl.trim(),

        rating:
          Number(formData.rating) ||
          5,

        displayOrder:
          Number(
            formData.displayOrder
          ) || 0,

        adminNote:
          formData.adminNote.trim(),

        imageFile:
          hasNewImage
            ? formData.imageFile
            : null,
      };

      console.log(
        "TESTIMONIAL IMAGE DATA:",
        {
          imageFile:
            cleanedData.imageFile,

          imageFileName:
            cleanedData.imageFile?.name ||
            null,

          imageUrl:
            cleanedData.imageUrl,
        }
      );

      await onSave(cleanedData);
    } catch (submitError) {
      console.error(
        "Testimonial form submission error:",
        submitError
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ========================================================
     CLOSE / CANCEL
  ======================================================== */

  const handleCancel = () => {
    /*
      Do not close while a save request
      is currently running.
    */

    if (isSubmitting) {
      return;
    }

    /*
      IMPORTANT FIX:

      Parent Testimonials.jsx provides:

        onClose={handleCloseForm}

      Therefore call onClose().
    */

    if (
      typeof onClose === "function"
    ) {
      onClose();
    }
  };

  /* ========================================================
     INITIALS
  ======================================================== */

  const getInitials = () => {
    return (
      formData.clientName
        ?.split(" ")
        .filter(Boolean)
        .map(
          (word) => word[0]
        )
        .slice(0, 2)
        .join("")
        .toUpperCase() || "CL"
    );
  };

  /* ========================================================
     RENDER
  ======================================================== */

  return (
    <form
      className="testimonial-form"
      onSubmit={handleSubmit}
      noValidate
    >
      {/* ==================================================
          FORM HEADER
      ================================================== */}

      <div className="testimonial-form-header">
        <div>
          <div className="testimonial-form-eyebrow">
            <MessageSquareQuoteIcon />

            <span>
              {isEditing
                ? "Update Client Experience"
                : "New Client Experience"}
            </span>
          </div>

          <h2>
            {isEditing
              ? "Edit Testimonial"
              : "Add Testimonial"}
          </h2>

          <p>
            {isEditing
              ? "Update the client details, experience and profile photo."
              : "Add a client experience that can be published on your website."}
          </p>
        </div>

        {/* ==================================================
            CLOSE BUTTON
        ================================================== */}

        <button
          type="button"
          className="testimonial-form-close"
          onClick={handleCancel}
          disabled={isSubmitting}
          aria-label="Close form"
          title="Close"
        >
          <X size={19} />
        </button>
      </div>

      {/* ==================================================
          FORM BODY
      ================================================== */}

      <div className="testimonial-form-body">

        {/* ==================================================
            CLIENT INFORMATION
        ================================================== */}

        <section className="testimonial-form-section">
          <div className="testimonial-form-section-heading">
            <div>
              <span className="testimonial-form-section-kicker">
                01
              </span>

              <h3>
                Client Information
              </h3>

              <p>
                Basic information about
                the customer.
              </p>
            </div>
          </div>

          <div className="testimonial-form-grid">

            {/* CLIENT NAME */}

            <div className="testimonial-form-field">
              <label htmlFor="clientName">
                Client Name
                <span>*</span>
              </label>

              <div className="testimonial-input-wrap">
                <UserRound size={17} />

                <input
                  id="clientName"
                  name="clientName"
                  type="text"
                  value={
                    formData.clientName
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="e.g. Ahmed Khan"
                  autoComplete="name"
                  className={
                    errors.clientName
                      ? "is-invalid"
                      : ""
                  }
                />
              </div>

              {errors.clientName && (
                <small className="testimonial-field-error">
                  <AlertCircle
                    size={13}
                  />

                  {
                    errors.clientName
                  }
                </small>
              )}
            </div>

            {/* EMAIL */}

            <div className="testimonial-form-field">
              <label htmlFor="email">
                Email Address

                <span className="optional">
                  Optional
                </span>
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={
                  formData.email
                }
                onChange={
                  handleChange
                }
                placeholder="client@example.com"
                autoComplete="email"
                className={
                  errors.email
                    ? "is-invalid"
                    : ""
                }
              />

              {errors.email && (
                <small className="testimonial-field-error">
                  <AlertCircle
                    size={13}
                  />

                  {errors.email}
                </small>
              )}
            </div>

            {/* DESIGNATION */}

            <div className="testimonial-form-field">
              <label htmlFor="designation">
                Designation

                <span className="optional">
                  Optional
                </span>
              </label>

              <input
                id="designation"
                name="designation"
                type="text"
                value={
                  formData.designation
                }
                onChange={
                  handleChange
                }
                placeholder="e.g. Managing Director"
              />
            </div>

            {/* LOCATION */}

            <div className="testimonial-form-field">
              <label htmlFor="location">
                Location

                <span className="optional">
                  Optional
                </span>
              </label>

              <input
                id="location"
                name="location"
                type="text"
                value={
                  formData.location
                }
                onChange={
                  handleChange
                }
                placeholder="e.g. Dubai, UAE"
              />
            </div>

            {/* SERVICE */}

            <div className="testimonial-form-field testimonial-form-field-full">
              <label htmlFor="serviceType">
                Service
                <span>*</span>
              </label>

              <select
                id="serviceType"
                name="serviceType"
                value={
                  formData.serviceType
                }
                onChange={
                  handleChange
                }
                className={
                  errors.serviceType
                    ? "is-invalid"
                    : ""
                }
              >
                <option value="">
                  Select service
                </option>

                {SERVICE_OPTIONS.map(
                  (service) => (
                    <option
                      key={service}
                      value={service}
                    >
                      {service}
                    </option>
                  )
                )}
              </select>

              {errors.serviceType && (
                <small className="testimonial-field-error">
                  <AlertCircle
                    size={13}
                  />

                  {
                    errors.serviceType
                  }
                </small>
              )}
            </div>
          </div>
        </section>

        {/* ==================================================
            PROFILE IMAGE
        ================================================== */}

        <section className="testimonial-form-section">
          <div className="testimonial-form-section-heading">
            <div>
              <span className="testimonial-form-section-kicker">
                02
              </span>

              <h3>
                Client Profile Photo
              </h3>

              <p>
                Upload a client image from
                your computer, laptop or
                mobile device.
              </p>
            </div>
          </div>

          <div className="testimonial-upload-layout">

            {/* IMAGE PREVIEW */}

            <div className="testimonial-image-preview">
              {imagePreview ? (
                <>
                  <img
                    src={imagePreview}
                    alt={
                      formData.clientName ||
                      "Client preview"
                    }
                    onError={
                      handleImageError
                    }
                  />

                  <button
                    type="button"
                    className="testimonial-image-remove"
                    onClick={
                      handleRemoveImage
                    }
                    aria-label="Remove client photo"
                    title="Remove photo"
                  >
                    <X size={16} />
                  </button>

                  <div className="testimonial-image-preview-badge">
                    <CheckCircle2
                      size={13}
                    />

                    <span>
                      Photo selected
                    </span>
                  </div>
                </>
              ) : (
                <div className="testimonial-image-placeholder">
                  {formData.clientName ? (
                    <span className="testimonial-image-initials">
                      {getInitials()}
                    </span>
                  ) : (
                    <ImagePlus
                      size={28}
                    />
                  )}

                  <span>
                    {formData.clientName
                      ? "No photo"
                      : "Photo preview"}
                  </span>
                </div>
              )}
            </div>

            {/* UPLOAD CONTROL */}

            <div className="testimonial-image-upload-content">
              <div className="testimonial-image-upload-title">
                <ImagePlus
                  size={19}
                />

                <div>
                  <strong>
                    Upload client photo
                  </strong>

                  <p>
                    Add a professional
                    profile image for this
                    testimonial.
                  </p>
                </div>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                name="image"
                accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                onChange={
                  handleImageChange
                }
                className="testimonial-file-input"
              />

              <button
                type="button"
                className="testimonial-upload-btn"
                onClick={
                  handleOpenFilePicker
                }
              >
                <Upload size={17} />

                <span>
                  {imagePreview
                    ? "Change Photo"
                    : "Choose Photo"}
                </span>
              </button>

              <div className="testimonial-upload-meta">
                <span>
                  JPG, JPEG, PNG, WEBP or GIF
                </span>

                <span>
                  Maximum 5 MB
                </span>
              </div>

              {imageError && (
                <div className="testimonial-upload-error">
                  <AlertCircle
                    size={15}
                  />

                  <span>
                    {imageError}
                  </span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ==================================================
            EXPERIENCE
        ================================================== */}

        <section className="testimonial-form-section">
          <div className="testimonial-form-section-heading">
            <div>
              <span className="testimonial-form-section-kicker">
                03
              </span>

              <h3>
                Client Experience
              </h3>

              <p>
                The review content displayed
                on the website.
              </p>
            </div>
          </div>

          <div className="testimonial-form-grid">

            {/* RATING */}

            <div className="testimonial-form-field">
              <label>
                Rating
                <span>*</span>
              </label>

              <div className="testimonial-rating-selector">
                {[1, 2, 3, 4, 5].map(
                  (star) => (
                    <button
                      key={star}
                      type="button"
                      className={
                        star <=
                        Number(
                          formData.rating
                        )
                          ? "active"
                          : ""
                      }
                      onClick={() =>
                        handleRatingChange(
                          star
                        )
                      }
                      aria-label={`Give ${star} star${
                        star > 1
                          ? "s"
                          : ""
                      }`}
                    >
                      <Star
                        size={22}
                        fill={
                          star <=
                          Number(
                            formData.rating
                          )
                            ? "currentColor"
                            : "none"
                        }
                      />
                    </button>
                  )
                )}

                <span className="testimonial-rating-value">
                  {formData.rating}/5
                </span>
              </div>

              {errors.rating && (
                <small className="testimonial-field-error">
                  <AlertCircle
                    size={13}
                  />

                  {errors.rating}
                </small>
              )}
            </div>

            {/* COMMENT */}

            <div className="testimonial-form-field testimonial-form-field-full">
              <label htmlFor="comment">
                Client Experience
                <span>*</span>
              </label>

              <textarea
                id="comment"
                name="comment"
                value={
                  formData.comment
                }
                onChange={
                  handleChange
                }
                placeholder="Write the client's experience with Shasar Solar System..."
                rows={6}
                maxLength={2000}
                className={
                  errors.comment
                    ? "is-invalid"
                    : ""
                }
              />

              <div className="testimonial-textarea-footer">
                {errors.comment ? (
                  <small className="testimonial-field-error">
                    <AlertCircle
                      size={13}
                    />

                    {
                      errors.comment
                    }
                  </small>
                ) : (
                  <span>
                    Share an authentic and
                    specific client
                    experience.
                  </span>
                )}

                <span>
                  {
                    formData.comment
                      .length
                  }
                  /2000
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================
            PUBLISHING SETTINGS
        ================================================== */}

        <section className="testimonial-form-section">
          <div className="testimonial-form-section-heading">
            <div>
              <span className="testimonial-form-section-kicker">
                04
              </span>

              <h3>
                Publishing Settings
              </h3>

              <p>
                Control how this testimonial
                is displayed across the
                website.
              </p>
            </div>
          </div>

          <div className="testimonial-settings-grid">

            {/* STATUS */}

            <div className="testimonial-form-field">
              <label htmlFor="status">
                Publication Status
              </label>

              <select
                id="status"
                name="status"
                value={
                  formData.status
                }
                onChange={
                  handleChange
                }
              >
                <option value="approved">
                  Approved — Published
                </option>

                <option value="pending">
                  Pending — Review
                </option>

                <option value="rejected">
                  Rejected — Hidden
                </option>
              </select>
            </div>

            {/* DISPLAY ORDER */}

            <div className="testimonial-form-field">
              <label htmlFor="displayOrder">
                Display Order
              </label>

              <input
                id="displayOrder"
                name="displayOrder"
                type="number"
                min="0"
                value={
                  formData.displayOrder
                }
                onChange={
                  handleChange
                }
                placeholder="0"
              />

              <small className="testimonial-field-hint">
                Lower numbers appear
                first.
              </small>
            </div>

            {/* FEATURED */}

            <label className="testimonial-toggle-card">
              <input
                type="checkbox"
                name="isFeatured"
                checked={
                  formData.isFeatured
                }
                onChange={
                  handleChange
                }
              />

              <span className="testimonial-toggle-switch" />

              <span className="testimonial-toggle-content">
                <strong>
                  Featured testimonial
                </strong>

                <small>
                  Highlight this experience
                  in featured testimonial
                  areas.
                </small>
              </span>
            </label>

            {/* CONSENT */}

            <label className="testimonial-toggle-card">
              <input
                type="checkbox"
                name="consentToPublish"
                checked={
                  formData.consentToPublish
                }
                onChange={
                  handleChange
                }
              />

              <span className="testimonial-toggle-switch" />

              <span className="testimonial-toggle-content">
                <strong>
                  Publish on website
                </strong>

                <small>
                  Allow this testimonial to
                  appear publicly.
                </small>
              </span>
            </label>
          </div>
        </section>

        {/* ==================================================
            ADMIN NOTE
        ================================================== */}

        <section className="testimonial-form-section">
          <div className="testimonial-form-section-heading">
            <div>
              <span className="testimonial-form-section-kicker">
                05
              </span>

              <h3>
                Internal Note
              </h3>

              <p>
                Optional note for
                administrators. This is not
                shown publicly.
              </p>
            </div>
          </div>

          <div className="testimonial-form-field">
            <label htmlFor="adminNote">
              Admin Note

              <span className="optional">
                Optional
              </span>
            </label>

            <textarea
              id="adminNote"
              name="adminNote"
              value={
                formData.adminNote
              }
              onChange={
                handleChange
              }
              placeholder="Add an internal note..."
              rows={3}
              maxLength={1000}
            />

            <div className="testimonial-textarea-footer">
              <span>
                Internal use only.
              </span>

              <span>
                {
                  formData.adminNote
                    .length
                }
                /1000
              </span>
            </div>
          </div>
        </section>
      </div>

      {/* ==================================================
          FORM FOOTER
      ================================================== */}

      <div className="testimonial-form-footer">

        <div className="testimonial-form-footer-info">
          <span className="testimonial-required-dot">
            *
          </span>

          <span>
            Required fields
          </span>
        </div>

        <div className="testimonial-form-actions">

          {/* CANCEL */}

          <button
            type="button"
            className="testimonial-form-cancel-btn"
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            Cancel
          </button>

          {/* SAVE */}

          <button
            type="submit"
            className="testimonial-form-submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="testimonial-form-spinner" />

                <span>
                  {isEditing
                    ? "Updating..."
                    : "Saving..."}
                </span>
              </>
            ) : (
              <>
                <CheckCircle2
                  size={17}
                />

                <span>
                  {isEditing
                    ? "Update Testimonial"
                    : "Save Testimonial"}
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

/* ==========================================================
   SMALL HEADER ICON
========================================================== */

const MessageSquareQuoteIcon = () => {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />

      <path d="M8 10h.01" />

      <path d="M12 10h.01" />

      <path d="M16 10h.01" />
    </svg>
  );
};

export default TestimonialForm;





       
