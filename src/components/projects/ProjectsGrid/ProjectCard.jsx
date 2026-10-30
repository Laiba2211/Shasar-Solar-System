// ==========================================================
// SHASAR SOLAR SYSTEM
// PROJECT CARD
// DYNAMIC API VERSION
// IMAGE + VIDEO SUPPORT
// ==========================================================

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  CalendarDays,
  MapPin,
  Play,
  X,
  Zap,
} from "lucide-react";

// ==========================================================
// API BASE URL
// ==========================================================

const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:5000"
).replace(/\/$/, "");

// ==========================================================
// MEDIA URL HELPER
// ==========================================================

const getMediaUrl = (mediaPath) => {
  if (!mediaPath) {
    return "";
  }

  // Already a complete URL
  if (
    mediaPath.startsWith("http://") ||
    mediaPath.startsWith("https://")
  ) {
    return mediaPath;
  }

  // Backend uploaded media
  if (mediaPath.startsWith("/uploads/")) {
    return `${API_BASE_URL}${mediaPath}`;
  }

  // Existing frontend/public asset
  return mediaPath;
};

// ==========================================================
// VIDEO EXTENSION HELPER
// ==========================================================

const isVideoFile = (filePath) => {
  if (!filePath) {
    return false;
  }

  return /\.(mp4|webm|mov)$/i.test(filePath);
};

// ==========================================================
// VIDEO MIME TYPE HELPER
// ==========================================================

const getVideoMimeType = (filePath) => {
  if (!filePath) {
    return "video/mp4";
  }

  if (/\.webm$/i.test(filePath)) {
    return "video/webm";
  }

  if (/\.mov$/i.test(filePath)) {
    return "video/quicktime";
  }

  return "video/mp4";
};

// ==========================================================
// PROJECT CARD
// ==========================================================

