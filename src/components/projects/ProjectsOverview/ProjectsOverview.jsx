
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Factory,
  Home,
  Layers3,
  Zap,
} from "lucide-react";

import "./projectsOverview.css";
import solarProjectImage from "../../../assets/images/services/Solarproject.jpeg";

const ProjectsOverview = () => {
  const stats = [
    {
      icon: Home,
      value: "400+",
      label: "Projects Delivered",
    },
    {
      icon: Zap,
      value: "125 MW",
      label: "Installed Capacity",
    },
    {
      icon: Factory,
      value: "10+",
      label: "Years Experience",
    },
    {
      icon: Layers3,
      value: "UAE",
      label: "Projects Across",
    },
  ];

  const highlights = [
    "Residential & luxury villa solar systems",
    "Commercial and industrial solar installations",
    "Energy-efficient renewable solutions",
    "Professional engineering and project execution",
  ];

  return (
    <section className="projects-overview">
      <div className="container">
        <div className="row align-items-center g-5">

          {/* =====================================================
              LEFT CONTENT
          ===================================================== */}
          <div className="col-lg-6">
            <motion.div
              className="projects-overview__content"
              initial={{ opacity: 0, x: -45 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.75,
                ease: "easeOut",
              }}
            >
              {/* Eyebrow */}
              <motion.div
                className="projects-overview__eyebrow"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <span className="projects-overview__eyebrow-line" />
                <span>OUR PROJECT PORTFOLIO</span>
              </motion.div>

              {/* Heading */}
              <h2 className="projects-overview__title">
                Engineering Solar Solutions
                <span> Built for Real-World Impact.</span>
              </h2>

              {/* Description */}
              <p className="projects-overview__description">
                From premium residential villas to large-scale commercial
                and industrial facilities, Shasar Solar delivers professionally
                engineered renewable energy projects across the UAE.
              </p>

              <p className="projects-overview__description projects-overview__description--secondary">
                Every project is developed around performance, reliability,
                aesthetics, safety, and long-term energy savings — combining
                advanced solar technology with experienced engineering and
                professional execution.
              </p>

              {/* Highlights */}
              <div className="projects-overview__highlights">
                {highlights.map((item, index) => (
                  <motion.div
                    className="projects-overview__highlight"
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.45,
                      delay: index * 0.08,
                    }}
                  >
                    <CheckCircle2 size={18} strokeWidth={2.2} />
                    <span>{item}</span>
                  </motion.div>
                ))}
              </div>

              {/* CTA - CONNECTED TO PROJECTS GRID */}
              <motion.a
                href="#featured-projects"
                className="projects-overview__button"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Explore Our Projects</span>

                <span className="projects-overview__button-icon">
                  <ArrowRight size={18} />
                </span>
              </motion.a>
            </motion.div>
          </div>

          {/* =====================================================
              RIGHT VISUAL
          ===================================================== */}
          <div className="col-lg-6">
            <motion.div
              className="projects-overview__visual"
              initial={{ opacity: 0, x: 45, scale: 0.97 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
              }}
            >
              {/* Main Image */}
              <div className="projects-overview__image-wrapper">
                <img
                  src={solarProjectImage}
                  alt="Shasar Solar project installation"
                  className="projects-overview__image"
                  loading="lazy"
                />

                <div className="projects-overview__image-overlay" />

                {/* Image Label */}
                <div className="projects-overview__image-label">
                  <span className="projects-overview__status-dot" />

                  <div>
                    <strong>Engineered for Performance</strong>
                    <small>Premium solar infrastructure</small>
                  </div>
                </div>
              </div>

              {/* Decorative Frame */}
              <div className="projects-overview__frame" />

              {/* Floating Experience Card */}
              <motion.div
                className="projects-overview__experience"
                animate={{
                  y: [0, -7, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <span className="projects-overview__experience-number">
                  10+
                </span>

                <div>
                  <strong>Years</strong>
                  <small>Solar Experience</small>
                </div>
              </motion.div>

              {/* Floating Capacity Card */}
              <motion.div
                className="projects-overview__capacity"
                animate={{
                  y: [0, 7, 0],
                }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="projects-overview__capacity-icon">
                  <Zap size={18} />
                </div>

                <div>
                  <strong>125 MW</strong>
                  <small>Installed Capacity</small>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* =====================================================
            PROJECT STATS
        ===================================================== */}
        <motion.div
          className="projects-overview__stats"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            duration: 0.7,
            delay: 0.15,
          }}
        >
          <div className="row g-0">
            {stats.map((stat, index) => {
              const Icon = stat.icon;

              return (
                <div
                  className="col-6 col-lg-3"
                  key={stat.label}
                >
                  <motion.div
                    className={`projects-overview__stat ${
                      index !== stats.length - 1
                        ? "projects-overview__stat--border"
                        : ""
                    }`}
                    whileHover={{ y: -4 }}
                  >
                    <div className="projects-overview__stat-icon">
                      <Icon size={20} strokeWidth={2} />
                    </div>

                    <div>
                      <strong>{stat.value}</strong>
                      <span>{stat.label}</span>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsOverview;
