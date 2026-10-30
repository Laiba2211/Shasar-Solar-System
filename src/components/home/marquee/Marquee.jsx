import { motion } from "framer-motion";
import MarqueeItem from "./MarqueeItem";
import "./marquee.css";

const partners = [
  "RESIDENTIAL SOLAR",
  "COMMERCIAL SOLAR",
  "INDUSTRIAL SOLAR",
  "WAREHOUSE SOLAR",
  "ROOFTOP SOLAR",
  "BATTERY STORAGE",
  "ON-GRID SYSTEMS",
  "OFF-GRID SYSTEMS",
  "HYBRID SOLAR",
  "SOLAR MAINTENANCE",
];

const Marquee = () => {
  return (
    <motion.section
      className="partner-marquee"
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7 }}
      aria-label="Trusted Partners and Certifications"
    >
      <div className="marquee-wrapper">

        <div className="marquee-track">

          {[...partners, ...partners].map((partner, index) => (
            <MarqueeItem
              key={`${partner}-${index}`}
              title={partner}
            />
          ))}

        </div>

      </div>
    </motion.section>
  );
};

export default Marquee;