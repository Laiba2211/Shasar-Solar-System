import { useCallback, useEffect, useState } from "react";
import { MessageSquareQuote, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

import TestomonialSlider from "./testomonialSlider";
import ReviewForm from "../testimonials/ReviewForm";

import "./testomonials.css";

/* ==========================================================
   API CONFIGURATION
========================================================== */

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:5000";

/*
 * How often the public testimonial list is refreshed.
 *
 * This allows:
 *
 * Admin adds testimonial
 *        ↓
 * MongoDB
 *        ↓
 * Public API
 *        ↓
 * Already-open website updates automatically
 *
 * without requiring a browser refresh.
 */
const TESTIMONIAL_REFRESH_INTERVAL = 30000;


/* ==========================================================
   TESTIMONIALS
========================================================== */

const Testomonials = () => {
  const [testimonials, setTestimonials] =
    useState([]);

  const [isLoading, setIsLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [showReviewForm, setShowReviewForm] =
    useState(false);


  /* ========================================================
     FETCH PUBLIC TESTIMONIALS
  ======================================================== */

  const fetchTestimonials = useCallback(
    async (showLoader = false) => {
      try {
        /*
         * Only show the main loading UI during
         * the initial request.
         *
         * Background refreshes should not make
         * the testimonial section disappear.
         */
        if (showLoader) {
          setIsLoading(true);
        }

        setError("");

        const response = await fetch(
          `${API_BASE_URL}/api/testimonials/public`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
            },

            /*
             * Prevent browser caching from returning
             * an older testimonial list.
             */
            cache: "no-store",
          }
        );

        let result = null;

        try {
          result = await response.json();
        } catch {
          result = null;
        }

        if (!response.ok) {
          throw new Error(
            result?.message ||
              "Unable to load testimonials."
          );
        }

        const publicTestimonials =
          Array.isArray(result?.data)
            ? result.data
            : [];

        setTestimonials(
          publicTestimonials
        );
      } catch (err) {
        console.error(
          "FETCH TESTIMONIALS ERROR:",
          err
        );

        /*
         * Do not destroy already-loaded
         * testimonials during a background
         * refresh failure.
         */
        if (showLoader) {
          setError(
            err.message ||
              "Unable to load testimonials."
          );

          setTestimonials([]);
        }
      } finally {
        if (showLoader) {
          setIsLoading(false);
        }
      }
    },
    []
  );


  /* ========================================================
     INITIAL LOAD
  ======================================================== */

  useEffect(() => {
    fetchTestimonials(true);
  }, [fetchTestimonials]);


  /* ========================================================
     LIVE BACKGROUND REFRESH
     
     This keeps an already-open website synchronized
     with testimonials added from:
     
     1. Client review form
     2. Admin testimonial form
     3. Admin approval/update
     
     The API is checked every 30 seconds.
  ======================================================== */

  useEffect(() => {
    const refreshInterval =
      window.setInterval(() => {
        fetchTestimonials(false);
      }, TESTIMONIAL_REFRESH_INTERVAL);

    return () => {
      window.clearInterval(
        refreshInterval
      );
    };
  }, [fetchTestimonials]);


  /* ========================================================
     REFRESH WHEN USER RETURNS TO THE TAB
     
     If someone submits a testimonial from another
     browser/device while this website is open,
     refresh when the visitor comes back to the tab.
  ======================================================== */

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (
        document.visibilityState ===
        "visible"
      ) {
        fetchTestimonials(false);
      }
    };

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    return () => {
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );
    };
  }, [fetchTestimonials]);


  /* ========================================================
     REVIEW SUBMITTED
     
     New client reviews are now published immediately
     by the backend.
     
     Therefore:
     
     ReviewForm
          ↓
     MongoDB
          ↓
     Approved + consentToPublish
          ↓
     Fetch public API
          ↓
     Slider updates
  ======================================================== */

  const handleReviewSuccess = async () => {
    /*
     * Close the review form first.
     */
    setShowReviewForm(false);

    /*
     * Immediately fetch the latest public
     * testimonial list.
     *
     * We intentionally do not show the loading
     * spinner because the existing testimonials
     * should remain visible.
     */
    await fetchTestimonials(false);
  };


  /* ========================================================
     EMPTY STATE
  ======================================================== */

  const hasTestimonials =
    testimonials.length > 0;


  /* ========================================================
     RENDER
  ======================================================== */

  return (
    <section
      className="testomonials-section"
      id="testimonials"
    >
      <div className="container">

        {/* ==================================================
            SECTION HEADER
        ================================================== */}

        <motion.div
          className="testomonials-header"
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
            duration: 0.65,
            ease: "easeOut",
          }}
        >
          <div className="testomonials-heading-content">

            <span className="testomonials-eyebrow">
              CLIENT EXPERIENCES
            </span>

            <h2 className="testomonials-title">
              Trusted by Clients.
              <br />

              <span>
                Proven by Experience.
              </span>
            </h2>

            <p className="testomonials-description">
              Discover what our clients have to
              say about their experience with
              Shasar Solar — from installation and
              engineering to long-term solar
              performance.
            </p>

          </div>


          {/* ================================================
              REVIEW CTA
          ================================================= */}

          <motion.button
            type="button"
            className="testomonials-review-button"
            onClick={() =>
              setShowReviewForm(
                (previous) => !previous
              )
            }
            whileHover={{
              y: -2,
            }}
            whileTap={{
              scale: 0.98,
            }}
          >
            <MessageSquareQuote
              size={18}
            />

            {showReviewForm
              ? "Close Review Form"
              : "Share Your Experience"}
          </motion.button>
        </motion.div>


        {/* ==================================================
            REVIEW FORM
        ================================================== */}

        <motion.div
          className={`testomonials-review-form-container ${
            showReviewForm
              ? "is-visible"
              : ""
          }`}
          initial={false}
          animate={{
            height: showReviewForm
              ? "auto"
              : 0,

            opacity: showReviewForm
              ? 1
              : 0,

            marginBottom:
              showReviewForm ? 55 : 0,
          }}
          transition={{
            duration: 0.4,
            ease: "easeInOut",
          }}
          style={{
            overflow: "hidden",
          }}
        >
          {showReviewForm && (
            <ReviewForm
              embedded
              onSuccess={
                handleReviewSuccess
              }
              onClose={() =>
                setShowReviewForm(false)
              }
            />
          )}
        </motion.div>


        {/* ==================================================
            LOADING STATE
        ================================================== */}

        {isLoading && (
          <div className="testomonials-loading">
            <div
              className="spinner-border"
              role="status"
              aria-label="Loading testimonials"
            />

            <span>
              Loading client experiences...
            </span>
          </div>
        )}


        {/* ==================================================
            ERROR STATE
        ================================================== */}

        {!isLoading && error && (
          <div className="testomonials-error">

            <div className="testomonials-error-content">
              <strong>
                Unable to load client reviews
              </strong>

              <span>
                {error}
              </span>
            </div>

            <button
              type="button"
              className="testomonials-retry-button"
              onClick={() =>
                fetchTestimonials(true)
              }
            >
              <RefreshCw size={16} />

              Try Again
            </button>

          </div>
        )}


        {/* ==================================================
            TESTIMONIAL SLIDER
        ================================================== */}

        {!isLoading &&
          !error &&
          hasTestimonials && (
            <motion.div
              className="testomonials-slider-wrapper"
              initial={{
                opacity: 0,
                y: 25,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.15,
              }}
              transition={{
                duration: 0.6,
                delay: 0.1,
              }}
            >
              <TestomonialSlider
                testimonials={
                  testimonials
                }
              />
            </motion.div>
          )}


        {/* ==================================================
            NO TESTIMONIALS
        ================================================== */}

        {!isLoading &&
          !error &&
          !hasTestimonials && (
            <motion.div
              className="testomonials-empty"
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
            >
              <div className="testomonials-empty-icon">
                <MessageSquareQuote
                  size={28}
                />
              </div>

              <h3>
                Be our first reviewer
              </h3>

              <p>
                We would love to hear about
                your experience with Shasar
                Solar.
              </p>

              <button
                type="button"
                className="testomonials-review-button"
                onClick={() =>
                  setShowReviewForm(true)
                }
              >
                <MessageSquareQuote
                  size={18}
                />

                Share Your Experience
              </button>
            </motion.div>
          )}

      </div>
    </section>
  );
};


export default Testomonials;