const ProjectCard = ({ project }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [videoError, setVideoError] = useState(false);

  const imageUrl = getMediaUrl(project?.image);
  const videoUrl = getMediaUrl(project?.video);

  const hasVideo =
    Boolean(videoUrl) &&
    isVideoFile(project?.video);

  const hasImage = Boolean(imageUrl);

  const projectTitle =
    project?.title || "Solar Project";

  // ========================================================
  // VIEW DETAILS
  // ========================================================

  const handleViewDetails = () => {
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
  };

  // ========================================================
  // VIDEO ERROR
  // ========================================================

  const handleVideoError = () => {
    console.error(
      "Project video could not be loaded:",
      videoUrl
    );

    setVideoError(true);
  };

  // ========================================================
  // RESET VIDEO ERROR
  // ========================================================

  const usableVideo =
    hasVideo && !videoError;

  return (
    <>
      {/* ====================================================
          PROJECT CARD
      ==================================================== */}

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
            MEDIA
        ================================================== */}

        <div className="projects-grid__image-wrapper">
          {/* ==================================================
              VIDEO
              VIDEO TAKES PRIORITY WHEN AVAILABLE
          ================================================== */}

          {usableVideo ? (
            <video
              className="projects-grid__image projects-grid__video"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster={imageUrl || undefined}
              onError={handleVideoError}
              aria-label={`${projectTitle} project video`}
            >
              <source
                src={videoUrl}
                type={getVideoMimeType(project?.video)}
              />

              Your browser does not support
              the video element.
            </video>
          ) : hasImage ? (
            /* ==================================================
               IMAGE FALLBACK
            ================================================== */

            <img
              src={imageUrl}
              alt={`${projectTitle}${
                project?.location
                  ? ` - ${project.location}`
                  : ""
              }`}
              className="projects-grid__image"
              loading="lazy"
            />
          ) : (
            /* ==================================================
               EMPTY MEDIA
            ================================================== */

            <div
              className="projects-grid__image projects-grid__image--empty"
              aria-label="Project media unavailable"
            >
              <span>No Media Available</span>
            </div>
          )}

          {/* ==================================================
              MEDIA OVERLAY
          ================================================== */}

          <div
            className="projects-grid__image-overlay"
            aria-hidden="true"
          />

          {/* ==================================================
              PROJECT TYPE
          ================================================== */}

          {project?.type && (
            <span className="projects-grid__type-badge">
              {project.type}
            </span>
          )}

          {/* ==================================================
              VIDEO INDICATOR
          ================================================== */}

          {hasVideo && (
            <span
              className="projects-grid__video-badge"
              title="Project video available"
            >
              <Play
                size={13}
                fill="currentColor"
              />

              <span>Video</span>
            </span>
          )}

          {/* ==================================================
              BOTTOM MEDIA INFORMATION
          ================================================== */}

          <div className="projects-grid__image-bottom">
            <span>Solar Project</span>

            {project?.year && (
              <span className="projects-grid__image-year">
                {project.year}
              </span>
            )}
          </div>
        </div>

        {/* ==================================================
            CARD CONTENT
        ================================================== */}

        <div className="projects-grid__body">
          {/* ==================================================
              TITLE
          ================================================== */}

          <h3 className="projects-grid__card-title">
            {projectTitle}
          </h3>

          {/* ==================================================
              DESCRIPTION
          ================================================== */}

          <p className="projects-grid__card-description">
            {project?.description ||
              "Solar energy project delivered by Shasar Solar System."}
          </p>

          {/* ==================================================
              PROJECT META
          ================================================== */}

          <div className="projects-grid__meta">
            {/* Location */}

            <div className="projects-grid__meta-item">
              <span className="projects-grid__meta-icon">
                <MapPin
                  size={15}
                  strokeWidth={2.2}
                />
              </span>

              <div>
                <small>Location</small>

                <strong>
                  {project?.location || "—"}
                </strong>
              </div>
            </div>

            {/* Capacity */}

            <div className="projects-grid__meta-item">
              <span className="projects-grid__meta-icon">
                <Zap
                  size={15}
                  strokeWidth={2.2}
                />
              </span>

              <div>
                <small>Capacity</small>

                <strong>
                  {project?.capacity || "—"}
                </strong>
              </div>
            </div>

            {/* Type */}

            <div className="projects-grid__meta-item">
              <span className="projects-grid__meta-icon">
                <Building2
                  size={15}
                  strokeWidth={2.2}
                />
              </span>

              <div>
                <small>Type</small>

                <strong>
                  {project?.type || "—"}
                </strong>
              </div>
            </div>

            {/* Year */}

            <div className="projects-grid__meta-item">
              <span className="projects-grid__meta-icon">
                <CalendarDays
                  size={15}
                  strokeWidth={2.2}
                />
              </span>

              <div>
                <small>Year</small>

                <strong>
                  {project?.year || "—"}
                </strong>
              </div>
            </div>
          </div>

          {/* ==================================================
              FOOTER
          ================================================== */}

          <div className="projects-grid__footer">
            <div className="projects-grid__client">
              <span>Project</span>

              <strong>
                {project?.type ||
                  "Solar Installation"}
              </strong>
            </div>

            <button
              type="button"
              className="projects-grid__view-button"
              onClick={handleViewDetails}
              aria-label={`View details for ${projectTitle}`}
            >
              <span>View Details</span>

              <span className="projects-grid__view-icon">
                <ArrowRight size={16} />
              </span>
            </button>
          </div>
        </div>
      </motion.article>

      {/* ====================================================
          PROJECT DETAILS MODAL
      ==================================================== */}

      {showDetails && (
        <div
          className="projects-grid__details-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-details-title"
          onClick={handleCloseDetails}
        >
          <motion.div
            className="projects-grid__details-modal"
            initial={{
              opacity: 0,
              scale: 0.96,
              y: 20,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            transition={{
              duration: 0.25,
              ease: "easeOut",
            }}
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            {/* ==================================================
                MODAL HEADER
            ================================================== */}

            <div className="projects-grid__details-header">
              <div>
                <span className="projects-grid__details-eyebrow">
                  Shasar Solar System
                </span>

                <h3
                  id="project-details-title"
                  className="projects-grid__details-title"
                >
                  {projectTitle}
                </h3>
              </div>

              <button
                type="button"
                className="projects-grid__details-close"
                onClick={handleCloseDetails}
                aria-label="Close project details"
              >
                <X size={20} />
              </button>
            </div>

            {/* ==================================================
                MODAL MEDIA
            ================================================== */}

            <div className="projects-grid__details-media">
              {hasVideo ? (
                <video
                  className="projects-grid__details-video"
                  controls
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  poster={imageUrl || undefined}
                  onError={handleVideoError}
                >
                  <source
                    src={videoUrl}
                    type={getVideoMimeType(
                      project?.video
                    )}
                  />

                  Your browser does not support
                  the video element.
                </video>
              ) : imageUrl ? (
                <img
                  src={imageUrl}
                  alt={projectTitle}
                  className="projects-grid__details-image"
                />
              ) : (
                <div className="projects-grid__details-media-empty">
                  No project media available.
                </div>
              )}
            </div>

            {/* ==================================================
                MODAL CONTENT
            ================================================== */}

            <div className="projects-grid__details-content">
              <p className="projects-grid__details-description">
                {project?.description ||
                  "No project description available."}
              </p>

              {/* Project Information */}

              <div className="projects-grid__details-grid">
                <div className="projects-grid__details-item">
                  <span>Project Type</span>

                  <strong>
                    {project?.type || "—"}
                  </strong>
                </div>

                <div className="projects-grid__details-item">
                  <span>Location</span>

                  <strong>
                    {project?.location || "—"}
                  </strong>
                </div>

                <div className="projects-grid__details-item">
                  <span>System Capacity</span>

                  <strong>
                    {project?.capacity || "—"}
                  </strong>
                </div>

                <div className="projects-grid__details-item">
                  <span>Completion Year</span>

                  <strong>
                    {project?.year || "—"}
                  </strong>
                </div>
              </div>
            </div>

            {/* ==================================================
                MODAL FOOTER
            ================================================== */}

            <div className="projects-grid__details-footer">
              <span>
                Solar Project by Shasar Solar
              </span>

              <button
                type="button"
                className="projects-grid__details-action"
                onClick={handleCloseDetails}
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default ProjectCard;