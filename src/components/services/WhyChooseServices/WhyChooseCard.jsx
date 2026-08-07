import { motion } from "framer-motion";

const WhyChooseCard = ({ item, index }) => {
  const Icon = item.icon;

  return (
    <motion.div
      className="col-lg-4 col-md-6"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
      }}
    >
      <div className="why-service-card h-100">

        <div className="why-service-icon">
          <Icon size={34} strokeWidth={2} />
        </div>

        <h3>{item.title}</h3>

        <p>{item.description}</p>

      </div>
    </motion.div>
  );
};

export default WhyChooseCard;