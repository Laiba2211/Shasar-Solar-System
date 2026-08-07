import { motion } from "framer-motion";

import TestimonialSlider from "./TestimonialSlider";

import "./testimonials.css";

const Testimonials = () => {
  return (
    <section className="testimonials-section py-5">

      <div className="container">

        {/* ===========================
            Section Header
        ============================ */}

        <motion.div
          className="row justify-content-center mb-5"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >

          <div className="col-lg-8 text-center">

            {/* Badge */}

            <span className="testimonial-badge">

              Trusted by Homeowners & Businesses

            </span>

            {/* Heading */}

            <h2 className="testimonial-heading">

              Client Success Stories

            </h2>

            {/* Description */}

            <p className="testimonial-description">

              Discover why homeowners, villa owners, commercial businesses,
              and industrial clients across the UAE trust
              <strong> Shasar Solar</strong> for premium solar installation,
              renewable energy solutions, and long-term customer support.
              Every project reflects our commitment to quality,
              performance, and customer satisfaction.

            </p>

          </div>

        </motion.div>

        {/* ===========================
            Slider
        ============================ */}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{
            delay: 0.25,
            duration: 0.7,
          }}
          viewport={{ once: true }}
        >

          <TestimonialSlider />

        </motion.div>

      </div>

    </section>
  );
};

export default Testimonials;