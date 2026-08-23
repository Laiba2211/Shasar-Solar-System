// ==========================================================
// SHASAR SOLAR SYSTEM
// PROJECTS GRID
// CONTINUOUS INFINITE MARQUEE
// ==========================================================

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import projectsData from "../../../data/projectsData";

import ProjectCard from "./ProjectCard";

import "./projectsGrid.css";

const ProjectsGrid = () => {
  return (
    <section
      className="projects-grid"
      id="featured-projects"
      aria-labelledby="projects-grid-title"
    >
      {/* ==================================================
          BACKGROUND DECORATION
      ================================================== */}

      <div
        className="projects-grid__glow projects-grid__glow--one"
        aria-hidden="true"
      />

      <div
        className="projects-grid__glow projects-grid__glow--two"
        aria-hidden="true"
      />

      <div className="container">
        {/* ==================================================
            HEADER
        ================================================== */}

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
            Explore selected residential, commercial, and industrial
            solar installations engineered to deliver reliable,
            efficient, and sustainable energy across the UAE.
          </p>
        </motion.div>
      </div>

      {/* ==================================================
          CONTINUOUS MARQUEE
      ================================================== */}

      <div
        className="projects-grid__marquee"
        aria-label="Featured solar projects"
      >
        <div className="projects-grid__track">
          {/* ==================================================
              GROUP ONE
          ================================================== */}

          <div className="projects-grid__group">
            {projectsData.map((project) => (
              <div
                className="projects-grid__slide"
                key={`first-${project.id}`}
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>

          {/* ==================================================
              GROUP TWO
              Exact duplicate for seamless looping
          ================================================== */}

          <div
            className="projects-grid__group"
            aria-hidden="true"
          >
            {projectsData.map((project) => (
              <div
                className="projects-grid__slide"
                key={`second-${project.id}`}
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ==================================================
          BOTTOM INFORMATION
      ================================================== */}

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