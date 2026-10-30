
// ==========================================================
// SHASAR SOLAR SYSTEM
// PROJECTS IMPACT
// ==========================================================

import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import {
  ArrowUpRight,
  BatteryCharging,
  CheckCircle2,
  Leaf,
  SunMedium,
  Zap,
} from "lucide-react";

import "./projectsImpact.css";

const ProjectsImpact = () => {
  // ========================================================
  // IMPACT DATA
  // ========================================================

  const impactStats = [
    {
      value: "125+",
      label: "MW Installed",
      description: "Clean energy capacity deployed across our projects.",
      icon: Zap,
    },
    {
      value: "400+",
      label: "Projects Delivered",
      description: "Residential, commercial and industrial installations.",
      icon: CheckCircle2,
    },
    {
      value: "10+",
      label: "Years Experience",
      description: "Engineering solar solutions for demanding environments.",
      icon: SunMedium,
    },
    {
      value: "100%",
      label: "Client Satisfaction",
      description: "Focused on dependable delivery and long-term value.",
      icon: BatteryCharging,
    },
  ];

  // ========================================================
  // PROJECT IMPACT POINTS
  // ========================================================

  const impactPoints = [
    "Engineered for UAE climate conditions",
    "High-performance solar technology",
    "Professional installation & commissioning",
    "Long-term energy performance",
  ];

  // ========================================================
  // ANIMATION VARIANTS
  // ========================================================

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },

    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      className="projects-impact"
      id="projects-impact"
      aria-labelledby="projects-impact-title"
    >
      {/* ==================================================
          BACKGROUND DECORATION
      ================================================== */}

      <div
        className="projects-impact__orb projects-impact__orb--one"
        aria-hidden="true"
      />

      <div
        className="projects-impact__orb projects-impact__orb--two"
        aria-hidden="true"
      />

      <div
        className="projects-impact__grid"
        aria-hidden="true"
      />

      <div className="container">
        {/* ==================================================
            SECTION HEADER
        ================================================== */}

        <motion.div
          className="projects-impact__header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.7,
            ease: "easeOut",
          }}
        >
          <div className="projects-impact__eyebrow">
            <span className="projects-impact__eyebrow-line" />

            <span>Our Impact</span>

            <span className="projects-impact__eyebrow-line" />
          </div>

          <h2
            id="projects-impact-title"
            className="projects-impact__title"
          >
            Turning Solar Projects Into
            <span> Measurable Impact.</span>
          </h2>

          <p className="projects-impact__intro">
            Every project we deliver is designed to create lasting value —
            from smarter energy generation to stronger operational
            performance and a cleaner future.
          </p>
        </motion.div>

        {/* ==================================================
            MAIN IMPACT PANEL
        ================================================== */}

        <motion.div
          className="projects-impact__panel"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
        >
          <div className="row align-items-center g-4 g-xl-5">
            {/* ==================================================
                LEFT CONTENT
            ================================================== */}

            <div className="col-lg-5">
              <motion.div
                className="projects-impact__content"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                transition={{
                  duration: 0.7,
                  delay: 0.1,
                }}
              >
                {/* Icon */}

                <div className="projects-impact__main-icon">
                  <SunMedium
                    size={27}
                    strokeWidth={1.8}
                  />
                </div>

                <span className="projects-impact__content-label">
                  BUILT FOR LONG-TERM VALUE
                </span>

                <h3 className="projects-impact__content-title">
                  Solar engineering that delivers beyond installation.
                </h3>

                <p className="projects-impact__content-description">
                  From initial engineering to final commissioning, our
                  approach combines performance, reliability and
                  intelligent energy design to create solar systems built
                  for the long run.
                </p>

                {/* Impact Points */}

                <div className="projects-impact__points">
                  {impactPoints.map((point, index) => (
                    <motion.div
                      className="projects-impact__point"
                      key={point}
                      initial={{
                        opacity: 0,
                        x: -15,
                      }}
                      whileInView={{
                        opacity: 1,
                        x: 0,
                      }}
                      viewport={{
                        once: true,
                      }}
                      transition={{
                        duration: 0.4,
                        delay: 0.3 + index * 0.08,
                      }}
                    >
                      <span className="projects-impact__point-icon">
                        <CheckCircle2
                          size={15}
                          strokeWidth={2.2}
                        />
                      </span>

                      <span>{point}</span>
                    </motion.div>
                  ))}
                </div>

                {/* CTA */}

                <motion.div
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    to="/contact"
                    className="projects-impact__cta"
                  >
                    <span>Build Your Solar Future</span>

                    <span className="projects-impact__cta-icon">
                      <ArrowUpRight size={17} />
                    </span>
                  </Link>
                </motion.div>
              </motion.div>
            </div>

            {/* ==================================================
                RIGHT STATISTICS
            ================================================== */}

            <div className="col-lg-7">
              <motion.div
                className="projects-impact__stats"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
              >
                {impactStats.map((stat) => {
                  const Icon = stat.icon;

                  return (
                    <motion.div
                      className="projects-impact__stat"
                      variants={itemVariants}
                      key={stat.label}
                    >
                      {/* Top */}

                      <div className="projects-impact__stat-top">
                        <div className="projects-impact__stat-icon">
                          <Icon
                            size={20}
                            strokeWidth={1.9}
                          />
                        </div>

                        <span className="projects-impact__stat-index">
                          0{impactStats.indexOf(stat) + 1}
                        </span>
                      </div>

                      {/* Value */}

                      <div className="projects-impact__stat-value">
                        {stat.value}
                      </div>

                      {/* Label */}

                      <h4 className="projects-impact__stat-title">
                        {stat.label}
                      </h4>

                      {/* Description */}

                      <p className="projects-impact__stat-description">
                        {stat.description}
                      </p>

                      {/* Bottom Line */}

                      <div className="projects-impact__stat-line">
                        <span />
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </div>

          {/* ==================================================
              BOTTOM IMPACT STRIP
          ================================================== */}

          <div className="projects-impact__bottom">
            <div className="projects-impact__bottom-item">
              <Leaf
                size={18}
                strokeWidth={1.8}
              />

              <span>
                Cleaner energy generation
              </span>
            </div>

            <div className="projects-impact__bottom-divider" />

            <div className="projects-impact__bottom-item">
              <Zap
                size={18}
                strokeWidth={1.8}
              />

              <span>
                Smarter energy performance
              </span>
            </div>

            <div className="projects-impact__bottom-divider" />

            <div className="projects-impact__bottom-item">
              <SunMedium
                size={18}
                strokeWidth={1.8}
              />

              <span>
                Sustainable solar infrastructure
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsImpact;
