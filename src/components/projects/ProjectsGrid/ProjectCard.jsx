// ==========================================================
// SHASAR SOLAR SYSTEM
// PROJECT CARD
// ==========================================================

import { motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  CalendarDays,
  MapPin,
  Zap,
} from "lucide-react";

const ProjectCard = ({ project }) => {
  return (
    <motion.article
      className="projects-grid__card"
      whileHover={{
        y: -8,
      }}
      transition={{
        duration: 0.3,
        ease: "easeOut",
      }}
    >
      {/* ==================================================
          IMAGE
      ================================================== */}

      <div className="projects-grid__image-wrapper">
        <img
          src={project.image}
          alt={`${project.title} - ${project.location}`}
          className="projects-grid__image"
          loading="lazy"
        />

        <div
          className="projects-grid__image-overlay"
          aria-hidden="true"
        />

        {/* Project Type */}

        <span className="projects-grid__type-badge">
          {project.type}
        </span>

        {/* Status */}

        {project.status && (
          <span className="projects-grid__status-badge">
            <span className="projects-grid__status-dot" />

            {project.status}
          </span>
        )}

        {/* Image bottom information */}

        <div className="projects-grid__image-bottom">
          <span>Solar Project</span>

          <span className="projects-grid__image-year">
            {project.year}
          </span>
        </div>
      </div>

      {/* ==================================================
          CARD CONTENT
      ================================================== */}

      <div className="projects-grid__body">
        {/* Title */}

        <h3 className="projects-grid__card-title">
          {project.title}
        </h3>

        {/* Description */}

        <p className="projects-grid__card-description">
          {project.description}
        </p>

        {/* ==================================================
            PROJECT META
        ================================================== */}

        <div className="projects-grid__meta">
          {/* Location */}

          <div className="projects-grid__meta-item">
            <span className="projects-grid__meta-icon">
              <MapPin size={15} strokeWidth={2.2} />
            </span>

            <div>
              <small>Location</small>
              <strong>{project.location}</strong>
            </div>
          </div>

          {/* Capacity */}

          <div className="projects-grid__meta-item">
            <span className="projects-grid__meta-icon">
              <Zap size={15} strokeWidth={2.2} />
            </span>

            <div>
              <small>Capacity</small>
              <strong>{project.capacity}</strong>
            </div>
          </div>

          {/* Type */}

          <div className="projects-grid__meta-item">
            <span className="projects-grid__meta-icon">
              <Building2 size={15} strokeWidth={2.2} />
            </span>

            <div>
              <small>Type</small>
              <strong>{project.type}</strong>
            </div>
          </div>

          {/* Year */}

          <div className="projects-grid__meta-item">
            <span className="projects-grid__meta-icon">
              <CalendarDays size={15} strokeWidth={2.2} />
            </span>

            <div>
              <small>Year</small>
              <strong>{project.year}</strong>
            </div>
          </div>
        </div>

        {/* ==================================================
            FOOTER
        ================================================== */}

        <div className="projects-grid__footer">
          <div className="projects-grid__client">
            <span>Client</span>

            <strong>{project.client}</strong>
          </div>

          <button
            type="button"
            className="projects-grid__view-button"
            aria-label={`View details for ${project.title}`}
          >
            <span>View Details</span>

            <span className="projects-grid__view-icon">
              <ArrowRight size={16} />
            </span>
          </button>
        </div>
      </div>
    </motion.article>
  );
};

export default ProjectCard;