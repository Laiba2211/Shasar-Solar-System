// ==========================================================
// SHASAR SOLAR SYSTEM
// PRICING COMPARISON
// Phase 3
// ==========================================================

import { motion } from "framer-motion";
import {
  Check,
  X,
  ShieldCheck,
  Zap,
  Activity,
  Wrench,
  ArrowRight,
  Sparkles,
} from "lucide-react";

import "./pricingComparison.css";

// ==========================================================
// COMPARISON DATA
// ==========================================================

const comparisonFeatures = [
  {
    name: "Solar system design",
    icon: Zap,
    essential: true,
    performance: true,
    enterprise: true,
  },
  {
    name: "Premium solar panels",
    icon: Sparkles,
    essential: true,
    performance: true,
    enterprise: true,
  },
  {
    name: "High-efficiency inverter",
    icon: Activity,
    essential: true,
    performance: true,
    enterprise: true,
  },
  {
    name: "Mounting & protection system",
    icon: ShieldCheck,
    essential: true,
    performance: true,
    enterprise: true,
  },
  {
    name: "DEWA documentation support",
    icon: ShieldCheck,
    essential: true,
    performance: true,
    enterprise: true,
  },
  {
    name: "Professional installation",
    icon: Wrench,
    essential: true,
    performance: true,
    enterprise: true,
  },
  {
    name: "System monitoring",
    icon: Activity,
    essential: false,
    performance: true,
    enterprise: true,
  },
  {
    name: "Performance reporting",
    icon: Activity,
    essential: false,
    performance: true,
    enterprise: true,
  },
  {
    name: "Preventive maintenance",
    icon: Wrench,
    essential: false,
    performance: true,
    enterprise: true,
  },
  {
    name: "Solar panel cleaning",
    icon: Sparkles,
    essential: false,
    performance: true,
    enterprise: true,
  },
  {
    name: "Priority technical support",
    icon: ShieldCheck,
    essential: false,
    performance: true,
    enterprise: true,
  },
  {
    name: "Advanced performance analysis",
    icon: Activity,
    essential: false,
    performance: false,
    enterprise: true,
  },
  {
    name: "Commercial & industrial engineering",
    icon: Zap,
    essential: false,
    performance: false,
    enterprise: true,
  },
  {
    name: "Custom energy strategy",
    icon: Sparkles,
    essential: false,
    performance: false,
    enterprise: true,
  },
  {
    name: "Dedicated project support",
    icon: ShieldCheck,
    essential: false,
    performance: false,
    enterprise: true,
  },
];

// ==========================================================
// PLAN DATA
// ==========================================================

const plans = [
  {
    key: "essential",
    name: "Essential",
    label: "For homes & small systems",
  },
  {
    key: "performance",
    name: "Performance",
    label: "For growing energy needs",
    recommended: true,
  },
  {
    key: "enterprise",
    name: "Enterprise",
    label: "For large-scale projects",
  },
];

// ==========================================================
// COMPONENT
// ==========================================================

