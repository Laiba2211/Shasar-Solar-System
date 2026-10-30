
import heroImg from "../../../assets/images/services/HeroImg.jpeg";
import { motion } from "framer-motion";
import "./Hero.css";

import HeroContent from "./HeroContent";

const Hero = () => {
  return (
    <section
      className="hero"
      aria-labelledby="hero-heading"
    >
      {/* Background Image */}

      <img
        className="hero__video"
        src={heroImg}
        alt=""
        aria-hidden="true"
      />

      {/* Overlay */}

      <div className="hero__overlay"></div>

      {/* Content */}

      <div className="container hero__container">
        <motion.div
          className="hero__content-wrapper"
          initial={{ opacity: 0, y: 45 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
        >
          <HeroContent />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
