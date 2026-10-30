// ==========================================================
// SHASAR SOLAR SYSTEM
// PRICING PLANS
// PHASE 2
// ==========================================================

import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Crown,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";

import "./pricingPlans.css";

const pricingPlans = [
  {
    id: "essential",
    name: "Essential",
    label: "Residential",
    description:
      "A practical solar solution for villas and smaller properties looking to reduce daytime electricity costs.",
    price: "From AED 12,500",
    priceNote: "Typical entry-level residential system",
    capacity: "Up to 5 kW",
    icon: Zap,

    features: [
      "Solar PV system design",
      "High-efficiency solar panels",
      "Grid-tied inverter",
      "Professional installation",
      "Basic monitoring setup",
      "DEWA connection assistance",
      "System commissioning",
      "Installation handover",
    ],

    idealFor: "Villas & smaller residential properties",

    button: "Get Residential Quote",

    featured: false,
  },

  {
    id: "performance",
    name: "Performance",
    label: "Most Popular",
    description:
      "A balanced solar package designed for larger villas and businesses seeking stronger savings and long-term performance.",
    price: "From AED 38,000",
    priceNote: "Typical commercial-entry system",
    capacity: "Up to 20 kW",
    icon: Sparkles,

    features: [
      "Complete solar system design",
      "Premium Tier-1 solar modules",
      "High-performance inverter",
      "Professional installation",
      "DEWA documentation assistance",
      "Monitoring & performance setup",
      "System commissioning",
      "Performance optimization",
      "Installation handover",
      "Post-installation support",
    ],

    idealFor: "Large villas, offices & retail spaces",

    button: "Choose Performance",

    featured: true,
  },

  {
    id: "enterprise",
    name: "Enterprise",
    label: "Custom Engineering",
    description:
      "A tailored MW-ready solution for commercial and industrial facilities with complex energy requirements.",
    price: "Custom Quote",
    priceNote: "Engineered according to site requirements",
    capacity: "20 kW – MW Scale",
    icon: Crown,

    features: [
      "Detailed site assessment",
      "Custom engineering design",
      "Premium solar modules",
      "Commercial-grade inverters",
      "Structural & electrical planning",
      "DEWA approval coordination",
      "Advanced monitoring",
      "Energy performance analysis",
      "Commissioning & testing",
      "O&M planning",
      "Long-term technical support",
    ],

    idealFor: "Warehouses, factories & large facilities",

    button: "Request Custom Quote",

    featured: false,
  },
];

const PricingPlans = () => {
  return (
    <section
      className="pricing-plans"
      id="pricing-plans"
      aria-labelledby="pricing-plans-title"
    >
      {/* ==================================================
          BACKGROUND DECORATION
      ================================================== */}

      <div
        className="pricing-plans__orb pricing-plans__orb--one"
        aria-hidden="true"
      />

      <div
        className="pricing-plans__orb pricing-plans__orb--two"
        aria-hidden="true"
      />

      <div className="container position-relative">
        {/* ==================================================
            HEADER
        ================================================== */}

        <motion.div
          className="pricing-plans__header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
        >
          <div className="pricing-plans__eyebrow">
            <span className="pricing-plans__eyebrow-line" />
            <span>Solar Investment Plans</span>
            <span className="pricing-plans__eyebrow-line" />
          </div>

          <h2
            id="pricing-plans-title"
            className="pricing-plans__title"
          >
            Solar solutions designed around
            <span> your energy goals.</span>
          </h2>

          <p className="pricing-plans__intro">
            Choose a starting package for your property, or let our
            engineering team build a solution around your energy
            consumption, roof space and project requirements.
          </p>
        </motion.div>

        {/* ==================================================
            PRICING GRID
        ================================================== */}

        <div className="row g-4 align-items-stretch">
          {pricingPlans.map((plan, index) => {
            const Icon = plan.icon;

            return (
              <div
                className="col-lg-4 col-md-6"
                key={plan.id}
              >
                <motion.article
                  className={`pricing-plan-card ${
                    plan.featured
                      ? "pricing-plan-card--featured"
                      : ""
                  }`}
                  initial={{
                    opacity: 0,
                    y: 45,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.15,
                  }}
                  transition={{
                    duration: 0.65,
                    delay: index * 0.12,
                    ease: "easeOut",
                  }}
                  whileHover={{
                    y: -8,
                  }}
                >
                  {/* Featured Badge */}

                  {plan.featured && (
                    <div className="pricing-plan-card__featured-badge">
                      <Sparkles size={14} />
                      <span>Most Popular</span>
                    </div>
                  )}

                  {/* Card Header */}

                  <div className="pricing-plan-card__header">
                    <div className="pricing-plan-card__icon">
                      <Icon size={21} strokeWidth={2} />
                    </div>

                    <div>
                      <span className="pricing-plan-card__label">
                        {plan.label}
                      </span>

                      <h3>{plan.name}</h3>
                    </div>
                  </div>

                  {/* Description */}

                  <p className="pricing-plan-card__description">
                    {plan.description}
                  </p>

                  {/* Price */}

                  <div className="pricing-plan-card__price-area">
                    <div className="pricing-plan-card__price">
                      {plan.price}
                    </div>

                    <span className="pricing-plan-card__price-note">
                      {plan.priceNote}
                    </span>
                  </div>

                  {/* Capacity */}

                  <div className="pricing-plan-card__capacity">
                    <Zap size={16} />

                    <span>
                      Recommended system size:
                    </span>

                    <strong>{plan.capacity}</strong>
                  </div>

                  {/* Divider */}

                  <div className="pricing-plan-card__divider" />

                  {/* Features */}

                  <div className="pricing-plan-card__features">
                    <div className="pricing-plan-card__features-title">
                      <ShieldCheck size={16} />

                      <span>What's included</span>
                    </div>

                    <ul>
                      {plan.features.map((feature) => (
                        <li key={feature}>
                          <span className="pricing-plan-card__check">
                            <Check size={13} strokeWidth={3} />
                          </span>

                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Ideal For */}

                  <div className="pricing-plan-card__ideal">
                    <span>Ideal for</span>

                    <strong>{plan.idealFor}</strong>
                  </div>

                  {/* CTA */}

                  <a
                    href="#contact"
                    className={`pricing-plan-card__button ${
                      plan.featured
                        ? "pricing-plan-card__button--featured"
                        : ""
                    }`}
                  >
                    <span>{plan.button}</span>

                    <span className="pricing-plan-card__button-icon">
                      <ArrowRight size={16} />
                    </span>
                  </a>
                </motion.article>
              </div>
            );
          })}
        </div>

        {/* ==================================================
            BOTTOM NOTE
        ================================================== */}

        <motion.div
          className="pricing-plans__note"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <ShieldCheck size={18} />

          <p>
            Final pricing is determined after site assessment,
            system sizing, equipment selection and project-specific
            requirements. Connection and approval requirements may
            vary by project.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingPlans;