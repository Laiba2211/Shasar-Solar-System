import { motion } from "framer-motion";
import { SunMedium } from "lucide-react";

const ServicesHeroBadge = () => {
  return (
    <motion.div
      className="services-hero-badge"
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <SunMedium size={18} />
      UAE's Trusted Solar Engineering Company
    </motion.div>
  );
};

export default ServicesHeroBadge;