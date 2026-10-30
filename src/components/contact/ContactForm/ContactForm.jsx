
// ==========================================================
// SHASAR SOLAR SYSTEM
// CONTACT FORM
// ==========================================================

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Loader2,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  User,
  Zap,
} from "lucide-react";

import "./contactForm.css";

// ==========================================================
// INITIAL FORM
// ==========================================================

const initialForm = {
  fullName: "",
  companyName: "",
  email: "",
  phone: "",
  projectType: "",
  location: "",
  systemSize: "",
  message: "",
};

// ==========================================================
// CONTACT FORM
// ==========================================================

const ContactForm = () => {
  const [formData, setFormData] = useState(initialForm);

  const [errors, setErrors] = useState({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  // ========================================================
  // HANDLE INPUT
  // ========================================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((previous) => ({
        ...previous,
        [name]: "",
      }));
    }

    if (status.message) {
      setStatus({
        type: "",
        message: "",
      });
    }
  };

  // ========================================================
  // VALIDATION
  // ========================================================

  const validateForm = () => {
    const newErrors = {};

    const name = formData.fullName.trim();
    const email = formData.email.trim();
    const phone = formData.phone.trim();
    const location = formData.location.trim();
    const message = formData.message.trim();

    if (!name) {
      newErrors.fullName = "Please enter your full name.";
    } else if (name.length < 3) {
      newErrors.fullName =
        "Name must contain at least 3 characters.";
    }

    if (!email) {
      newErrors.email = "Please enter your email address.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      newErrors.email =
        "Please enter a valid email address.";
    }

    if (!phone) {
      newErrors.phone = "Please enter your phone number.";
    } else if (phone.length < 7) {
      newErrors.phone =
        "Please enter a valid phone number.";
    }

    if (!formData.projectType) {
      newErrors.projectType =
        "Please select a service or inquiry type.";
    }

    if (!location) {
      newErrors.location =
        "Please enter your project location.";
    }

    if (!message) {
      newErrors.message =
        "Please tell us about your solar project.";
    } else if (message.length < 20) {
      newErrors.message =
        "Please provide more details about your project.";
    } else if (message.length > 1500) {
      newErrors.message =
        "Message cannot exceed 1500 characters.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // ========================================================
  // SUBMIT
  // ========================================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    setStatus({
      type: "",
      message: "",
    });

    if (!validateForm()) {
      setStatus({
        type: "error",
        message:
          "Please review the highlighted fields and try again.",
      });

      return;
    }

    try {
      setIsSubmitting(true);

      // ====================================================
      // BACKEND API
      // ====================================================
      //
      // .env:
      //
      // VITE_API_BASE_URL=http://localhost:5000
      //
      // Production:
      //
      // VITE_API_BASE_URL=https://your-api-domain.com
      //
      // ====================================================

      const API_URL =
        import.meta.env.VITE_API_BASE_URL ||
        "http://localhost:5000";

      const response = await fetch(
        `${API_URL}/api/contact`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            fullName: formData.fullName.trim(),
            companyName: formData.companyName.trim(),
            email: formData.email.trim(),
            phone: formData.phone.trim(),
            projectType: formData.projectType,
            location: formData.location.trim(),
            systemSize: formData.systemSize.trim(),
            message: formData.message.trim(),
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result?.message ||
            "Unable to submit your inquiry."
        );
      }

      // ====================================================
      // SUCCESS
      // ====================================================

      setStatus({
        type: "success",
        message:
          "Thank you! Your message has been submitted successfully. Our team will contact you shortly.",
      });

      setFormData(initialForm);
      setErrors({});
    } catch (error) {
      console.error(
        "Contact form submission error:",
        error
      );

      setStatus({
        type: "error",
        message:
          error.message ||
          "Something went wrong. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // ========================================================
  // INPUT CLASS
  // ========================================================

  const inputClass = (field) =>
    `contact-form__input ${
      errors[field]
        ? "contact-form__input--error"
        : ""
    }`;

  return (
    <section
      className="contact-form"
      id="contact-form"
      aria-labelledby="contact-form-title"
    >
      {/* ====================================================
          DECORATIVE BACKGROUND
      ==================================================== */}

      <div
        className="contact-form__glow contact-form__glow--one"
        aria-hidden="true"
      />

      <div
        className="contact-form__glow contact-form__glow--two"
        aria-hidden="true"
      />

      <div className="container">
        {/* ==================================================
            HEADER
        ================================================== */}

        <motion.div
          className="contact-form__header"
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.7,
          }}
        >
          <div className="contact-form__eyebrow">
            <span className="contact-form__eyebrow-line" />

            <span>
              Start Your Solar Project
            </span>

            <span className="contact-form__eyebrow-line" />
          </div>

          <h2
            id="contact-form-title"
            className="contact-form__title"
          >
            Let's Build Your
            <span> Solar Future.</span>
          </h2>

          <p className="contact-form__intro">
            Tell us about your project and our solar
            specialists will review your requirements and
            get back to you with the right solution.
          </p>
        </motion.div>

        {/* ==================================================
            MAIN CARD
        ================================================== */}

        <motion.div
          className="contact-form__card"
          initial={{
            opacity: 0,
            y: 35,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.1,
          }}
          transition={{
            duration: 0.75,
          }}
        >
          <div className="row g-0">
            {/* =================================================
                LEFT PANEL
            ================================================= */}

            <div className="col-lg-4">
              <div className="contact-form__side">
                <div className="contact-form__side-badge">
                  <CheckCircle2 size={16} />

                  <span>
                    Professional Consultation
                  </span>
                </div>

                <h3>
                  Tell us about your
                  <span> solar project.</span>
                </h3>

                <p>
                  Share your project requirements with our
                  team. Detailed information helps us
                  understand your energy needs and prepare
                  the right solution.
                </p>

                <div className="contact-form__side-list">
                  <div className="contact-form__side-item">
                    <div className="contact-form__side-icon">
                      <User size={18} />
                    </div>

                    <div>
                      <strong>
                        Dedicated Support
                      </strong>

                      <span>
                        Speak directly with our solar
                        specialists.
                      </span>
                    </div>
                  </div>

                  <div className="contact-form__side-item">
                    <div className="contact-form__side-icon">
                      <Zap size={18} />
                    </div>

                    <div>
                      <strong>
                        Project Assessment
                      </strong>

                      <span>
                        Tell us about your energy
                        requirements.
                      </span>
                    </div>
                  </div>

                  <div className="contact-form__side-item">
                    <div className="contact-form__side-icon">
                      <CheckCircle2 size={18} />
                    </div>

                    <div>
                      <strong>
                        Professional Response
                      </strong>

                      <span>
                        Our team will contact you shortly.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* =================================================
                FORM AREA
            ================================================= */}

            <div className="col-lg-8">
              <form
                className="contact-form__body"
                onSubmit={handleSubmit}
                noValidate
              >
                {/* =============================================
                    SECTION 01
                ============================================== */}

                <div className="contact-form__form-heading">
                  <span>01</span>

                  <div>
                    <h3>
                      Your Information
                    </h3>

                    <p>
                      Tell us how our team can reach you.
                    </p>
                  </div>
                </div>

                <div className="row g-3">
                  {/* Full Name */}

                  <div className="col-md-6">
                    <label
                      htmlFor="fullName"
                      className="contact-form__label"
                    >
                      Full Name
                      <span>*</span>
                    </label>

                    <div className="contact-form__field">
                      <User size={17} />

                      <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        className={inputClass(
                          "fullName"
                        )}
                        autoComplete="name"
                      />
                    </div>

                    {errors.fullName && (
                      <small className="contact-form__error">
                        {errors.fullName}
                      </small>
                    )}
                  </div>

                  {/* Company */}

                  <div className="col-md-6">
                    <label
                      htmlFor="companyName"
                      className="contact-form__label"
                    >
                      Company Name
                      <span className="optional">
                        Optional
                      </span>
                    </label>

                    <div className="contact-form__field">
                      <Building2 size={17} />

                      <input
                        id="companyName"
                        name="companyName"
                        type="text"
                        value={formData.companyName}
                        onChange={handleChange}
                        placeholder="Company / organization"
                        className={inputClass(
                          "companyName"
                        )}
                        autoComplete="organization"
                      />
                    </div>
                  </div>

                  {/* Email */}

                  <div className="col-md-6">
                    <label
                      htmlFor="email"
                      className="contact-form__label"
                    >
                      Email Address
                      <span>*</span>
                    </label>

                    <div className="contact-form__field">
                      <Mail size={17} />

                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className={inputClass(
                          "email"
                        )}
                        autoComplete="email"
                      />
                    </div>

                    {errors.email && (
                      <small className="contact-form__error">
                        {errors.email}
                      </small>
                    )}
                  </div>

                  {/* Phone */}

                  <div className="col-md-6">
                    <label
                      htmlFor="phone"
                      className="contact-form__label"
                    >
                      Phone Number
                      <span>*</span>
                    </label>

                    <div className="contact-form__field">
                      <Phone size={17} />

                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+971 XX XXX XXXX"
                        className={inputClass(
                          "phone"
                        )}
                        autoComplete="tel"
                      />
                    </div>

                    {errors.phone && (
                      <small className="contact-form__error">
                        {errors.phone}
                      </small>
                    )}
                  </div>
                </div>

                {/* =============================================
                    SECTION 02
                ============================================== */}

                <div className="contact-form__form-heading contact-form__form-heading--project">
                  <span>02</span>

                  <div>
                    <h3>
                      Project Information
                    </h3>

                    <p>
                      Help us understand your solar
                      requirements.
                    </p>
                  </div>
                </div>

                <div className="row g-3">
                  {/* Project Type */}

                  <div className="col-md-6">
                    <label
                      htmlFor="projectType"
                      className="contact-form__label"
                    >
                      Service / Inquiry Type
                      <span>*</span>
                    </label>

                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      className={inputClass(
                        "projectType"
                      )}
                    >
                      <option value="">
                        Select project type
                      </option>

                      <option value="Residential Solar">
                        Residential Solar
                      </option>

                      <option value="Commercial Solar">
                        Commercial Solar
                      </option>

                      <option value="Industrial Solar">
                        Industrial Solar
                      </option>

                      <option value="Solar Battery Storage">
                        Solar Battery Storage
                      </option>

                      <option value="Solar Maintenance">
                        Solar Maintenance
                      </option>

                      <option value="Solar Cleaning">
                        Solar Cleaning
                      </option>

                      <option value="EV Charging">
                        EV Charging
                      </option>

                      <option value="Solar Consultation">
                        Solar Consultation
                      </option>

                      <option value="Other">
                        Other Inquiry
                      </option>
                    </select>

                    {errors.projectType && (
                      <small className="contact-form__error">
                        {errors.projectType}
                      </small>
                    )}
                  </div>

                  {/* Location */}

                  <div className="col-md-6">
                    <label
                      htmlFor="location"
                      className="contact-form__label"
                    >
                      Project Location
                      <span>*</span>
                    </label>

                    <div className="contact-form__field">
                      <MapPin size={17} />

                      <input
                        id="location"
                        name="location"
                        type="text"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="Dubai, UAE"
                        className={inputClass(
                          "location"
                        )}
                      />
                    </div>

                    {errors.location && (
                      <small className="contact-form__error">
                        {errors.location}
                      </small>
                    )}
                  </div>

                  {/* System Size */}

                  <div className="col-12">
                    <label
                      htmlFor="systemSize"
                      className="contact-form__label"
                    >
                      Estimated System Size
                      <span className="optional">
                        Optional
                      </span>
                    </label>

                    <div className="contact-form__field">
                      <Zap size={17} />

                      <input
                        id="systemSize"
                        name="systemSize"
                        type="text"
                        value={formData.systemSize}
                        onChange={handleChange}
                        placeholder="e.g. 100 kW, 1 MW, or Not Sure"
                        className={inputClass(
                          "systemSize"
                        )}
                      />
                    </div>
                  </div>

                  {/* Message */}

                  <div className="col-12">
                    <label
                      htmlFor="message"
                      className="contact-form__label"
                    >
                      Project Message
                      <span>*</span>
                    </label>

                    <div className="contact-form__textarea-wrap">
                      <MessageSquare size={17} />

                      <textarea
                        id="message"
                        name="message"
                        rows="6"
                        maxLength="1500"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your project, property type, energy requirements, expected system size, current electricity needs, or any specific questions..."
                        className={inputClass(
                          "message"
                        )}
                      />
                    </div>

                    <div className="contact-form__message-footer">
                      {errors.message ? (
                        <small className="contact-form__error">
                          {errors.message}
                        </small>
                      ) : (
                        <small>
                          Please provide enough detail for
                          our team to understand your
                          requirements.
                        </small>
                      )}

                      <span>
                        {formData.message.length}/1500
                      </span>
                    </div>
                  </div>
                </div>

                {/* =============================================
                    STATUS
                ============================================== */}

                {status.message && (
                  <motion.div
                    className={`contact-form__status contact-form__status--${status.type}`}
                    initial={{
                      opacity: 0,
                      y: 8,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                  >
                    {status.type === "success" ? (
                      <CheckCircle2 size={19} />
                    ) : (
                      <MessageSquare size={19} />
                    )}

                    <span>
                      {status.message}
                    </span>
                  </motion.div>
                )}

                {/* =============================================
                    SUBMIT AREA
                ============================================== */}

                <div className="contact-form__submit-area">
                  <div className="contact-form__privacy">
                    <CheckCircle2 size={15} />

                    <span>
                      Your information is handled securely
                      and used only to respond to your
                      inquiry.
                    </span>
                  </div>

                  <motion.button
                    type="submit"
                    className="contact-form__submit"
                    disabled={isSubmitting}
                    whileHover={
                      !isSubmitting
                        ? { y: -2 }
                        : {}
                    }
                    whileTap={
                      !isSubmitting
                        ? { scale: 0.98 }
                        : {}
                    }
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2
                          size={18}
                          className="contact-form__spinner"
                        />

                        <span>
                          Submitting...
                        </span>
                      </>
                    ) : (
                      <>
                        <span>
                          Submit Project Inquiry
                        </span>

                        <span className="contact-form__submit-icon">
                          <ArrowRight size={17} />
                        </span>
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactForm;

