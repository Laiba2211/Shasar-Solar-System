import { motion } from "framer-motion";

import whyChooseServicesData from "../../../data/whyChooseServicesData";
import WhyChooseCard from "./WhyChooseCard";

import "./whyChooseServices.css";

const WhyChooseServices = () => {
  return (
    <section className="why-services-section">

      <div className="container">

        {/* Section Header */}

        <motion.div
          className="section-heading text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-badge">
            Why Choose Shasar Solar
          </span>

          <h2 className="section-title">
            Engineering Excellence You Can Trust
          </h2>

          <p className="section-description">
            Our experienced engineers, premium solar technology,
            and customer-first approach enable us to deliver reliable,
            efficient, and future-ready renewable energy solutions for
            residential, commercial, and industrial projects across the UAE.
          </p>

        </motion.div>

        {/* Cards */}

        <div className="row g-4">

          {whyChooseServicesData.map((item, index) => (
            <WhyChooseCard
              key={item.id}
              item={item}
              index={index}
            />
          ))}

        </div>

      </div>

    </section>
  );
};

export default WhyChooseServices;