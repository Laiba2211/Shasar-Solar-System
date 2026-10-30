// ==========================================================
// SHASAR SOLAR SYSTEM
// PROJECTS GRID
// CONTINUOUS INFINITE MARQUEE
// DYNAMIC API VERSION
// ==========================================================

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  RefreshCw,
  FolderOpen,
} from "lucide-react";

import ProjectCard from "./projectCard";

import "./projectsGrid.css";

// ==========================================================
// API CONFIGURATION
// ==========================================================

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const API_URL = `${API_BASE_URL.replace(/\/$/, "")}/api/projects`;


// ==========================================================
// PROJECTS GRID
// ==========================================================

const ProjectsGrid = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ========================================================
  // FETCH PROJECTS
  // ========================================================

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);

      const result = await response.json().catch(() => null);

      if (!response.ok || !result?.success) {
        throw new Error(
          result?.message ||
            "Unable to fetch projects."
        );
      }

      // ----------------------------------------------------
      // PUBLIC API ALREADY RETURNS ACTIVE PROJECTS.
      // FILTER AGAIN AS A SAFETY LAYER.
      // ----------------------------------------------------

      const activeProjects = Array.isArray(result.data)
        ? result.data
            .filter(
              (project) =>
                project &&
                project.isActive === true
            )
            .sort(
              (a, b) =>
                Number(a.displayOrder || 0) -
                  Number(b.displayOrder || 0) ||
                new Date(b.createdAt || 0) -
                  new Date(a.createdAt || 0)
            )
        : [];

      setProjects(activeProjects);
    } catch (error) {
      console.error(
        "Fetch public projects error:",
        error
      );

      setError(
        error?.message ||
          "Unable to load projects at the moment."
      );

      setProjects([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // ========================================================
  // INITIAL LOAD
  // ========================================================

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // ========================================================
  // SECTION HEADER
  // ========================================================

  const renderHeader = () => (
    <motion.div
      className="projects-grid__header"
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
        ease: "easeOut",
      }}
    >
      <div className="projects-grid__eyebrow">
        <span className="projects-grid__eyebrow-line" />

        <span>Featured Projects</span>

        <span className="projects-grid__eyebrow-line" />
      </div>

      <h2
        id="projects-grid-title"
        className="projects-grid__title"
      >
        Engineering Solar.
        <span> Powering Progress.</span>
      </h2>

      <p className="projects-grid__description">
        Explore selected residential, commercial,
        industrial, and agricultural solar installations
        engineered to deliver reliable, efficient, and
        sustainable energy across the UAE.
      </p>
    </motion.div>
  );

  // ========================================================
  // LOADING STATE
  // ========================================================

  if (loading) {
    return (
      <section
        className="projects-grid"
        id="featured-projects"
        aria-labelledby="projects-grid-title"
      >
        <div
          className="projects-grid__glow projects-grid__glow--one"
          aria-hidden="true"
        />

        <div
          className="projects-grid__glow projects-grid__glow--two"
          aria-hidden="true"
        />

        <div className="container">
          {renderHeader()}

          <div className="projects-grid__state">
            <RefreshCw
              size={22}
              className="projects-grid__state-icon projects-grid__state-icon--spin"
            />

            <span>Loading projects...</span>
          </div>
        </div>
      </section>
    );
  }

  // ========================================================
  // EMPTY STATE
  // ========================================================

  const showEmptyState =
    !error && projects.length === 0;

  // ========================================================
  // MAIN RENDER
  // ========================================================

  return (
    <section
      className="projects-grid"
      id="featured-projects"
      aria-labelledby="projects-grid-title"
    >
      {/* ====================================================
          BACKGROUND GLOWS
      ==================================================== */}

      <div
        className="projects-grid__glow projects-grid__glow--one"
        aria-hidden="true"
      />

      <div
        className="projects-grid__glow projects-grid__glow--two"
        aria-hidden="true"
      />

      {/* ====================================================
          HEADER
      ==================================================== */}

      <div className="container">
        {renderHeader()}
      </div>

      {/* ====================================================
          ERROR STATE
      ==================================================== */}

      {error && (
        <div className="container">
          <div
            className="projects-grid__state projects-grid__state--error"
            role="alert"
          >
            <RefreshCw size={20} />

            <span>
              Unable to load projects at the moment.
            </span>

            <button
              type="button"
              className="projects-grid__retry"
              onClick={fetchProjects}
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      {/* ====================================================
          EMPTY STATE
      ==================================================== */}

      {showEmptyState && (
        <div className="container">
          <div className="projects-grid__state">
            <FolderOpen
              size={24}
              className="projects-grid__state-icon"
            />

            <span>
              No featured projects available at the
              moment.
            </span>
          </div>
        </div>
      )}

      {/* ====================================================
          INFINITE MARQUEE
      ==================================================== */}

      {projects.length > 0 && (
        <div
          className="projects-grid__marquee"
          aria-label="Featured solar projects"
        >
          <div className="projects-grid__track">

            {/* ==================================================
                GROUP ONE
            ================================================== */}

            <div className="projects-grid__group">
              {projects.map((project, index) => {
                const projectId =
                  project._id ||
                  project.id ||
                  `project-${index}`;

                return (
                  <div
                    className="projects-grid__slide"
                    key={`first-${projectId}`}
                  >
                    <ProjectCard project={project} />
                  </div>
                );
              })}
            </div>

            {/* ==================================================
                GROUP TWO
                EXACT DUPLICATE FOR SEAMLESS LOOP
            ================================================== */}

            <div
              className="projects-grid__group"
              aria-hidden="true"
            >
              {projects.map((project, index) => {
                const projectId =
                  project._id ||
                  project.id ||
                  `project-${index}`;

                return (
                  <div
                    className="projects-grid__slide"
                    key={`second-${projectId}`}
                  >
                    <ProjectCard project={project} />
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      )}

      {/* ====================================================
          BOTTOM
      ==================================================== */}

      <div className="container">
        <div className="projects-grid__bottom">

          <div className="projects-grid__bottom-line">
            <span />
          </div>

          <div className="projects-grid__bottom-content">
            <span>
              Explore our renewable energy portfolio
            </span>

            <ArrowRight size={16} />
          </div>

        </div>
      </div>
    </section>
  );
};

export default ProjectsGrid;