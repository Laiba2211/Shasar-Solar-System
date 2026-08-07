import { motion } from "framer-motion";

import ServiceCard from "./ServiceCard";
import "./servicesGrid.css";
import { services } from "../../../data/servicesData";
const ServicesGrid = () => {
  return (
    <section
      id="services-grid"
      className="services-grid-section"
    >
      <div className="container">

        {/* ===========================
            Section Header
        ============================ */}

        <motion.div
          className="row justify-content-center text-center mb-5"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="col-lg-8">

            <span className="services-grid-badge">

              Complete Renewable Energy Solutions

            </span>

            <h2 className="services-grid-heading">

              Our Solar Services

            </h2>

            <p className="services-grid-description-text">

              We provide complete residential, commercial,
              industrial and engineering solar solutions across
              the UAE. From consultation and DEWA approvals to
              installation, maintenance and long-term support,
              our experienced team delivers reliable renewable
              energy solutions tailored to every project.

            </p>

          </div>
        </motion.div>

        {/* ===========================
            Services Grid
        ============================ */}

        <div className="row g-4">

          {services.map((service) => (

            <ServiceCard
              key={service.id}
              service={service}
            />

          ))}

        </div>

      </div>
    </section>
  );
};

export default ServicesGrid;