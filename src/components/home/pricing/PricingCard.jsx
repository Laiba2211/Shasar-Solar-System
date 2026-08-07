import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PricingCard = ({ plan }) => {
  const navigate = useNavigate();

  const handleChoosePlan = () => {
    navigate("/contact");
  };

  return (
    <motion.div
      className="col-lg-4 col-md-6 col-12 d-flex"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div
        className={`pricing-card card h-100 w-100 ${
          plan.featured ? "featured-plan" : ""
        }`}
      >
        {/* Popular Badge */}

        {plan.badge && (
          <div className="pricing-badge">
            {plan.badge}
          </div>
        )}

        <div className="card-body d-flex flex-column">

          {/* Plan Name */}

          <h3 className="pricing-plan-name">
            {plan.name}
          </h3>

          {/* Description */}

          <p className="pricing-plan-description">
            {plan.description}
          </p>

          {/* Price */}

          <div className="pricing-price-wrapper">

            <span className="pricing-duration">
              {plan.duration}
            </span>

            <h2 className="pricing-price">
              {plan.price}
            </h2>

          </div>

          {/* Services */}

          <ul className="pricing-services list-unstyled">

            {plan.services.map((service, index) => (

              <li
                key={index}
                className="pricing-service-item d-flex align-items-start"
              >
                <Check
                  size={18}
                  className="pricing-check-icon flex-shrink-0"
                />

                <span>{service}</span>

              </li>

            ))}

          </ul>

          {/* Button */}

          <div className="mt-auto">

            <button
              type="button"
              className="pricing-btn"
              onClick={handleChoosePlan}
            >
              Choose Plan

              <ArrowRight size={18} />

            </button>

          </div>

        </div>
      </div>
    </motion.div>
  );
};

export default PricingCard;