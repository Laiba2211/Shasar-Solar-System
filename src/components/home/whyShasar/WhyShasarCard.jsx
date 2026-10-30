import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const WhyShasarCard = ({ feature, index }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/contact");
  };

  return (
    <motion.article
      className="why-card h-100"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: 0.6,
        delay: index * 0.12,
      }}
      whileHover={{ y: -10 }}
    >
      {/* Image */}

      <div className="why-card-image-wrapper overflow-hidden">

        <img
          src={feature.image}
          alt={feature.title}
          className="img-fluid why-card-image"
          loading="lazy"
        />

      </div>

      {/* Card Body */}

      <div className="why-card-body d-flex flex-column">

        <h3 className="why-card-title">

          {feature.title}

        </h3>

        <p className="why-card-description flex-grow-1">

          {feature.description}

        </p>

        <button
          type="button"
          className="why-card-btn mt-auto"
          onClick={handleNavigate}
        >
          Get Free Consultation

          <ArrowRight
            size={18}
            className="why-card-btn-icon ms-2"
          />

        </button>

      </div>
    </motion.article>
  );
};

export default WhyShasarCard;