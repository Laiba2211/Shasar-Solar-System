import { motion } from "framer-motion";
import { ArrowRight, PhoneCall, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

import "./servicesCTA.css";

const ServicesCTA = () => {
  const navigate = useNavigate();

  const handleQuote = () => {
    navigate("/contact");
  };

  const handleContact = () => {
    navigate("/contact");
  };

  return (
    <section
      className="services-final-cta section-padding"
      aria-labelledby="services-final-cta-title"
    >
      <div className="container">
        <motion.div
          className="services-final-cta-card"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {/* Decorative Elements */}
          <div
            className="services-final-cta-glow services-final-cta-glow-one"
            aria-hidden="true"
          />

          <div
            className="services-final-cta-glow services-final-cta-glow-two"
            aria-hidden="true"
          />

          <div className="row align-items-center g-4 position-relative">
            {/* =========================
                CTA CONTENT
            ========================== */}
            <div className="col-lg-8">
              <motion.div
                className="services-final-cta-content"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                {/* Badge */}
                <div className="services-final-cta-badge">
                  <Sparkles size={16} aria-hidden="true" />

                  <span>Start Your Solar Journey</span>
                </div>

                {/* Heading */}
                <h2 id="services-final-cta-title">
                  Ready to Switch to
                  <span> Smarter Solar Energy?</span>
                </h2>

                {/* Description */}
                <p>
                  From residential solar installations to large-scale
                  commercial and industrial projects, our team delivers
                  engineered renewable energy solutions designed around your
                  energy needs, property, and long-term goals.
                </p>

                <p className="services-final-cta-subtext">
                  Let our solar experts help you choose the right solution for
                  your property in Dubai and across the UAE.
                </p>
              </motion.div>
            </div>

            {/* =========================
                CTA ACTIONS
            ========================== */}
            <div className="col-lg-4">
              <motion.div
                className="services-final-cta-actions"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {/* Primary CTA */}
                <motion.button
                  type="button"
                  className="services-final-cta-primary"
                  onClick={handleQuote}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Request a Free Quote</span>

                  <ArrowRight size={18} aria-hidden="true" />
                </motion.button>

                {/* Secondary CTA */}
                <motion.button
                  type="button"
                  className="services-final-cta-secondary"
                  onClick={handleContact}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <PhoneCall size={17} aria-hidden="true" />

                  <span>Talk to Our Experts</span>
                </motion.button>

                <span className="services-final-cta-note">
                  No obligation • Professional consultation
                </span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesCTA;