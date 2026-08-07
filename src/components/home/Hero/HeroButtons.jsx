import { ArrowRight, FolderOpen } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const HeroButtons = () => {
  return (
    <motion.div
      className="hero-buttons"
      initial={{ opacity: 0, y: 35 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.35,
        duration: 0.7,
      }}
    >
      <Link
        to="/contact"
        className="hero-btn hero-btn-primary"
      >
        Get a Free Quote

        <ArrowRight size={18} />
      </Link>

      <Link
        to="/projects"
        className="hero-btn hero-btn-secondary"
      >
        Our Projects

        <FolderOpen size={18} />
      </Link>
    </motion.div>
  );
};

export default HeroButtons;