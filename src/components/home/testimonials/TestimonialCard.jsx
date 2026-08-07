import { motion } from "framer-motion";
import {
  Quote,
  Star,
  MapPin,
  Briefcase,
} from "lucide-react";

const TestimonialCard = ({ testimonial }) => {
  const {
    image,
    name,
    designation,
    location,
    project,
    review,
    rating,
  } = testimonial;

  return (
    <motion.article
      className="testimonial-card card h-100 border-0"
      whileHover={{
        y: -12,
      }}
      transition={{
        duration: 0.35,
      }}
    >
      <div className="card-body d-flex flex-column">

        {/* Quote */}

        <div className="testimonial-quote-icon">

          <Quote />

        </div>

        {/* Review */}

        <p className="testimonial-review flex-grow-1">

          "{review}"

        </p>

        {/* Rating */}

        <div className="testimonial-rating d-flex align-items-center mb-4">

          {[...Array(rating)].map((_, index) => (
            <Star
              key={index}
              className="testimonial-star"
              fill="currentColor"
              size={18}
            />
          ))}

        </div>

        {/* Customer */}

        <div className="testimonial-user d-flex align-items-center">

          <div className="testimonial-avatar flex-shrink-0">

            <img
              src={image}
              alt={name}
              className="img-fluid rounded-circle"
              loading="lazy"
            />

          </div>

          <div className="testimonial-user-info flex-grow-1">

            <h5 className="testimonial-name mb-1">

              {name}

            </h5>

            <p className="testimonial-designation mb-2">

              {designation}

            </p>

            <div className="testimonial-meta d-flex flex-wrap gap-3">

              <span className="testimonial-location">

                <MapPin size={15} />

                {location}

              </span>

              <span className="testimonial-project">

                <Briefcase size={15} />

                {project}

              </span>

            </div>

          </div>

        </div>

      </div>
    </motion.article>
  );
};

export default TestimonialCard;