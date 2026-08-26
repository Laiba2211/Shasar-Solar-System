import { motion } from "framer-motion";

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

const installations = [
    {
        id: 0,
        image: team02,
        alt: "Shasar Solar team working on a solar installation project",
    },
    {
    id: 1,
    image: agriculturalSolar,
    alt: "Client solar installation project",
  },
  
  {
    id: 2,
    image: commercialSolar,
    alt: "Commercial solar installation",
  },
  {
    id: 3,
    image: zenithTeam04,
    alt: "Solar panels installed for a client",
  },
  {
    id: 4,
    image: evChanging,
    alt: "Completed renewable energy project",
  },
  {
    id: 5,
    image: zenithTeam05,
    alt: "Industrial solar installation",
  },
  {
    id: 6,
    image: residentialSolar,
    alt: "Residential solar installation",
  },
  {
    id: 7,
    image: zenithTeam02,
    alt: "Solar carport installation",
  },
  
  {
    id: 8,
    image: solardesign,
    alt: "Solar panel design consultation",
  },
  {
    id: 9,
    image: zenithTeam01,
    alt: "Zenith solar installation project",
  },
  {
    id: 10,
    image: solarCarports,
    alt: "Zenith solar installation project",
  },
  {
    id: 11,
    image: zenithTeam03,
    alt: "Zenith solar installation project",
  },
  {
    id: 12,
    image: zenithTeam04,
    alt: "Zenith solar installation project",
  },
  {id: 13,
    image: industrialSolar,
    alt: "Zenith solar installation project",
  },
  {
    id: 14,
    image: zenithTeam06,
    alt: "Zenith solar installation project",
  },
  {
    id: 15,
    image: zenithTeam07,
    alt: "Zenith solar installation project",
  },
];

const ClientInstallations = () => {
  /*
   * Duplicate the projects to create
   * a seamless continuous marquee.
   */
  const sliderItems = [...installations, ...installations];

  return (
    <section
      className="client-installations"
      id="client-installations"
      aria-labelledby="client-installations-title"
    >
      {/* ================================================
          SECTION HEADER
      ================================================= */}

      <div className="container">
        <motion.div
          className="client-installations__header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <span className="client-installations__eyebrow">
            Our Work
          </span>

          <h2 id="client-installations-title">
            Client Solar
            <span> Installations</span>
          </h2>

          <p>
            A visual showcase of solar installations completed for our
            clients.
          </p>
        </motion.div>
      </div>

      {/* ================================================
          CONTINUOUS IMAGE SLIDER
      ================================================= */}

      <div className="client-installations__slider">
        <div className="client-installations__track">
          {sliderItems.map((project, index) => (
            <div
              className="client-installation-card"
              key={`${project.id}-${index}`}
            >
              <div className="client-installation-card__image">
                <img
                  src={project.image}
                  alt={project.alt}
                  loading={index < 5 ? "eager" : "lazy"}
                />

                <div className="client-installation-card__overlay" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientInstallations;