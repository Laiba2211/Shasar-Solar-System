import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const ServiceCard = ({ service }) => {
  return (
    <motion.div
      className="col-lg-4 col-md-6"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="service-grid-card h-100">

        {/* Image / Video */}

        <div className="service-grid-image overflow-hidden">
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

        <div className="card-body d-flex flex-column">

          <h3 className="service-grid-title">
            {service.title}
          </h3>

          <p className="service-grid-description">
            {service.description}
          </p>

          <a
            href={`#${service.slug}`}
            className="service-grid-btn mt-auto"
          >
            Learn More
            <ArrowRight size={18} />
          </a>

        </div>

      </div>
    </motion.div>
  );
};

export default ServiceCard;