import { motion } from "framer-motion";
import {
  ArrowDown,
  Award,
  Users,
  Zap,
} from "lucide-react";

import solarDesign from "../../../assets/images/team/installations/solar-design.jpeg";
import "./teamHero.css";

const TeamHero = () => {
  const scrollToTeam = () => {
    const section = document.getElementById("team-members");

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section className="team-hero" id="team-hero">

      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div
        className="team-hero__background"
        aria-hidden="true"
      >
        <img
          src={solarDesign}
          alt=""
          className="team-hero__background-image"
        />

        <div className="team-hero__overlay" />
      </div>

      {/* =====================================================
          DECORATIVE ELEMENTS
      ===================================================== */}

      <div
        className="team-hero__glow team-hero__glow--one"
        aria-hidden="true"
      />

      <div
        className="team-hero__glow team-hero__glow--two"
        aria-hidden="true"
      />

      <div
        className="team-hero__grid"
        aria-hidden="true"
      />

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div className="container">

        <div className="team-hero__content">

          {/* Eyebrow */}

          <motion.div
            className="team-hero__eyebrow"
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
            }}
          >
            <span className="team-hero__eyebrow-line" />

            <span>
              The People Behind the Power
            </span>

            <span className="team-hero__eyebrow-line" />
          </motion.div>

          {/* Heading */}

          <motion.h1
            className="team-hero__title"
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.1,
              ease: "easeOut",
            }}
          >
            Meet the minds
            <span> powering a cleaner future.</span>
          </motion.h1>

          {/* Description */}

          <motion.p
            className="team-hero__description"
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.25,
            }}
          >
            Behind every successful solar project is a team of
            engineers, designers, energy specialists and
            professionals working together to create smarter,
            cleaner and more reliable energy solutions across
            the UAE.
          </motion.p>

          {/* CTA */}

          <motion.div
            className="team-hero__action"
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
              delay: 0.4,
            }}
          >
            <button
              type="button"
              className="team-hero__button"
              onClick={scrollToTeam}
            >
              <span>Meet Our Team</span>

              <span className="team-hero__button-icon">
                <ArrowDown size={17} />
              </span>
            </button>
          </motion.div>

        </div>

        {/* =====================================================
            TEAM STATS
        ===================================================== */}

        <motion.div
          className="team-hero__stats"
          initial={{
            opacity: 0,
            y: 35,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            delay: 0.55,
          }}
        >

          {/* Stat 01 */}

          <div className="team-hero__stat">

            <div className="team-hero__stat-icon">
              <Users size={21} />
            </div>

            <div className="team-hero__stat-content">
              <strong>25+</strong>
              <span>Energy Professionals</span>
            </div>

          </div>

          {/* Divider */}

          <div className="team-hero__stat-divider" />

          {/* Stat 02 */}

          <div className="team-hero__stat">

            <div className="team-hero__stat-icon">
              <Zap size={21} />
            </div>

            <div className="team-hero__stat-content">
              <strong>125+ MW</strong>
              <span>Installed Capacity</span>
            </div>

          </div>

          {/* Divider */}

          <div className="team-hero__stat-divider" />

          {/* Stat 03 */}

          <div className="team-hero__stat">

            <div className="team-hero__stat-icon">
              <Award size={21} />
            </div>

            <div className="team-hero__stat-content">
              <strong>12+ Years</strong>
              <span>Industry Experience</span>
            </div>

          </div>

        </motion.div>
      </div>

      {/* =====================================================
          SCROLL INDICATOR
      ===================================================== */}

      <motion.div
        className="team-hero__scroll"
        animate={{
          y: [0, 7, 0],
        }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <span>Scroll to meet the team</span>

        <ArrowDown size={15} />
      </motion.div>

    </section>
  );
};

export default TeamHero;