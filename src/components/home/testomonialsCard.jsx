// ==========================================================
// SHASAR SOLAR SYSTEM
// TESTIMONIAL CARD
// ==========================================================

import { motion } from "framer-motion";

import {
  MapPin,
  Quote,
  Star,
  UserRound,
} from "lucide-react";


// ==========================================================
// CONSTANTS
// ==========================================================

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:5000";


// ==========================================================
// HELPERS
// ==========================================================

const getInitials = (name = "") => {
  const words = name
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (!words.length) {
    return "C";
  }

  if (words.length === 1) {
    return words[0]
      .charAt(0)
      .toUpperCase();
  }

  return (
    words[0].charAt(0) +
    words[words.length - 1].charAt(0)
  ).toUpperCase();
};


// ==========================================================
// IMAGE URL HELPER
// ==========================================================

const getImageUrl = (imageUrl) => {
  if (!imageUrl) {
    return "";
  }

  const value = String(imageUrl).trim();

  if (!value) {
    return "";
  }


  // ========================================================
  // EXTERNAL / DATA IMAGES
  // ========================================================

  if (
    value.startsWith("http://") ||
    value.startsWith("https://") ||
    value.startsWith("data:") ||
    value.startsWith("blob:")
  ) {
    return value;
  }


  // ========================================================
  // NORMALIZE BACKSLASHES
  // Useful if a Windows-style path somehow reaches frontend
  // ========================================================

  const normalizedPath =
    value.replace(/\\/g, "/");


  // ========================================================
  // ALREADY A ROOT-BASED UPLOAD PATH
  //
  // Example:
  // /uploads/testimonials/image.jpg
  //
  // Result:
  // http://localhost:5000/uploads/testimonials/image.jpg
  // ========================================================

  if (
    normalizedPath.startsWith("/uploads/")
  ) {
    return `${API_BASE_URL}${normalizedPath}`;
  }


  // ========================================================
  // UPLOADS PATH WITHOUT LEADING SLASH
  //
  // Example:
  // uploads/testimonials/image.jpg
  // ========================================================

  if (
    normalizedPath.startsWith("uploads/")
  ) {
    return `${API_BASE_URL}/${normalizedPath}`;
  }


  // ========================================================
  // ROOT-BASED PATH
  //
  // Example:
  // /images/client.jpg
  // ========================================================

  if (
    normalizedPath.startsWith("/")
  ) {
    return `${API_BASE_URL}${normalizedPath}`;
  }


  // ========================================================
  // RELATIVE PATH
  //
  // Example:
  // testimonials/image.jpg
  // image.jpg
  // ========================================================

  return `${API_BASE_URL}/${normalizedPath}`;
};


// ==========================================================
// COMPONENT
// ==========================================================

const TestomonialsCard = ({
  testimonial,
}) => {

  // ========================================================
  // SAFETY
  // ========================================================

  if (!testimonial) {
    return null;
  }


  // ========================================================
  // DATA
  // ========================================================

  const {
    clientName = "Shasar Solar Client",
    designation = "",
    location = "",
    serviceType = "",
    rating = 5,
    comment = "",
    imageUrl = "",
  } = testimonial;


  // ========================================================
  // SAFE RATING
  // ========================================================

  const safeRating = Math.min(
    5,
    Math.max(
      1,
      Number(rating) || 1
    )
  );


  // ========================================================
  // CLIENT IMAGE
  // ========================================================

  const clientImage =
    getImageUrl(imageUrl);


  // ========================================================
  // INITIALS
  // ========================================================

  const initials =
    getInitials(clientName);


  // ========================================================
  // IMAGE ERROR HANDLER
  // ========================================================

  const handleImageError = (event) => {
    const image = event.currentTarget;

    // Hide broken image
    image.style.display = "none";

    // Show fallback
    const fallback =
      image.parentElement?.querySelector(
        ".testomonial-client-fallback"
      );

    if (fallback) {
      fallback.classList.remove("d-none");
    }
  };


  // ========================================================
  // RENDER
  // ========================================================

  return (
    <motion.article
      className="testomonial-card"

      initial={{
        opacity: 0,
        y: 24,
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
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      }}
    >

      {/* ==================================================
          TOP ACCENT
      ================================================== */}

      <div
        className="testomonial-card-accent"
        aria-hidden="true"
      />


      {/* ==================================================
          HEADER
      ================================================== */}

      <div className="testomonial-card-header">

        {/* ==================================================
            CLIENT PROFILE
        ================================================== */}

        <div className="testomonial-client">

          <div className="testomonial-client-image">

            {/* ==================================================
                CLIENT IMAGE
            ================================================== */}

            {clientImage && (
              <img
                src={clientImage}
                alt={`${clientName} - Shasar Solar client`}
                loading="lazy"
                decoding="async"
                onError={handleImageError}
              />
            )}


            {/* ==================================================
                FALLBACK
            ================================================== */}

            <div
              className={`testomonial-client-fallback ${
                clientImage
                  ? "d-none"
                  : ""
              }`}
              aria-hidden={
                clientImage
                  ? "true"
                  : "false"
              }
            >

              {clientImage ? (
                <UserRound
                  size={22}
                  strokeWidth={1.8}
                />
              ) : (
                initials
              )}

            </div>

          </div>


          {/* ==================================================
              CLIENT DETAILS
          ================================================== */}

          <div className="testomonial-client-info">

            <h3 className="testomonial-client-name">
              {clientName}
            </h3>


            {designation && (
              <p className="testomonial-client-designation">
                {designation}
              </p>
            )}


            {location && (
              <div className="testomonial-client-location">

                <MapPin
                  size={13}
                  strokeWidth={2}
                />

                <span>
                  {location}
                </span>

              </div>
            )}

          </div>

        </div>


        {/* ==================================================
            QUOTE ICON
        ================================================== */}

        <div
          className="testomonial-quote-icon"
          aria-hidden="true"
        >

          <Quote
            size={30}
            strokeWidth={1.5}
          />

        </div>

      </div>


      {/* ==================================================
          RATING
      ================================================== */}

      <div
        className="testomonial-rating"
        aria-label={`${safeRating} out of 5 stars`}
      >

        <div className="testomonial-stars">

          {Array.from({
            length: 5,
          }).map((_, index) => {

            const filled =
              index < safeRating;

            return (
              <Star
                key={index}
                size={16}
                strokeWidth={1.8}
                fill={
                  filled
                    ? "currentColor"
                    : "none"
                }
                aria-hidden="true"
              />
            );

          })}

        </div>


        <span className="testomonial-rating-value">
          {safeRating.toFixed(1)}
        </span>

      </div>


      {/* ==================================================
          SERVICE TYPE
      ================================================== */}

      {serviceType && (
        <div className="testomonial-service">

          <span className="testomonial-service-label">
            Service
          </span>

          <span className="testomonial-service-value">
            {serviceType}
          </span>

        </div>
      )}


      {/* ==================================================
          REVIEW
      ================================================== */}

      <div className="testomonial-review">

        <p>
          {comment}
        </p>

      </div>


      {/* ==================================================
          BOTTOM
      ================================================== */}

      <div className="testomonial-card-footer">

        <div className="testomonial-verified">

          <span
            className="testomonial-verified-dot"
            aria-hidden="true"
          />

          <span>
            Verified Client Experience
          </span>

        </div>


        <div
          className="testomonial-footer-line"
          aria-hidden="true"
        />

      </div>

    </motion.article>
  );
};


export default TestomonialsCard;