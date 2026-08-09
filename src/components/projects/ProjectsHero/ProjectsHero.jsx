import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, PlayCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

import "./projectsHero.css";

const ProjectsHero = () => {
  const navigate = useNavigate();

  const handleQuote = () => {
    navigate("/contact");
  };

  const handleServices = () => {
    navigate("/services");
  };

  return (
    <section className="projects-hero">
      {/* Background Decorative Elements */}
      <div className="projects-hero__glow projects-hero__glow--one" />
      <div className="projects-hero__glow projects-hero__glow--two" />

      <div className="container">
        <div className="row align-items-center g-5">

          {/* =========================
              LEFT CONTENT
          ========================== */}
          <div className="col-lg-7">

            <motion.div
              className="projects-hero__content"
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >

              {/* Badge */}
              <motion.div
                className="projects-hero__badge"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15, duration: 0.6 }}
              >
                <span className="projects-hero__badge-dot" />
                <span>Our Solar Projects</span>
              </motion.div>

              {/* Heading */}
              <motion.h1
                className="projects-hero__title"
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.7 }}
              >
                Engineering a
                <span> Cleaner Energy Future</span>
              </motion.h1>

              {/* Description */}
              <motion.p
                className="projects-hero__description"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.7 }}
              >
                Explore our portfolio of residential, commercial and
                industrial solar projects across the UAE. Every project is
                engineered for reliable performance, long-term savings and
                sustainable energy generation.
              </motion.p>

              {/* Trust Points */}
              <motion.div
                className="projects-hero__trust"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.6 }}
              >
                <div className="projects-hero__trust-item">
                  <CheckCircle2 size={17} />
                  <span>Engineered Solutions</span>
                </div>

                <div className="projects-hero__trust-item">
                  <CheckCircle2 size={17} />
                  <span>Premium Equipment</span>
                </div>

                <div className="projects-hero__trust-item">
                  <CheckCircle2 size={17} />
                  <span>UAE Projects</span>
                </div>
              </motion.div>

              {/* Buttons */}
              <motion.div
                className="projects-hero__actions"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.6 }}
              >
                <button
                  type="button"
                  className="projects-hero__btn projects-hero__btn--primary"
                  onClick={handleQuote}
                >
                  <span>Start Your Project</span>
                  <ArrowRight size={18} />
                </button>

                <button
                  type="button"
                  className="projects-hero__btn projects-hero__btn--secondary"
                  onClick={handleServices}
                >
                  <PlayCircle size={18} />
                  <span>Explore Services</span>
                </button>
              </motion.div>

            </motion.div>
          </div>

          {/* =========================
              RIGHT VISUAL
          ========================== */}
          <div className="col-lg-5">

            <motion.div
              className="projects-hero__visual"
              initial={{ opacity: 0, scale: 0.94, x: 30 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            >

              {/* Main Visual */}
              <div className="projects-hero__image-card">

                <div className="projects-hero__image-overlay" />

                <img
                  src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&auto=format&fit=crop&q=85"
                  alt="Solar panels installed on a modern building in Dubai"
                  className="projects-hero__image"
                />

                {/* Top Label */}
                <div className="projects-hero__image-label">
                  <span>UAE Solar Portfolio</span>
                  <span className="projects-hero__image-status">
                    <span />
                    Active
                  </span>
                </div>

                {/* Bottom Project Card */}
                <div className="projects-hero__project-card">

                  <div>
                    <small>Featured Project</small>

                    <h3>Commercial Solar</h3>

                    <p>
                      High-performance renewable energy system
                    </p>
                  </div>

                  <div className="projects-hero__project-arrow">
                    <ArrowRight size={18} />
                  </div>

                </div>

              </div>

              {/* Floating Stats */}
              <motion.div
                className="projects-hero__floating-card projects-hero__floating-card--top"
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <strong>125+</strong>
                <span>MW Installed</span>
              </motion.div>

              <motion.div
                className="projects-hero__floating-card projects-hero__floating-card--bottom"
                animate={{ y: [0, 8, 0] }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <strong>450+</strong>
                <span>Projects Delivered</span>
              </motion.div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ProjectsHero;