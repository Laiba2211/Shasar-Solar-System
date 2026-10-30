import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  MapPin,
  Zap,
} from "lucide-react";

/* ==========================================================
   API BASE URL
   ========================================================== */

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

/* ==========================================================
   MEDIA URL HELPER
   ========================================================== */

const getMediaUrl = (mediaUrl) => {
  if (!mediaUrl || typeof mediaUrl !== "string") {
    return "";
  }

  const trimmedUrl = mediaUrl.trim();

  if (!trimmedUrl) {
    return "";
  }

  // Already a complete URL
  if (
    trimmedUrl.startsWith("http://") ||
    trimmedUrl.startsWith("https://") ||
    trimmedUrl.startsWith("blob:")
  ) {
    return trimmedUrl;
  }

  // Backend uploads
  if (trimmedUrl.startsWith("/uploads")) {
    return `${API_BASE_URL.replace(/\/$/, "")}${trimmedUrl}`;
  }

  // Other root-relative paths
  if (trimmedUrl.startsWith("/")) {
    return `${API_BASE_URL.replace(/\/$/, "")}${trimmedUrl}`;
  }

  return trimmedUrl;
};

/* ==========================================================
   SAFE VALUE HELPER
   ========================================================== */

const getSafeValue = (...values) => {
  for (const value of values) {
    if (
      value !== undefined &&
      value !== null &&
      String(value).trim() !== ""
    ) {
      return value;
    }
  }

  return "";
};

/* ==========================================================
   ARRAY NORMALIZER
   ========================================================== */

