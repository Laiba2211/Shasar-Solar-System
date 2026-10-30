// ==========================================================
// SHASAR SOLAR SYSTEM
// PRICING HERO
// Phase 1
// ==========================================================

import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import "./pricingHero.css";

const PricingHero = () => {
  const navigate = useNavigate();

  const handleQuote = () => {
    navigate("/contact");
  };

  const handlePlans = () => {
    document
      .getElementById("pricing-plans")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };

  return (
    <section
      className="pricing-hero"
      id="pricing-hero"
      aria-labelledby="pricing-hero-title"
    >
      {/* ==================================================
          BACKGROUND DECORATION
      ================================================== */}

      <div
        className="pricing-hero__glow pricing-hero__glow--one"
        aria-hidden="true"
      />

      <div
        className="pricing-hero__glow pricing-hero__glow--two"
        aria-hidden="true"
      />

      <div
        className="pricing-hero__grid"
        aria-hidden="true"
      />

      <div className="container">
        <div className="row align-items-center g-5">

          {/* ==================================================
              LEFT CONTENT
          ================================================== */}

          <div className="col-lg-7">
            <motion.div
              className="pricing-hero__content"
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                ease: "easeOut",
              }}
            >

              {/* Premium Badge */}

              <motion.div
                className="pricing-hero__badge"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.1,
                  duration: 0.55,
                }}
              >
                <span className="pricing-hero__badge-icon">
                  <Sparkles size={14} />
                </span>

                <span>Flexible Solar Solutions</span>

                <span className="pricing-hero__badge-dot" />
              </motion.div>

              {/* Heading */}

              <motion.h1
                id="pricing-hero-title"
                className="pricing-hero__title"
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.2,
                  duration: 0.7,
                }}
              >
                Solar Plans Designed
                <span> Around Your Energy Needs</span>
              </motion.h1>

              {/* Description */}

              <motion.p
                className="pricing-hero__description"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.3,
                  duration: 0.7,
                }}
              >
                Choose a solar solution built around your property,
                energy requirements and long-term goals. From essential
                residential systems to complete commercial energy
                solutions, we deliver reliable solar performance across
                the UAE.
              </motion.p>

              {/* Trust Points */}

              <motion.div
                className="pricing-hero__trust"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.4,
                  duration: 0.6,
                }}
              >
                <div className="pricing-hero__trust-item">
                  <CheckCircle2 size={17} />
                  <span>Custom System Design</span>
                </div>

                <div className="pricing-hero__trust-item">
                  <CheckCircle2 size={17} />
                  <span>Professional Installation</span>
                </div>

                <div className="pricing-hero__trust-item">
                  <CheckCircle2 size={17} />
                  <span>UAE Solar Expertise</span>
                </div>
              </motion.div>

              {/* Actions */}

              <motion.div
                className="pricing-hero__actions"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.5,
                  duration: 0.6,
                }}
              >
                <button
                  type="button"
                  className="pricing-hero__button pricing-hero__button--primary"
                  onClick={handlePlans}
                >
                  <span>Explore Solar Plans</span>

                  <span className="pricing-hero__button-icon">
                    <ArrowRight size={17} />
                  </span>
                </button>

                <button
                  type="button"
                  className="pricing-hero__button pricing-hero__button--secondary"
                  onClick={handleQuote}
                >
                  <span>Get a Custom Quote</span>
                </button>
              </motion.div>

              {/* Small reassurance */}

              <motion.div
                className="pricing-hero__reassurance"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: 0.7,
                  duration: 0.6,
                }}
              >
                <ShieldCheck size={16} />

                <span>
                  Every system is tailored to your property's
                  energy requirements.
                </span>
              </motion.div>
            </motion.div>
          </div>

          {/* ==================================================
              RIGHT VISUAL
          ================================================== */}

          <div className="col-lg-5">
            <motion.div
              className="pricing-hero__visual"
              initial={{
                opacity: 0,
                scale: 0.94,
                x: 30,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                x: 0,
              }}
              transition={{
                delay: 0.25,
                duration: 0.8,
                ease: "easeOut",
              }}
            >

              {/* Main Pricing Visual */}

              <div className="pricing-hero__visual-card">

                {/* Top Label */}

                <div className="pricing-hero__visual-top">
                  <div>
                    <span>SMART ENERGY</span>
                    <strong>Solar Investment</strong>
                  </div>

                  <div className="pricing-hero__visual-icon">
                    <Zap size={20} />
                  </div>
                </div>

                {/* Energy Illustration */}

                <div className="pricing-hero__energy">

                  <div className="pricing-hero__sun">
                    <div className="pricing-hero__sun-core" />
                  </div>

                  <div className="pricing-hero__energy-ring pricing-hero__energy-ring--one" />
                  <div className="pricing-hero__energy-ring pricing-hero__energy-ring--two" />

                  <div className="pricing-hero__panel">
                    <div className="pricing-hero__panel-row">
                      <span />
                      <span />
                      <span />
                      <span />
                    </div>

                    <div className="pricing-hero__panel-row">
                      <span />
                      <span />
                      <span />
                      <span />
                    </div>

                    <div className="pricing-hero__panel-row">
                      <span />
                      <span />
                      <span />
                      <span />
                    </div>

                    <div className="pricing-hero__panel-frame" />
                  </div>
                </div>

                {/* Bottom Information */}

                <div className="pricing-hero__visual-footer">

                  <div className="pricing-hero__metric">
                    <span>Energy Focus</span>
                    <strong>Optimized</strong>
                  </div>

                  <div className="pricing-hero__metric">
                    <span>Solution</span>
                    <strong>Tailored</strong>
                  </div>

                  <div className="pricing-hero__metric">
                    <span>Support</span>
                    <strong>Reliable</strong>
                  </div>

                </div>
              </div>

              {/* Floating Card — Top */}

              <motion.div
                className="pricing-hero__floating pricing-hero__floating--top"
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="pricing-hero__floating-icon">
                  <Zap size={16} />
                </div>

                <div>
                  <strong>Smart</strong>
                  <span>Energy Planning</span>
                </div>
              </motion.div>

              {/* Floating Card — Bottom */}

              <motion.div
                className="pricing-hero__floating pricing-hero__floating--bottom"
                animate={{
                  y: [0, 8, 0],
                }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="pricing-hero__floating-check">
                  <CheckCircle2 size={16} />
                </div>

                <div>
                  <strong>Built for UAE</strong>
                  <span>Climate Conditions</span>
                </div>
              </motion.div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PricingHero;