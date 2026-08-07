import { motion } from "framer-motion";

const TimelineItem = ({ step, index }) => {
  const Icon = step.icon;

  return (
    <motion.div
      className="timeline-item text-center"
      initial={{
        opacity: 0,
        y: 50,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
      }}
      whileHover={{
        y: -8,
      }}
    >
      {/* Timeline Circle */}

      <motion.div
        className="timeline-circle mx-auto"
        whileHover={{
          scale: 1.08,
        }}
        transition={{
          duration: 0.25,
        }}
      >
        <span className="timeline-number">
          {step.number}
        </span>
      </motion.div>

      {/* Icon */}

      <motion.div
        className="timeline-icon"
        whileHover={{
          rotate: -8,
          scale: 1.1,
        }}
        transition={{
          duration: 0.3,
        }}
      >
        <Icon size={28} />
      </motion.div>

      {/* Content */}

      <div className="timeline-content">

        <h3 className="timeline-title">
          {step.title}
        </h3>

        <p className="timeline-description">
          {step.description}
        </p>

      </div>
    </motion.div>
  );
};

export default TimelineItem;