const PricingComparison = () => {
  return (
    <section
      className="pricing-comparison"
      id="pricing-comparison"
      aria-labelledby="pricing-comparison-title"
    >
      {/* ==================================================
          BACKGROUND DECORATION
      ================================================== */}

      <div
        className="pricing-comparison__glow pricing-comparison__glow--one"
        aria-hidden="true"
      />

      <div
        className="pricing-comparison__glow pricing-comparison__glow--two"
        aria-hidden="true"
      />

      <div className="container">
        {/* ==================================================
            SECTION HEADER
        ================================================== */}

        <motion.div
          className="pricing-comparison__header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
        >
          <div className="pricing-comparison__eyebrow">
            <span className="pricing-comparison__eyebrow-line" />

            <span>Compare Your Solar Solution</span>

            <span className="pricing-comparison__eyebrow-line" />
          </div>

          <h2
            id="pricing-comparison-title"
            className="pricing-comparison__title"
          >
            Choose the right level of
            <span> solar performance.</span>
          </h2>

          <p className="pricing-comparison__intro">
            Compare what is included across our solar solutions and choose
            the level of engineering, monitoring and ongoing support that
            fits your property and energy requirements.
          </p>
        </motion.div>

        {/* ==================================================
            COMPARISON DESKTOP / TABLET
        ================================================== */}

        <motion.div
          className="pricing-comparison__table-wrap"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.75 }}
        >
          {/* ==================================================
              TABLE HEADER
          ================================================== */}

          <div className="pricing-comparison__table-head">
            <div className="pricing-comparison__feature-heading">
              <span>What&apos;s included</span>
              <small>Core system & service features</small>
            </div>

            {plans.map((plan) => (
              <div
                key={plan.key}
                className={`pricing-comparison__plan-heading ${
                  plan.recommended
                    ? "pricing-comparison__plan-heading--featured"
                    : ""
                }`}
              >
                {plan.recommended && (
                  <span className="pricing-comparison__recommended">
                    Recommended
                  </span>
                )}

                <strong>{plan.name}</strong>

                <span>{plan.label}</span>
              </div>
            ))}
          </div>

          {/* ==================================================
              FEATURES
          ================================================== */}

          <div className="pricing-comparison__rows">
            {comparisonFeatures.map((feature, index) => {
              const FeatureIcon = feature.icon;

              return (
                <motion.div
                  className="pricing-comparison__row"
                  key={feature.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{
                    duration: 0.35,
                    delay: Math.min(index * 0.025, 0.25),
                  }}
                >
                  {/* Feature */}

                  <div className="pricing-comparison__feature">
                    <span className="pricing-comparison__feature-icon">
                      <FeatureIcon size={16} strokeWidth={2} />
                    </span>

                    <span>{feature.name}</span>
                  </div>

                  {/* Essential */}

                  <ComparisonValue available={feature.essential} />

                  {/* Performance */}

                  <div className="pricing-comparison__cell pricing-comparison__cell--featured">
                    <ComparisonValue available={feature.performance} />
                  </div>

                  {/* Enterprise */}

                  <ComparisonValue available={feature.enterprise} />
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* ==================================================
            MOBILE COMPARISON
        ================================================== */}

        <div className="pricing-comparison__mobile">
          {plans.map((plan) => (
            <motion.article
              key={plan.key}
              className={`pricing-comparison__mobile-card ${
                plan.recommended
                  ? "pricing-comparison__mobile-card--featured"
                  : ""
              }`}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55 }}
            >
              {plan.recommended && (
                <div className="pricing-comparison__mobile-badge">
                  Recommended
                </div>
              )}

              <div className="pricing-comparison__mobile-head">
                <div>
                  <h3>{plan.name}</h3>
                  <p>{plan.label}</p>
                </div>

                <span className="pricing-comparison__mobile-icon">
                  <Zap size={18} />
                </span>
              </div>

              <div className="pricing-comparison__mobile-list">
                {comparisonFeatures.map((feature) => {
                  const available = feature[plan.key];

                  return (
                    <div
                      className={`pricing-comparison__mobile-feature ${
                        !available
                          ? "pricing-comparison__mobile-feature--disabled"
                          : ""
                      }`}
                      key={`${plan.key}-${feature.name}`}
                    >
                      <span>
                        {available ? (
                          <Check size={15} />
                        ) : (
                          <X size={15} />
                        )}
                      </span>

                      <p>{feature.name}</p>
                    </div>
                  );
                })}
              </div>

              <a
                href="/contact"
                className="pricing-comparison__mobile-cta"
              >
                <span>Get a Custom Quote</span>
                <ArrowRight size={17} />
              </a>
            </motion.article>
          ))}
        </div>

        {/* ==================================================
            BOTTOM NOTE / CTA
        ================================================== */}

        <motion.div
          className="pricing-comparison__bottom"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <div className="pricing-comparison__bottom-content">
            <span className="pricing-comparison__bottom-icon">
              <ShieldCheck size={20} />
            </span>

            <div>
              <strong>
                Need a solution built around your property?
              </strong>

              <p>
                Final system sizing and project pricing are determined after
                reviewing your energy consumption, roof conditions and
                technical requirements.
              </p>
            </div>
          </div>

          <a
            href="/contact"
            className="pricing-comparison__cta"
          >
            <span>Request Custom Quote</span>

            <span className="pricing-comparison__cta-icon">
              <ArrowRight size={17} />
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

// ==========================================================
// COMPARISON VALUE
// ==========================================================

const ComparisonValue = ({ available }) => {
  return (
    <div className="pricing-comparison__cell">
      {available ? (
        <span
          className="pricing-comparison__check"
          aria-label="Included"
        >
          <Check size={16} strokeWidth={2.5} />
        </span>
      ) : (
        <span
          className="pricing-comparison__cross"
          aria-label="Not included"
        >
          <X size={15} strokeWidth={2} />
        </span>
      )}
    </div>
  );
};

export default PricingComparison;