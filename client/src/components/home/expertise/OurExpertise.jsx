import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import ServiceCard from "./ServiceCard";
import servicesData from "../../../data/servicesData";

import "./expertise.css";

const OurExpertise = () => {
  const navigate = useNavigate();

  // Show only first four services on Home page
  const featuredServices = servicesData.slice(0, 4);

  return (
    <section className="expertise-section">
      <div className="container">

        {/* Section Header */}

        <motion.div
          className="row justify-content-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="col-lg-8 text-center">

            <span className="expertise-badge">

              Our Expertise

            </span>

            <h2 className="expertise-title">

              Premium Solar Solutions
              <br />
              For Every Energy Need

            </h2>

            <p className="expertise-description">

              We design, install, and maintain premium solar energy
              solutions for residential, commercial, and industrial
              properties with maximum efficiency and long-term
              performance.

            </p>

          </div>
        </motion.div>

        {/* Cards */}

        <div className="row g-4 expertise-grid">

          {featuredServices.map((service, index) => (

            <motion.div
              key={service.id}
              className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.12,
              }}
            >
              <ServiceCard service={service} />
            </motion.div>

          ))}

        </div>

        {/* Button */}

        <motion.div
          className="text-center expertise-btn-wrapper"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >

          <button
            className="view-services-btn"
            onClick={() => navigate("/services")}
          >
            View All Services

            <ArrowRight
              size={18}
              className="ms-2"
            />

          </button>

        </motion.div>

      </div>
    </section>
  );
};

export default OurExpertise;