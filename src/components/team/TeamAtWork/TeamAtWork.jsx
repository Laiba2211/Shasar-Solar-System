// ==========================================================
// SHASAR SOLAR SYSTEM
// TEAM AT WORK
// Section 2 — Team Page
// ==========================================================

import { motion } from "framer-motion";
import { Play, ArrowUpRight } from "lucide-react";

import "./teamAtWork.css";

// ==========================================================
// CLIENT MEDIA
// ==========================================================

import batteryStorage from "../../../assets/images/team/work/battery-storage.mp4";
import installation from "../../../assets/images/team/work/installation-only.mp4";
import residentialSolar from "../../../assets/images/team/work/residential-solar.mp4";
import solarMaintenance from "../../../assets/images/team/work/solar-maintenance.mp4";
import zenith from "../../../assets/images/team/work/Zenith-installation.mp4";
import BetteryConnection from "../../../assets/images/team/work/BetteryConnection.mp4";
// ==========================================================
// TEAM WORK MEDIA
// ==========================================================

const teamWorkMedia = [
  {
    id: 1,
    type: "video",
    src: batteryStorage,
    name: "Battery Storage",
    alt: "Shasar Solar team working on battery storage installation",
  },

  {
    id: 2,
    type: "video",
    src: installation,
    name: "Solar Installation",
    alt: "Shasar Solar team installing solar panels",
  },

  {
    id: 3,
    type: "video",
    src: residentialSolar,
    name: "Residential Solar",
    alt: "Residential solar installation team at work",
  },

  {
    id: 4,
    type: "video",
    src: solarMaintenance,
    name: "Solar Maintenance",
    alt: "Shasar Solar technicians working on solar maintenance",
  },
  {
    id: 5,
    type: "video",
    src: zenith,
    name: "Zenith Installation",
    alt: "Shasar Solar team installing Zenith solar panels",
  },
  {
    id: 6,
    type: "video",
    src: BetteryConnection,
    name: "Battery Connection",
    alt: "Shasar Solar team connecting battery storage system",
  }
];

// ==========================================================
// DUPLICATE MEDIA
// Required for seamless infinite marquee.
// ==========================================================

const sliderMedia = [
  ...teamWorkMedia,
  ...teamWorkMedia,
];

// ==========================================================
// COMPONENT
// ==========================================================

const TeamAtWork = () => {
  return (
    <section
      className="team-at-work"
      id="team-at-work"
      aria-labelledby="team-at-work-title"
    >
      {/* ==================================================
          BACKGROUND DECORATION
      ================================================== */}

      <div
        className="team-at-work__glow team-at-work__glow--one"
        aria-hidden="true"
      />

      <div
        className="team-at-work__glow team-at-work__glow--two"
        aria-hidden="true"
      />

      <div className="container-fluid px-0">

        {/* ==================================================
            SECTION HEADER
        ================================================== */}

        <motion.div
          className="container"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{
            duration: 0.7,
            ease: "easeOut",
          }}
        >
          <div className="team-at-work__header">

            {/* Eyebrow */}

            <div className="team-at-work__eyebrow">
              <span className="team-at-work__eyebrow-line" />

              <span>Behind The Work</span>

              <span className="team-at-work__eyebrow-line" />
            </div>

            {/* Heading */}

            <h2
              id="team-at-work-title"
              className="team-at-work__title"
            >
              The People Behind
              <span> Every Solar Project.</span>
            </h2>

            {/* Description */}

            <p className="team-at-work__description">
              From installation and engineering to final commissioning,
              our team works together to deliver reliable solar solutions
              built for real-world performance.
            </p>
          </div>
        </motion.div>

        {/* ==================================================
            CONTINUOUS SLIDER
        ================================================== */}

        <div className="team-at-work__slider-wrapper">
          <div className="team-at-work__slider">
            <div className="team-at-work__track">

              {sliderMedia.map((item, index) => (
                <article
                  className="team-at-work__card"
                  key={`${item.id}-${index}`}
                >

                  {/* ==================================================
                      MEDIA
                  ================================================== */}

                  <div className="team-at-work__media">

                    {item.type === "video" ? (
                      <video
                        className="team-at-work__media-element"
                        src={item.src}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        aria-label={item.alt}
                      />
                    ) : (
                      <img
                        className="team-at-work__media-element"
                        src={item.src}
                        alt={item.alt}
                        loading="lazy"
                      />
                    )}

                    {/* ==================================================
                        MEDIA OVERLAY
                    ================================================== */}

                    <div
                      className="team-at-work__overlay"
                      aria-hidden="true"
                    />

                    {/* ==================================================
                        TOP BADGE
                    ================================================== */}

                    <div className="team-at-work__badge">

                      {item.type === "video" ? (
                        <>
                          <span className="team-at-work__badge-icon">
                            <Play
                              size={12}
                              fill="currentColor"
                            />
                          </span>

                          <span>Video</span>
                        </>
                      ) : (
                        <>
                          <span className="team-at-work__live-dot" />

                          <span>Team at Work</span>
                        </>
                      )}

                    </div>

                    {/* ==================================================
                        BOTTOM INFORMATION
                    ================================================== */}

                    <div className="team-at-work__card-footer">

                      <div>
                        <span className="team-at-work__card-label">
                          Shasar Solar System
                        </span>

                        {/* Dynamic video name */}
                        <h3>{item.name}</h3>
                      </div>

                      <span className="team-at-work__arrow">
                        <ArrowUpRight size={18} />
                      </span>

                    </div>

                  </div>
                </article>
              ))}

            </div>
          </div>
        </div>

        {/* ==================================================
            BOTTOM MESSAGE
        ================================================== */}

        <motion.div
          className="container"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.6,
            delay: 0.15,
          }}
        >
          <div className="team-at-work__bottom">

            <span className="team-at-work__bottom-line" />

            <span>
              Engineering. Installing. Delivering.
            </span>

            <span className="team-at-work__bottom-line" />

          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default TeamAtWork;