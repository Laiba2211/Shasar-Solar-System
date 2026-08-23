import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  PlayCircle,
  MapPin,
  Zap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import "./projectsHero.css";

// ==========================================================
// HERO IMAGE
// Replace this import later with your client's actual image.
// Example:
// import projectsHeroImage from "../../../assets/images/projects/projects-hero.jpg";
// ==========================================================

// Temporary image
const projectsHeroImage =
  "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1400&auto=format&fit=crop&q=85";

const ProjectsHero = () => {
  const navigate = useNavigate();

  // ========================================================
  // NAVIGATION
  // ========================================================

  const handleQuote = () => {
    navigate("/contact");
  };

  const handleServices = () => {
    navigate("/services");
  };

  return (
    <section
      className="projects-hero"
      aria-labelledby="projects-hero-title"
    >
      {/* =====================================================
          BACKGROUND DECORATION
      ====================================================== */}

      <div
        className="projects-hero__glow projects-hero__glow--one"
        aria-hidden="true"
      />

      <div
        className="projects-hero__glow projects-hero__glow--two"
        aria-hidden="true"
      />

      <div
        className="projects-hero__grid"
        aria-hidden="true"
      />

      {/* =====================================================
          MAIN CONTAINER
      ====================================================== */}

      <div className="container">
        <div className="row align-items-center g-5">

          {/* ==================================================
              LEFT CONTENT
          =================================================== */}

          <div className="col-lg-7">
            <motion.div
              className="projects-hero__content"
              initial={{
                opacity: 0,
                y: 35,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.75,
                ease: "easeOut",
              }}
            >

              {/* ==============================================
                  BADGE
              =============================================== */}

              <motion.div
                className="projects-hero__badge"
                initial={{
                  opacity: 0,
                  x: -20,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  delay: 0.15,
                  duration: 0.6,
                }}
              >
                <span
                  className="projects-hero__badge-icon"
                  aria-hidden="true"
                >
                  <Zap size={14} />
                </span>

                <span>Our Solar Projects</span>

                <span
                  className="projects-hero__badge-dot"
                  aria-hidden="true"
                />
              </motion.div>

              {/* ==============================================
                  MAIN HEADING
              =============================================== */}

              <motion.h1
                id="projects-hero-title"
                className="projects-hero__title"
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.25,
                  duration: 0.7,
                }}
              >
                Engineering a
                <span>Cleaner Energy Future.</span>
              </motion.h1>

              {/* ==============================================
                  DESCRIPTION
              =============================================== */}

              <motion.p
                className="projects-hero__description"
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.35,
                  duration: 0.7,
                }}
              >
                Discover our portfolio of professionally engineered
                residential, commercial, and industrial solar projects
                across the UAE. Every installation is designed for
                dependable performance, long-term savings, and a cleaner
                energy future.
              </motion.p>

              {/* ==============================================
                  TRUST POINTS
              =============================================== */}

              <motion.div
                className="projects-hero__trust"
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.45,
                  duration: 0.6,
                }}
              >
                <div className="projects-hero__trust-item">
                  <span className="projects-hero__trust-icon">
                    <CheckCircle2 size={16} />
                  </span>

                  <span>Engineered Solutions</span>
                </div>

                <div className="projects-hero__trust-item">
                  <span className="projects-hero__trust-icon">
                    <CheckCircle2 size={16} />
                  </span>

                  <span>Premium Equipment</span>
                </div>

                <div className="projects-hero__trust-item">
                  <span className="projects-hero__trust-icon">
                    <CheckCircle2 size={16} />
                  </span>

                  <span>UAE Projects</span>
                </div>
              </motion.div>

              {/* ==============================================
                  ACTION BUTTONS
              =============================================== */}

              <motion.div
                className="projects-hero__actions"
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.55,
                  duration: 0.6,
                }}
              >
                {/* PRIMARY CTA */}

                <motion.button
                  type="button"
                  className="projects-hero__btn projects-hero__btn--primary"
                  onClick={handleQuote}
                  whileHover={{
                    y: -3,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  aria-label="Start your solar project"
                >
                  <span>Start Your Project</span>

                  <span
                    className="projects-hero__btn-icon"
                    aria-hidden="true"
                  >
                    <ArrowRight size={17} />
                  </span>
                </motion.button>

                {/* SECONDARY CTA */}

                <motion.button
                  type="button"
                  className="projects-hero__btn projects-hero__btn--secondary"
                  onClick={handleServices}
                  whileHover={{
                    y: -3,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  aria-label="Explore solar services"
                >
                  <span
                    className="projects-hero__btn-icon"
                    aria-hidden="true"
                  >
                    <PlayCircle size={18} />
                  </span>

                  <span>Explore Services</span>
                </motion.button>
              </motion.div>

              {/* ==============================================
                  LOCATION / TRUST META
              =============================================== */}

              <motion.div
                className="projects-hero__meta"
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  delay: 0.7,
                  duration: 0.6,
                }}
              >
                <div className="projects-hero__meta-item">
                  <MapPin size={15} />

                  <span>Dubai, UAE</span>
                </div>

                <span className="projects-hero__meta-divider" />

                <div className="projects-hero__meta-item">
                  <span className="projects-hero__meta-status" />

                  <span>Renewable Energy Projects</span>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* ==================================================
              RIGHT VISUAL
          =================================================== */}

          <div className="col-lg-5">
            <motion.div
              className="projects-hero__visual"
              initial={{
                opacity: 0,
                scale: 0.94,
                x: 30,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                x: 0,
              }}
              transition={{
                delay: 0.3,
                duration: 0.85,
                ease: "easeOut",
              }}
            >

              {/* ============================================
                  MAIN IMAGE CARD
              ============================================= */}

              <motion.div
                className="projects-hero__image-card"
                whileHover={{
                  y: -4,
                }}
                transition={{
                  duration: 0.35,
                }}
              >

                {/* IMAGE */}

                <img
                  src={projectsHeroImage}
                  alt="Solar panels installed on a modern building in Dubai"
                  className="projects-hero__image"
                />

                {/* IMAGE OVERLAY */}

                <div
                  className="projects-hero__image-overlay"
                  aria-hidden="true"
                />

                {/* ==========================================
                    TOP IMAGE LABEL
                =========================================== */}

                <div className="projects-hero__image-label">
                  <div className="projects-hero__image-label-left">
                    <span className="projects-hero__image-label-icon">
                      <Zap size={13} />
                    </span>

                    <span>UAE Solar Portfolio</span>
                  </div>

                  <div className="projects-hero__image-status">
                    <span />
                    <span>Active</span>
                  </div>
                </div>

                {/* ==========================================
                    BOTTOM PROJECT CARD
                =========================================== */}

                <div className="projects-hero__project-card">

                  <div className="projects-hero__project-content">
                    <small>Featured Project</small>

                    <h2>Commercial Solar</h2>

                    <p>
                      High-performance renewable energy system
                    </p>
                  </div>

                  <button
                    type="button"
                    className="projects-hero__project-arrow"
                    onClick={handleQuote}
                    aria-label="Start a commercial solar project"
                  >
                    <ArrowRight size={18} />
                  </button>
                </div>
              </motion.div>

              {/* ============================================
                  FLOATING STAT — TOP
              ============================================= */}

              <motion.div
                className="projects-hero__floating-card projects-hero__floating-card--top"
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="projects-hero__floating-icon">
                  <Zap size={16} />
                </div>

                <div>
                  <strong>125+</strong>

                  <span>MW Installed</span>
                </div>
              </motion.div>

              {/* ============================================
                  FLOATING STAT — BOTTOM
              ============================================= */}

              <motion.div
                className="projects-hero__floating-card projects-hero__floating-card--bottom"
                animate={{
                  y: [0, 8, 0],
                }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="projects-hero__floating-icon">
                  <CheckCircle2 size={16} />
                </div>

                <div>
                  <strong>450+</strong>

                  <span>Projects Delivered</span>
                </div>
              </motion.div>

              {/* ============================================
                  DECORATIVE FRAME
              ============================================= */}

              <div
                className="projects-hero__frame"
                aria-hidden="true"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* =====================================================
          BOTTOM SCROLL INDICATOR
      ====================================================== */}

      <motion.div
        className="projects-hero__scroll"
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 1,
          duration: 0.8,
        }}
      >
        <span>Explore Our Work</span>

        <motion.span
          className="projects-hero__scroll-line"
          animate={{
            scaleY: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </section>
  );
};

export default ProjectsHero;