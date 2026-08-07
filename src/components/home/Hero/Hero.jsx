import { motion } from "framer-motion";
import "./Hero.css";

import heroVideo from "../../../assets/videos/hero-video.mp4";

import HeroContent from "./HeroContent";

const Hero = () => {
  return (
    <section
      className="hero"
      aria-labelledby="hero-heading"
    >
      {/* Background Video */}

      <video
        className="hero__video"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

      {/* Overlay */}

      <div className="hero__overlay"></div>

      {/* Content */}

      <div className="container hero__container">

        <motion.div
          className="hero__content-wrapper"
          initial={{ opacity: 0, y: 45 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: .8,
            ease: "easeOut"
          }}
        >
          <HeroContent />
        </motion.div>

      </div>

    </section>
  );
};

export default Hero;