import { motion } from "framer-motion";

import pricingPlans from "../../../data/pricingPlans";

import PricingCard from "./PricingCard";
import CleaningPricingTable from "./CleaningPricingTable";

import "./pricing.css";

const Pricing = () => {
  return (
    <section className="pricing-section py-5">

      <div className="container">

        {/* ===============================
            SECTION HEADER
        =============================== */}

        <motion.div
          className="text-center pricing-header mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >

          <span className="pricing-badge">
            Affordable Solar Plans
          </span>

          <h2 className="pricing-title mt-3">
            Choose the Right Solar Service Plan
          </h2>

          <p className="pricing-description mx-auto">
            Choose a professional solar maintenance plan designed for
            residential and commercial solar systems across the UAE.
            Our flexible maintenance packages include preventive
            inspections, solar panel cleaning, performance monitoring,
            technical support, and long-term system reliability.
          </p>

        </motion.div>

        {/* ===============================
            PRICING CARDS
        =============================== */}

        <div className="row g-4 justify-content-center">

          {pricingPlans.map((plan) => (

            <PricingCard
              key={plan.id}
              plan={plan}
            />

          ))}

        </div>

        {/* ===============================
            CLEANING PRICING TABLE
        =============================== */}

        <CleaningPricingTable />

        {/* ===============================
            DISCLAIMER
        =============================== */}

        <motion.div
          className="pricing-disclaimer text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >

          <p>
            <strong>Note:</strong> Prices shown are starting estimates.
            Final pricing may vary depending on system capacity,
            project complexity, site inspection, accessibility,
            equipment requirements, and customer-specific needs.
          </p>

        </motion.div>

      </div>

    </section>
  );
};

export default Pricing;