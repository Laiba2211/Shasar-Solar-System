import { ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const HeroBadge = () => {
  return (
    <motion.div
      className="hero-badge"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
      }}
      whileHover={{
        y: -2,
      }}
    >
      <ShieldCheck size={18} />

      <span>Trusted Solar Energy Experts</span>
    </motion.div>
  );
};

export default HeroBadge;