const normalizeArray = (value) => {
  if (Array.isArray(value)) {
    return value
      .filter(
        (item) =>
          item !== undefined &&
          item !== null &&
          String(item).trim() !== ""
      )
      .map((item) => String(item).trim());
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
};

/* ==========================================================
   PRICE FORMATTER
   ========================================================== */

const formatPrice = (price, currency = "AED") => {
  if (
    price === undefined ||
    price === null ||
    price === ""
  ) {
    return "";
  }

  const numericPrice = Number(price);

  if (!Number.isFinite(numericPrice)) {
    return String(price);
  }

  const formattedPrice = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(numericPrice);

  return `${currency} ${formattedPrice}`;
};

/* ==========================================================
   MEDIA TYPE DETECTOR
   ========================================================== */

const isVideoMedia = (service) => {
  const mediaType = String(
    getSafeValue(
      service.mediaType,
      service.media_type,
      ""
    )
  ).toLowerCase();

  if (mediaType === "video") {
    return true;
  }

  if (mediaType === "image") {
    return false;
  }

  const mediaUrl = String(
    getSafeValue(
      service.mediaUrl,
      service.media,
      service.video,
      service.image,
      ""
    )
  );

  return /\.(mp4|webm|ogg|mov|m4v)$/i.test(
    mediaUrl.split("?")[0]
  );
};

/* ==========================================================
   DESCRIPTION PREVIEW
   ========================================================== */

const getDescriptionPreview = (description) => {
  if (!description) {
    return "";
  }

  const text = String(description).trim();

  /*
   * We don't modify the original description.
   * CSS handles visual preview in collapsed state.
   */
  return text;
};

/* ==========================================================
   SERVICE CARD
   ========================================================== */

const ServiceCard = ({ service }) => {
  const [expanded, setExpanded] = useState(false);

  if (!service) {
    return null;
  }

  /* ========================================================
     SERVICE DATA
     ======================================================== */

  const title = getSafeValue(
    service.title,
    service.serviceTitle,
    service.name
  );

  const description = getSafeValue(
    service.description,
    service.shortDescription
  );

  const category = getSafeValue(
    service.category,
    service.serviceCategory
  );

  const serviceArea = getSafeValue(
    service.serviceArea,
    service.area,
    service.location
  );

  const systemSize = getSafeValue(
    service.systemSize,
    service.system_capacity,
    service.capacity
  );

  const suitableFor = normalizeArray(
    getSafeValue(
      service.suitableFor,
      service.suitable_for,
      service.applicableFor
    )
  );

  const startingPrice = getSafeValue(
    service.startingPrice,
    service.price,
    service.pricing
  );

  const priceUnit = getSafeValue(
    service.priceUnit,
    service.price_unit
  );

  const pricingDescription = getSafeValue(
    service.pricingDescription,
    service.pricing_description
  );

  const currency = getSafeValue(
    service.currency,
    service.priceCurrency,
    service.pricingCurrency,
    "AED"
  );

  /* ========================================================
     OPTIONAL ADDITIONAL DATA
     ======================================================== */

  const serviceType = getSafeValue(
    service.serviceType,
    service.type
  );

  const projectDuration = getSafeValue(
    service.projectDuration,
    service.duration
  );

  const warranty = getSafeValue(
    service.warranty,
    service.warrantyPeriod
  );

  /* ========================================================
     MEDIA
     ======================================================== */

  const rawMediaUrl = getSafeValue(
    service.mediaUrl,
    service.media,
    service.image,
    service.video
  );

  const mediaUrl = getMediaUrl(rawMediaUrl);

  const isVideo = isVideoMedia(service);

  /* ========================================================
     PRICE
     ======================================================== */

  const formattedPrice = formatPrice(
    startingPrice,
    currency
  );

  /* ========================================================
     DISPLAY VALUES
     ======================================================== */

  const displayTitle =
    title || "Solar Energy Solution";

  const displayDescription =
    getDescriptionPreview(description);

  /* ========================================================
     EXPAND / COLLAPSE
     ======================================================== */

  const toggleExpanded = () => {
    setExpanded((current) => !current);
  };

  /* ========================================================
     RENDER
     ======================================================== */

  return (
    <motion.div
      className="col-lg-4 col-md-6"
      layout
      initial={{
        opacity: 0,
        y: 40,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.12,
      }}
      transition={{
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <motion.article
        className={`service-grid-card h-100 ${
          expanded
            ? "service-grid-card--expanded"
            : "service-grid-card--collapsed"
        }`}
        layout
      >
        {/* ==================================================
            MEDIA
        ================================================== */}

        <div className="service-grid-image overflow-hidden">

          {/* CATEGORY */}

          {category && (
            <span className="service-grid-category">
              {category}
            </span>
          )}

          {/* TOP RIGHT INTERACTION ICON */}

          <span
            className={`service-grid-media-arrow ${
              expanded
                ? "service-grid-media-arrow--expanded"
                : ""
            }`}
            aria-hidden="true"
          >
            {expanded ? (
              <ArrowUp size={17} />
            ) : (
              <ArrowUpRight size={17} />
            )}
          </span>

          {/* VIDEO */}

          {mediaUrl && isVideo ? (
            <video
              className="service-image"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label={displayTitle}
              onError={(event) => {
                event.currentTarget.style.display =
                  "none";

                const parent =
                  event.currentTarget.parentElement;

                if (
                  parent &&
                  !parent.querySelector(
                    ".service-grid-media-placeholder"
                  )
                ) {
                  const fallback =
                    document.createElement("div");

                  fallback.className =
                    "service-grid-media-placeholder";

                  fallback.innerHTML =
                    "<span>Solar Energy Solution</span>";

                  parent.appendChild(fallback);
                }
              }}
            >
              <source src={mediaUrl} />
            </video>
          ) : mediaUrl ? (

            /* IMAGE */

            <img
              src={mediaUrl}
              alt={displayTitle}
              className="service-image img-fluid"
              loading="lazy"
              onError={(event) => {
                event.currentTarget.style.display =
                  "none";

                const parent =
                  event.currentTarget.parentElement;

                if (
                  parent &&
                  !parent.querySelector(
                    ".service-grid-media-placeholder"
                  )
                ) {
                  const fallback =
                    document.createElement("div");

                  fallback.className =
                    "service-grid-media-placeholder";

                  fallback.innerHTML =
                    "<span>Solar Energy Solution</span>";

                  parent.appendChild(fallback);
                }
              }}
            />

          ) : (

            /* FALLBACK */

            <div className="service-grid-media-placeholder">
              <span>Solar Energy Solution</span>
            </div>
          )}

        </div>

        {/* ==================================================
            CARD CONTENT
        ================================================== */}

        <div className="card-body d-flex flex-column">

          {/* =================================================
              TITLE
          ================================================= */}

          <h3 className="service-grid-title">
            {displayTitle}
          </h3>

          {/* =================================================
              DESCRIPTION
          ================================================= */}

          {displayDescription && (
            <div
              className={`service-grid-description-wrapper ${
                expanded
                  ? "service-grid-description-wrapper--expanded"
                  : ""
              }`}
            >
              <p className="service-grid-description">
                {displayDescription}
              </p>
            </div>
          )}

          {/* =================================================
              SERVICE META
          ================================================= */}

          {(serviceArea || systemSize) && (
            <div className="service-grid-meta">

              {/* SERVICE AREA */}

              {serviceArea && (
                <div className="service-grid-meta-item">
                  <MapPin size={15} />

                  <span title={String(serviceArea)}>
                    {serviceArea}
                  </span>
                </div>
              )}

              {/* SYSTEM SIZE */}

              {systemSize && (
                <div className="service-grid-meta-item">
                  <Zap size={15} />

                  <span title={String(systemSize)}>
                    {systemSize}
                  </span>
                </div>
              )}

            </div>
          )}

          {/* =================================================
              COLLAPSED SUITABLE FOR PREVIEW
          ================================================= */}

          {!expanded &&
            suitableFor.length > 0 && (
              <div className="service-grid-suitable">

                <span className="service-grid-suitable-label">
                  Suitable For
                </span>

                <div className="service-grid-suitable-list">

                  {suitableFor
                    .slice(0, 3)
                    .map((item, index) => (
                      <span
                        key={`${item}-${index}`}
                        className="service-grid-suitable-tag"
                      >
                        {item}
                      </span>
                    ))}

                  {suitableFor.length > 3 && (
                    <span className="service-grid-suitable-more">
                      +{suitableFor.length - 3}
                    </span>
                  )}

                </div>
              </div>
            )}

          {/* =================================================
              EXPANDED COMPLETE INFORMATION
          ================================================= */}

          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                className="service-grid-expanded-content"
                initial={{
                  opacity: 0,
                  height: 0,
                }}
                animate={{
                  opacity: 1,
                  height: "auto",
                }}
                exit={{
                  opacity: 0,
                  height: 0,
                }}
                transition={{
                  duration: 0.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >

                {/* ==========================================
                    COMPLETE SUITABLE FOR
                ========================================== */}

                {suitableFor.length > 0 && (
                  <div className="service-grid-suitable service-grid-suitable--expanded">

                    <span className="service-grid-suitable-label">
                      Suitable For
                    </span>

                    <div className="service-grid-suitable-list">

                      {suitableFor.map(
                        (item, index) => (
                          <span
                            key={`${item}-${index}`}
                            className="service-grid-suitable-tag"
                          >
                            {item}
                          </span>
                        )
                      )}

                    </div>
                  </div>
                )}

                {/* ==========================================
                    ADDITIONAL INFORMATION
                ========================================== */}

                {(serviceType ||
                  projectDuration ||
                  warranty) && (
                  <div className="service-grid-extra-info">

                    {serviceType && (
                      <div className="service-grid-extra-item">
                        <span>Service Type</span>
                        <strong>
                          {serviceType}
                        </strong>
                      </div>
                    )}

                    {projectDuration && (
                      <div className="service-grid-extra-item">
                        <span>Project Duration</span>
                        <strong>
                          {projectDuration}
                        </strong>
                      </div>
                    )}

                    {warranty && (
                      <div className="service-grid-extra-item">
                        <span>Warranty</span>
                        <strong>
                          {warranty}
                        </strong>
                      </div>
                    )}

                  </div>
                )}

                {/* ==========================================
                    COMPLETE PRICING DESCRIPTION
                ========================================== */}

                {pricingDescription && (
                  <div className="service-grid-full-pricing-description">

                    <span className="service-grid-suitable-label">
                      Pricing Details
                    </span>

                    <p>
                      {pricingDescription}
                    </p>

                  </div>
                )}

              </motion.div>
            )}
          </AnimatePresence>

          {/* =================================================
              PRICE + EXPLORE BUTTON
          ================================================= */}

          <div className="service-grid-offer mt-auto">

            {/* ==============================================
                PRICE
            ============================================== */}

            <div className="service-grid-price-area">

              <span className="service-grid-price-label">
                Starting From
              </span>

              <div className="service-grid-price-row">

                {formattedPrice ? (
                  <span className="service-grid-price">
                    {formattedPrice}
                  </span>
                ) : (
                  <span className="service-grid-price">
                    Get a Quote
                  </span>
                )}

                {priceUnit && (
                  <span className="service-grid-price-unit">
                    {priceUnit}
                  </span>
                )}

              </div>

              {/* Collapsed pricing preview */}

              {!expanded &&
                pricingDescription && (
                  <p className="service-grid-price-description">
                    {pricingDescription}
                  </p>
                )}

            </div>

            {/* ==============================================
                EXPLORE / SHOW LESS
            ============================================== */}

            <button
              type="button"
              className="service-grid-cta"
              onClick={toggleExpanded}
              aria-expanded={expanded}
              aria-label={
                expanded
                  ? `Show less information about ${displayTitle}`
                  : `Explore ${displayTitle}`
              }
            >
              <span className="service-grid-cta-content">

                <span className="service-grid-cta-label">
                  {expanded
                    ? "Service Details"
                    : "Solar Solution"}
                </span>

                <span className="service-grid-cta-title">
                  {expanded
                    ? "Show Less"
                    : "Explore Service"}
                </span>

              </span>

              <span
                className="service-grid-cta-icon"
                aria-hidden="true"
              >
                {expanded ? (
                  <ArrowUp size={18} />
                ) : (
                  <ArrowDown size={18} />
                )}
              </span>

            </button>

          </div>

        </div>
      </motion.article>
    </motion.div>
  );
};

export default ServiceCard;