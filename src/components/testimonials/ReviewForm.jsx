import { useEffect, useState } from "react";
import {
  Star,
  Upload,
  X,
  CheckCircle2,
  AlertCircle,
  Send,
} from "lucide-react";

import "./ReviewForm.css";

/* ==========================================================
   API CONFIGURATION
========================================================== */

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:5000";

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
   INITIAL FORM
========================================================== */

const INITIAL_FORM = {
  clientName: "",
  email: "",
  designation: "",
  location: "",
  serviceType: "",
  rating: 0,
  comment: "",
  consentToPublish: false,
};

/* ==========================================================
   REVIEW FORM
========================================================== */

const ReviewForm = ({
  onSuccess,
  onClose,
  embedded = false,
}) => {
  const [formData, setFormData] = useState(INITIAL_FORM);

  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const [errors, setErrors] = useState({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [submitMessage, setSubmitMessage] = useState("");
  const [submitError, setSubmitError] = useState("");

  /* ========================================================
     CLEANUP IMAGE PREVIEW
  ======================================================== */

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  /* ========================================================
     HANDLE INPUT
  ======================================================== */

  const handleChange = (event) => {
    const {
      name,
      value,
      type,
      checked,
    } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));

    setSubmitError("");
  };

  /* ========================================================
     HANDLE RATING
  ======================================================== */

  const handleRating = (rating) => {
    setFormData((previous) => ({
      ...previous,
      rating,
    }));

    setErrors((previous) => ({
      ...previous,
      rating: "",
    }));

    setSubmitError("");
  };

  /* ========================================================
     IMAGE VALIDATION
  ======================================================== */

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setSubmitError("");

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      setErrors((previous) => ({
        ...previous,
        image:
          "Please upload a JPG, JPEG, PNG or WEBP image.",
      }));

      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrors((previous) => ({
        ...previous,
        image:
          "Image size must be less than 5MB.",
      }));

      event.target.value = "";
      return;
    }

    setErrors((previous) => ({
      ...previous,
      image: "",
    }));

    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    setSelectedImage(file);

    const previewUrl = URL.createObjectURL(file);

    setImagePreview(previewUrl);
  };

  /* ========================================================
     REMOVE IMAGE
  ======================================================== */

  const removeImage = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    setSelectedImage(null);
    setImagePreview("");

    const input =
      document.getElementById(
        "testimonial-image"
      );

    if (input) {
      input.value = "";
    }

    setErrors((previous) => ({
      ...previous,
      image: "",
    }));
  };

  /* ========================================================
     VALIDATE FORM
  ======================================================== */

  const validateForm = () => {
    const newErrors = {};

    const name =
      formData.clientName.trim();

    const email =
      formData.email.trim();

    const location =
      formData.location.trim();

    const comment =
      formData.comment.trim();

    /* ------------------------------------------------------
       NAME
    ------------------------------------------------------ */

    if (!name) {
      newErrors.clientName =
        "Please enter your name.";
    } else if (name.length < 2) {
      newErrors.clientName =
        "Name must contain at least 2 characters.";
    } else if (name.length > 100) {
      newErrors.clientName =
        "Name cannot exceed 100 characters.";
    }

    /* ------------------------------------------------------
       EMAIL
    ------------------------------------------------------ */

    if (!email) {
      newErrors.email =
        "Please enter your email address.";
    } else {
      const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailPattern.test(email)) {
        newErrors.email =
          "Please enter a valid email address.";
      }
    }

    /* ------------------------------------------------------
       LOCATION
    ------------------------------------------------------ */

    if (!location) {
      newErrors.location =
        "Please enter your location.";
    } else if (location.length > 150) {
      newErrors.location =
        "Location cannot exceed 150 characters.";
    }

    /* ------------------------------------------------------
       SERVICE
    ------------------------------------------------------ */

    if (!formData.serviceType) {
      newErrors.serviceType =
        "Please select the service you received.";
    }

    /* ------------------------------------------------------
       RATING
    ------------------------------------------------------ */

    if (
      !formData.rating ||
      formData.rating < 1 ||
      formData.rating > 5
    ) {
      newErrors.rating =
        "Please select a rating from 1 to 5 stars.";
    }

    /* ------------------------------------------------------
       COMMENT
    ------------------------------------------------------ */

    if (!comment) {
      newErrors.comment =
        "Please share your experience.";
    } else if (comment.length < 10) {
      newErrors.comment =
        "Your review should contain at least 10 characters.";
    } else if (comment.length > 1000) {
      newErrors.comment =
        "Your review cannot exceed 1000 characters.";
    }

    /* ------------------------------------------------------
       CONSENT
    ------------------------------------------------------ */

    if (!formData.consentToPublish) {
      newErrors.consentToPublish =
        "Please provide consent before submitting your review.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /* ========================================================
     RESET FORM
  ======================================================== */

  const resetForm = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    setFormData(INITIAL_FORM);

    setSelectedImage(null);
    setImagePreview("");

    setErrors({});

    const input =
      document.getElementById(
        "testimonial-image"
      );

    if (input) {
      input.value = "";
    }
  };

  /* ========================================================
     SUBMIT REVIEW
  ======================================================== */

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSubmitMessage("");
    setSubmitError("");

    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    try {
      setIsSubmitting(true);

      /* ====================================================
         FORM DATA
      ==================================================== */

      const payload = new FormData();

      payload.append(
        "clientName",
        formData.clientName.trim()
      );

      payload.append(
        "email",
        formData.email.trim()
      );

      payload.append(
        "designation",
        formData.designation.trim()
      );

      payload.append(
        "location",
        formData.location.trim()
      );

      payload.append(
        "serviceType",
        formData.serviceType
      );

      payload.append(
        "rating",
        String(formData.rating)
      );

      payload.append(
        "comment",
        formData.comment.trim()
      );

      payload.append(
        "consentToPublish",
        String(formData.consentToPublish)
      );

      /* ====================================================
         OPTIONAL IMAGE
      ==================================================== */

      if (selectedImage) {
        payload.append(
          "image",
          selectedImage
        );
      }

      /* ====================================================
         API REQUEST
      ==================================================== */

      const response = await fetch(
        `${API_BASE_URL}/api/testimonials`,
        {
          method: "POST",
          body: payload,
        }
      );

      /* ====================================================
         RESPONSE
      ==================================================== */

      let result = null;

      const contentType =
        response.headers.get("content-type") || "";

      if (contentType.includes("application/json")) {
        result = await response.json();
      } else {
        const text = await response.text();

        result = {
          message: text,
        };
      }

      /* ====================================================
         API ERROR
      ==================================================== */

      if (!response.ok) {
        throw new Error(
          result?.message ||
            "Unable to submit your review."
        );
      }

      /* ====================================================
         SUCCESS MESSAGE
      ==================================================== */

      setSubmitMessage(
        "Thank you for sharing your experience! Your review is now live on our Client Experiences section."
      );

      /* ====================================================
         RESET FORM
      ==================================================== */

      resetForm();

      /* ====================================================
         NOTIFY PARENT
         
         Testimonials component can immediately
         refresh the public reviews.
      ==================================================== */

      if (typeof onSuccess === "function") {
        onSuccess(result);
      }
    } catch (error) {
      console.error(
        "REVIEW SUBMISSION ERROR:",
        error
      );

      /* ====================================================
         FRIENDLY NETWORK ERROR
      ==================================================== */

      if (
        error instanceof TypeError &&
        error.message === "Failed to fetch"
      ) {
        setSubmitError(
          "Unable to connect to the review server. Please make sure the Shasar Solar server is running and try again."
        );
      } else {
        setSubmitError(
          error.message ||
            "Something went wrong while submitting your review. Please try again."
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ========================================================
     RENDER
  ======================================================== */

  return (
    <div
      className={`review-form-wrapper ${
        embedded
          ? "review-form-embedded"
          : ""
      }`}
    >
      {/* ====================================================
          HEADER
      ==================================================== */}

      <div className="review-form-header">
        <div>
          <span className="review-form-eyebrow">
            CLIENT EXPERIENCE
          </span>

          <h2 className="review-form-title">
            Share Your Experience
          </h2>

          <p className="review-form-subtitle">
            Tell us about your experience with
            Shasar Solar. Your feedback helps
            future customers make confident
            solar decisions.
          </p>
        </div>

        {onClose && (
          <button
            type="button"
            className="review-form-close"
            onClick={onClose}
            aria-label="Close review form"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* ====================================================
          SUCCESS MESSAGE
      ==================================================== */}

      {submitMessage && (
        <div
          className="review-alert review-alert-success"
          role="alert"
        >
          <CheckCircle2 size={20} />

          <div>
            <strong>
              Review published successfully
            </strong>

            <span>
              {submitMessage}
            </span>
          </div>
        </div>
      )}

      {/* ====================================================
          ERROR MESSAGE
      ==================================================== */}

      {submitError && (
        <div
          className="review-alert review-alert-error"
          role="alert"
        >
          <AlertCircle size={20} />

          <div>
            <strong>
              Submission failed
            </strong>

            <span>
              {submitError}
            </span>
          </div>
        </div>
      )}

      {/* ====================================================
          FORM
      ==================================================== */}

      <form
        className="review-form"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="row g-4">

          {/* ==================================================
              CLIENT NAME
          ================================================== */}

          <div className="col-md-6">
            <label
              htmlFor="testimonial-clientName"
              className="review-label"
            >
              Full Name
              <span>*</span>
            </label>

            <input
              id="testimonial-clientName"
              type="text"
              name="clientName"
              value={formData.clientName}
              onChange={handleChange}
              className={`form-control review-input ${
                errors.clientName
                  ? "review-input-error"
                  : ""
              }`}
              placeholder="Enter your full name"
              maxLength={100}
              autoComplete="name"
            />

            {errors.clientName && (
              <small className="review-field-error">
                {errors.clientName}
              </small>
            )}
          </div>

          {/* ==================================================
              EMAIL
          ================================================== */}

          <div className="col-md-6">
            <label
              htmlFor="testimonial-email"
              className="review-label"
            >
              Email Address
              <span>*</span>
            </label>

            <input
              id="testimonial-email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`form-control review-input ${
                errors.email
                  ? "review-input-error"
                  : ""
              }`}
              placeholder="you@example.com"
              maxLength={150}
              autoComplete="email"
            />

            <small className="review-helper-text">
              Your email will remain private.
            </small>

            {errors.email && (
              <small className="review-field-error">
                {errors.email}
              </small>
            )}
          </div>

          {/* ==================================================
              DESIGNATION
          ================================================== */}

          <div className="col-md-6">
            <label
              htmlFor="testimonial-designation"
              className="review-label"
            >
              Designation
              <small>Optional</small>
            </label>

            <input
              id="testimonial-designation"
              type="text"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              className="form-control review-input"
              placeholder="e.g. Business Owner"
              maxLength={100}
            />
          </div>

          {/* ==================================================
              LOCATION
          ================================================== */}

          <div className="col-md-6">
            <label
              htmlFor="testimonial-location"
              className="review-label"
            >
              Location
              <span>*</span>
            </label>

            <input
              id="testimonial-location"
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className={`form-control review-input ${
                errors.location
                  ? "review-input-error"
                  : ""
              }`}
              placeholder="e.g. Dubai, UAE"
              maxLength={150}
              autoComplete="address-level2"
            />

            {errors.location && (
              <small className="review-field-error">
                {errors.location}
              </small>
            )}
          </div>

          {/* ==================================================
              SERVICE
          ================================================== */}

          <div className="col-12">
            <label
              htmlFor="testimonial-serviceType"
              className="review-label"
            >
              Solar Service
              <span>*</span>
            </label>

            <select
              id="testimonial-serviceType"
              name="serviceType"
              value={formData.serviceType}
              onChange={handleChange}
              className={`form-select review-input ${
                errors.serviceType
                  ? "review-input-error"
                  : ""
              }`}
            >
              <option value="">
                Select the service you received
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
              <small className="review-field-error">
                {errors.serviceType}
              </small>
            )}
          </div>

          {/* ==================================================
              RATING
          ================================================== */}

          <div className="col-12">
            <div className="review-rating-heading">
              <label className="review-label mb-0">
                Your Rating
                <span>*</span>
              </label>

              {formData.rating > 0 && (
                <span className="review-rating-value">
                  {formData.rating}/5
                </span>
              )}
            </div>

            <div
              className="review-rating"
              role="radiogroup"
              aria-label="Rating"
            >
              {[1, 2, 3, 4, 5].map(
                (star) => {
                  const isActive =
                    star <=
                    formData.rating;

                  return (
                    <button
                      key={star}
                      type="button"
                      className={`review-star ${
                        isActive
                          ? "active"
                          : ""
                      }`}
                      onClick={() =>
                        handleRating(star)
                      }
                      aria-label={`${star} star${
                        star > 1
                          ? "s"
                          : ""
                      }`}
                      aria-pressed={
                        formData.rating ===
                        star
                      }
                    >
                      <Star
                        size={28}
                        strokeWidth={1.8}
                        fill={
                          isActive
                            ? "currentColor"
                            : "none"
                        }
                      />
                    </button>
                  );
                }
              )}
            </div>

            {errors.rating && (
              <small className="review-field-error">
                {errors.rating}
              </small>
            )}
          </div>

          {/* ==================================================
              COMMENT
          ================================================== */}

          <div className="col-12">
            <div className="review-comment-heading">
              <label
                htmlFor="testimonial-comment"
                className="review-label mb-0"
              >
                Your Experience
                <span>*</span>
              </label>

              <span className="review-character-count">
                {formData.comment.length}/1000
              </span>
            </div>

            <textarea
              id="testimonial-comment"
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              className={`form-control review-textarea ${
                errors.comment
                  ? "review-input-error"
                  : ""
              }`}
              placeholder="Tell us about your experience with Shasar Solar..."
              rows={6}
              maxLength={1000}
            />

            {errors.comment && (
              <small className="review-field-error">
                {errors.comment}
              </small>
            )}
          </div>

          {/* ==================================================
              IMAGE
          ================================================== */}

          <div className="col-12">
            <label className="review-label">
              Client Photo
              <small>Optional</small>
            </label>

            {!imagePreview ? (
              <label
                htmlFor="testimonial-image"
                className="review-upload-box"
              >
                <div className="review-upload-icon">
                  <Upload size={22} />
                </div>

                <div>
                  <strong>
                    Upload a photo
                  </strong>

                  <span>
                    JPG, PNG or WEBP · Maximum 5MB
                  </span>
                </div>

                <input
                  id="testimonial-image"
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  onChange={
                    handleImageChange
                  }
                  hidden
                />
              </label>
            ) : (
              <div className="review-image-preview">
                <img
                  src={imagePreview}
                  alt="Review preview"
                />

                <button
                  type="button"
                  className="review-remove-image"
                  onClick={
                    removeImage
                  }
                  aria-label="Remove uploaded photo"
                >
                  <X size={18} />
                </button>
              </div>
            )}

            {errors.image && (
              <small className="review-field-error">
                {errors.image}
              </small>
            )}
          </div>

          {/* ==================================================
              CONSENT
          ================================================== */}

          <div className="col-12">
            <div
              className={`review-consent ${
                errors.consentToPublish
                  ? "review-consent-error"
                  : ""
              }`}
            >
              <input
                id="testimonial-consent"
                type="checkbox"
                name="consentToPublish"
                checked={
                  formData.consentToPublish
                }
                onChange={handleChange}
              />

              <label htmlFor="testimonial-consent">
                I give Shasar Solar permission
                to publish my review, name,
                location, service type and
                optional photo on its website.
              </label>
            </div>

            {errors.consentToPublish && (
              <small className="review-field-error">
                {errors.consentToPublish}
              </small>
            )}
          </div>

          {/* ==================================================
              SUBMIT
          ================================================== */}

          <div className="col-12">
            <div className="review-submit-row">
              <div className="review-submit-note">
                <span>*</span>
                Required fields
              </div>

              <button
                type="submit"
                className="review-submit-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm"
                      aria-hidden="true"
                    />

                    Publishing...
                  </>
                ) : (
                  <>
                    <Send size={18} />

                    Share My Experience
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;