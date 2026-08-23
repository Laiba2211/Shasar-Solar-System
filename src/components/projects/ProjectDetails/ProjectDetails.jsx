// ==========================================================
// SHASAR SOLAR SYSTEM
// PROJECT DETAILS
// Phase 13.5
// ==========================================================

import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  MapPin,
  Zap,
  Building2,
  CircleCheck,
} from "lucide-react";

import "./projectDetails.css";

// ==========================================================
// PROJECT IMAGE
// Replace this file later with the client's original image.
// ==========================================================

import commercialProject from "../../../assets/images/projects/commercial-project.jpeg";

const ProjectDetails = () => {
  // ========================================================
  // PROJECT DATA
  // Keep this section clean.
  // Later this can be connected to projectsData.js.
  // ========================================================

  const project = {
    category: "Commercial Solar Engineering",

    title: "High-Performance Commercial Solar Installation",

    location: "Dubai, United Arab Emirates",

    capacity: "1.2 MW",

    projectType: "Commercial",

    status: "Successfully Delivered",

    image: commercialProject,

    description:
      "A professionally engineered solar energy solution designed to help a commercial facility reduce energy costs, improve operational efficiency, and transition toward reliable renewable power.",

    highlights: [
      "High-efficiency solar generation",
      "Engineered for UAE climate conditions",
      "Professional installation and commissioning",
      "Long-term performance optimization",
    ],
  };

  // ========================================================
  // ANIMATION VARIANTS
  // ========================================================

  const contentVariants = {
    hidden: {
      opacity: 0,
      x: 45,
    },

    visible: {
      opacity: 1,
      x: 0,

      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  const imageVariants = {
    hidden: {
      opacity: 0,
      x: -45,
      scale: 0.97,
    },

    visible: {
      opacity: 1,
      x: 0,
      scale: 1,

      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const highlightsContainer = {
    hidden: {},

    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.25,
      },
    },
  };

  const highlightItem = {
    hidden: {
      opacity: 0,
      x: -12,
    },

    visible: {
      opacity: 1,
      x: 0,

      transition: {
        duration: 0.35,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      className="project-details"
      id="project-details"
      aria-labelledby="project-details-title"
    >
      {/* ==================================================
          BACKGROUND DECORATION
      ================================================== */}

      <div
        className="project-details__glow project-details__glow--one"
        aria-hidden="true"
      />

      <div
        className="project-details__glow project-details__glow--two"
        aria-hidden="true"
      />

      <div className="container">
        {/* ==================================================
            SECTION HEADER
        ================================================== */}

        <motion.div
          className="project-details__header"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <div className="project-details__eyebrow">
            <span className="project-details__eyebrow-line" />
            <span>Project Excellence</span>
            <span className="project-details__eyebrow-line" />
          </div>

          <h2
            id="project-details-title"
            className="project-details__heading"
          >
            Built for Performance.
            <span>Engineered for Impact.</span>
          </h2>

          <p className="project-details__intro">
            Explore how our solar engineering expertise transforms complex
            energy requirements into reliable, high-performance renewable
            energy systems across the UAE.
          </p>
        </motion.div>

        {/* ==================================================
            MAIN PROJECT CASE STUDY
        ================================================== */}

        <div className="row align-items-stretch g-4 g-xl-5">
          {/* ==================================================
              IMAGE
          ================================================== */}

          <div className="col-lg-6">
            <motion.div
              className="project-details__visual"
              variants={imageVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {/* Image */}

              <div className="project-details__image-wrapper">
                <img
                  src={project.image}
                  alt={`${project.title} in ${project.location}`}
                  className="project-details__image"
                  loading="lazy"
                />

                <div
                  className="project-details__image-overlay"
                  aria-hidden="true"
                />

                {/* Image badge */}

                <div className="project-details__image-badge">
                  <span className="project-details__status-dot" />

                  <span>{project.status}</span>
                </div>

                {/* Image bottom label */}

                <div className="project-details__image-caption">
                  <span>Featured Project</span>

                  <strong>{project.category}</strong>
                </div>
              </div>

              {/* Decorative frame */}

              <div
                className="project-details__frame"
                aria-hidden="true"
              />
            </motion.div>
          </div>

          {/* ==================================================
              CONTENT
          ================================================== */}

          <div className="col-lg-6">
            <motion.div
              className="project-details__content"
              variants={contentVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {/* Category */}

              <div className="project-details__category">
                <span />
                {project.category}
              </div>

              {/* Heading */}

              <h3 className="project-details__title">
                {project.title}
              </h3>

              {/* Description */}

              <p className="project-details__description">
                {project.description}
              </p>

              {/* ==================================================
                  PROJECT INFORMATION
              ================================================== */}

              <div className="project-details__meta">
                {/* Location */}

                <div className="project-details__meta-item">
                  <div className="project-details__meta-icon">
                    <MapPin size={17} strokeWidth={2} />
                  </div>

                  <div>
                    <span>Location</span>
                    <strong>{project.location}</strong>
                  </div>
                </div>

                {/* Capacity */}

                <div className="project-details__meta-item">
                  <div className="project-details__meta-icon">
                    <Zap size={17} strokeWidth={2} />
                  </div>

                  <div>
                    <span>System Capacity</span>
                    <strong>{project.capacity}</strong>
                  </div>
                </div>

                {/* Project Type */}

                <div className="project-details__meta-item">
                  <div className="project-details__meta-icon">
                    <Building2 size={17} strokeWidth={2} />
                  </div>

                  <div>
                    <span>Project Type</span>
                    <strong>{project.projectType}</strong>
                  </div>
                </div>

                {/* Status */}

                <div className="project-details__meta-item">
                  <div className="project-details__meta-icon">
                    <CircleCheck size={17} strokeWidth={2} />
                  </div>

                  <div>
                    <span>Project Status</span>
                    <strong>{project.status}</strong>
                  </div>
                </div>
              </div>

              {/* ==================================================
                  ENGINEERING HIGHLIGHTS
              ================================================== */}

              <div className="project-details__highlights">
                <h4>Engineering Highlights</h4>

                <motion.div
                  className="project-details__highlight-list"
                  variants={highlightsContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {project.highlights.map((highlight) => (
                    <motion.div
                      className="project-details__highlight"
                      variants={highlightItem}
                      key={highlight}
                    >
                      <CheckCircle2
                        size={17}
                        strokeWidth={2}
                        aria-hidden="true"
                      />

                      <span>{highlight}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* ==================================================
                  CTA
              ================================================== */}

              <motion.a
                href="#contact"
                className="project-details__button"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Discuss Your Project</span>

                <span className="project-details__button-icon">
                  <ArrowRight size={17} />
                </span>
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectDetails;