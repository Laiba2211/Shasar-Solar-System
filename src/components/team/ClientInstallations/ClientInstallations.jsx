
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Images,
  MoveUpRight,
} from "lucide-react";

import team02 from "../../../assets/images/team/installations/team-02.jpeg";
import agriculturalSolar from "../../../assets/images/team/installations/agricultural-solar.jpg";
import commercialSolar from "../../../assets/images/team/installations/commercial-solar.jpg";
import energyAudit from "../../../assets/images/team/installations/energy-audit.jpg";
import evChanging from "../../../assets/images/team/installations/ev-charging.jpg";
import industrialSolar from "../../../assets/images/team/installations/industrial-solar.jpeg";
import residentialSolar from "../../../assets/images/team/installations/residential-solar.jpg";
import solarCarports from "../../../assets/images/team/installations/solar-carports.jpeg";
import solardesign from "../../../assets/images/team/installations/solar-design.jpeg";
import zenithTeam01 from "../../../assets/images/team/installations/ZenithTeam01.jpeg";
import zenithTeam02 from "../../../assets/images/team/installations/ZenithTeam02.jpeg";
import zenithTeam03 from "../../../assets/images/team/installations/ZenithTeam03.jpeg";
import zenithTeam04 from "../../../assets/images/team/installations/ZenithTeam04.jpeg";
import zenithTeam05 from "../../../assets/images/team/installations/ZenithTeam05.jpeg";
import zenithTeam06 from "../../../assets/images/team/installations/ZenithTeam06.jpeg";
import zenithTeam07 from "../../../assets/images/team/installations/ZenithTeam07.jpeg";

import "./clientInstallations.css";

// ==========================================================
// INSTALLATION GALLERY DATA
// ==========================================================

const installations = [
  {
    id: 1,
    image: team02,
    alt: "Shasar Solar team working on a solar installation project",
    category: "Our Team",
    size: "large",
  },
  {
    id: 2,
    image: commercialSolar,
    alt: "Commercial solar installation",
    category: "Commercial Solar",
    size: "tall",
  },
  {
    id: 3,
    image: agriculturalSolar,
    alt: "Agricultural solar installation",
    category: "Agricultural Solar",
  },
  {
    id: 4,
    image: zenithTeam04,
    alt: "Solar installation project",
    category: "Installation Work",
  },
  {
    id: 5,
    image: evChanging,
    alt: "EV charging installation",
    category: "EV Charging",
    size: "tall",
  },
  {
    id: 6,
    image: zenithTeam05,
    alt: "Solar installation project",
    category: "Installation Work",
  },
  {
    id: 7,
    image: residentialSolar,
    alt: "Residential solar installation",
    category: "Residential Solar",
    size: "wide",
  },
  {
    id: 8,
    image: zenithTeam02,
    alt: "Solar project installation",
    category: "Installation Work",
  },
  {
    id: 9,
    image: solardesign,
    alt: "Solar system design work",
    category: "Solar Design",
  },
  {
    id: 10,
    image: zenithTeam01,
    alt: "Solar installation project",
    category: "Installation Work",
  },
  {
    id: 11,
    image: solarCarports,
    alt: "Solar carport installation",
    category: "Solar Carports",
    size: "wide",
  },
  {
    id: 12,
    image: zenithTeam03,
    alt: "Solar installation project",
    category: "Installation Work",
  },
  {
    id: 13,
    image: energyAudit,
    alt: "Solar energy audit and assessment",
    category: "Energy Audit",
  },
  {
    id: 14,
    image: industrialSolar,
    alt: "Industrial solar installation",
    category: "Industrial Solar",
    size: "tall",
  },
  {
    id: 15,
    image: zenithTeam06,
    alt: "Solar installation project",
    category: "Installation Work",
  },
  {
    id: 16,
    image: zenithTeam07,
    alt: "Solar installation project",
    category: "Installation Work",
  },
];

// ==========================================================
// COMPONENT
// ==========================================================

const ClientInstallations = () => {
  return (
    <section
      className="client-installations"
      id="client-installations"
      aria-labelledby="client-installations-title"
    >
      <div className="container">
        {/* SECTION INTRODUCTION */}

        <motion.div
          className="client-installations__intro"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
        >
          <div className="client-installations__intro-left">
            <span className="client-installations__eyebrow">
              <span className="client-installations__eyebrow-line" />
              OUR PROJECT PORTFOLIO
            </span>

            <h2 id="client-installations-title">
              Built on Expertise.
              <span>Powered by Solar.</span>
            </h2>
          </div>

          <div className="client-installations__intro-right">
            <p>
              Explore a selection of solar installations, technical
              work and energy solutions across different project
              environments.
            </p>

            <div className="client-installations__gallery-label">
              <Images size={17} />
              <span>INSTALLATION GALLERY</span>
            </div>
          </div>
        </motion.div>

        {/* PROJECT GALLERY */}

        <div className="client-installations__gallery">
          {installations.map((project, index) => (
            <motion.article
              key={project.id}
              className={`client-installations__item ${
                project.size
                  ? `client-installations__item--${project.size}`
                  : ""
              }`}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{
                duration: 0.55,
                delay: (index % 4) * 0.07,
              }}
            >
              <div className="client-installations__image-wrap">
                <img
                  src={project.image}
                  alt={project.alt}
                  loading={index < 4 ? "eager" : "lazy"}
                />

                <div className="client-installations__image-shade" />

                <div className="client-installations__image-content">
                  <span className="client-installations__category">
                    {project.category}
                  </span>

                  <span className="client-installations__image-arrow">
                    <ArrowUpRight size={19} />
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* GALLERY FOOTER */}

        <motion.div
          className="client-installations__footer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <div className="client-installations__footer-text">
            <span className="client-installations__footer-accent" />
            <p>
              Every project starts with understanding the property,
              its energy requirements and the right technical approach.
            </p>
          </div>

          <a
            href="/contact"
            className="client-installations__footer-link"
          >
            <span>Discuss Your Project</span>
            <MoveUpRight size={17} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ClientInstallations;
