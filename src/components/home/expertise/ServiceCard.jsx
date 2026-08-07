import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ServiceCard = ({ service }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/services/${service.slug}`);
  };

  return (
    <motion.article
      className="service-card h-100"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -10 }}
    >
      {/* Image */}

      <div className="service-image-wrapper overflow-hidden">

        {/* <img
          src={service.image}
          alt={service.title}
          className="service-image img-fluid"
          loading="lazy"
        /> */}

 {service.video ? (
            <video
               className="service-image"
               autoPlay
               muted
               loop
               playsInline
               preload="metadata"
              
            >
              <source src={service.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <img
              src={service.image}
              alt={service.title}
              className="service-image img-fluid"
              loading="lazy"
            />
          )}



      </div>

      {/* Body */}

      <div className="service-content d-flex flex-column">

        <h3 className="service-title">

          {service.title}

        </h3>

        <p className="service-description flex-grow-1">

          {service.description}

        </p>

        <button
          className="service-btn mt-auto"
          onClick={handleNavigate}
        >
          Learn More

          <ArrowRight
            size={18}
            className="service-btn-icon"
          />

        </button>

      </div>

    </motion.article>
  );
};

export default ServiceCard;