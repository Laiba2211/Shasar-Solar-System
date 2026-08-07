import { motion } from "framer-motion";
import {
  CheckCircle,
  ArrowRight,
  Home,
  Building2,
  Factory,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const cleaningPlans = [
  {
    id: 1,
    icon: Home,
    badge: "Residential",
    capacity: "Below 20 kW",
    price: "AED 450",
    description:
      "Ideal for villas, homes and small residential rooftop solar systems.",

    services: [
      "Professional Panel Cleaning",
      "Panel Inspection",
      "Dust & Dirt Removal",
      "Performance Check",
    ],
  },

  {
    id: 2,
    icon: Building2,
    badge: "Most Popular",
    capacity: "20–50 kW",
    price: "AED 750",
    description:
      "Designed for commercial buildings with medium-capacity solar systems.",

    services: [
      "Complete Cleaning",
      "Safety Inspection",
      "Performance Verification",
      "Basic Maintenance",
    ],

    featured: true,
  },

  {
    id: 3,
    icon: Factory,
    badge: "Industrial",
    capacity: "50–70 kW",
    price: "AED 1,000",
    description:
      "Perfect for factories, warehouses and industrial solar installations.",

    services: [
      "Deep Cleaning",
      "Full Inspection",
      "Detailed Service Report",
      "Priority Service",
    ],
  },
];

const CleaningPricingTable = () => {
  const navigate = useNavigate();

  return (
    <section className="cleaning-section mt-5 pt-5">

      {/* Heading */}

      <motion.div
        className="text-center cleaning-header"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >

        <span className="cleaning-badge">

          Solar Cleaning Services

        </span>

        <h3 className="cleaning-title">

          Solar Panel Cleaning Charges

        </h3>

        <p className="cleaning-description">

          Transparent pricing for professional solar panel cleaning
          services across residential, commercial and industrial
          properties throughout the UAE.

        </p>

      </motion.div>

      {/* Cards */}

      <div className="row g-4 mt-2">

        {cleaningPlans.map((plan, index) => {
          const Icon = plan.icon;

          return (
            <div
              className="col-lg-4 col-md-6"
              key={plan.id}
            >
              <motion.div
                className={`cleaning-card h-100 ${
                  plan.featured ? "featured-cleaning-card" : ""
                }`}
                initial={{ opacity: 0, y: 45 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.15,
                }}
                viewport={{ once: true }}
                whileHover={{
                  y: -10,
                }}
              >
                {/* Badge */}

                <span className="cleaning-plan-badge">

                  {plan.badge}

                </span>

                {/* Icon */}

                <div className="cleaning-icon">

                  <Icon size={34} />

                </div>

                {/* Capacity */}

                <h4 className="cleaning-capacity">

                  {plan.capacity}

                </h4>

                {/* Price */}

                <div className="cleaning-price">

                  {plan.price}

                </div>

                {/* Description */}

                <p className="cleaning-card-description">

                  {plan.description}

                </p>

                {/* Services */}

                <ul className="cleaning-services list-unstyled">

                  {plan.services.map((service) => (
                    <li key={service}>

                      <CheckCircle
                        size={18}
                        className="cleaning-check"
                      />

                      {service}

                    </li>
                  ))}

                </ul>

                {/* Button */}

                <button
                  className="cleaning-btn mt-auto"
                  onClick={() => navigate("/contact")}
                >
                  Book Cleaning

                  <ArrowRight size={18} />

                </button>

              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Notice */}

      <motion.div
        className="cleaning-note mt-5"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >

        <strong>Important:</strong>

        Prices shown are starting rates. Final pricing may vary
        depending on roof accessibility, panel quantity,
        installation height, system condition and site inspection.

      </motion.div>

    </section>
  );
};

export default CleaningPricingTable;