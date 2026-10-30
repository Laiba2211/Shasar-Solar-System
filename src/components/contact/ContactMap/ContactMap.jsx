import { motion } from "framer-motion";
import {
  MapPin,
  Navigation,
  Building2,
  ExternalLink,
} from "lucide-react";

import "./contactMap.css";

const ContactMap = () => {
  const address =
    "Saeed Khalid Building, Office #05,Saeed Port, Deira, Dubai";

  const mapUrl =
    "https://www.google.com/maps/search/?api=1&query=Office%20106%20Bay%20Square%20Business%20Bay%20Dubai%20UAE";

  return (
    <section
      className="contact-map"
      id="contact-map"
      aria-labelledby="contact-map-title"
    >
      {/* Decorative background */}
      <div
        className="contact-map__glow contact-map__glow--one"
        aria-hidden="true"
      />

      <div
        className="contact-map__glow contact-map__glow--two"
        aria-hidden="true"
      />

      <div className="container">
        {/* ==========================================
            HEADER
        ========================================== */}

        <motion.div
          className="contact-map__header"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65 }}
        >
          <div className="contact-map__eyebrow">
            <span className="contact-map__eyebrow-line" />

            <span>Visit Our Office</span>

            <span className="contact-map__eyebrow-line" />
          </div>

          <h2
            id="contact-map-title"
            className="contact-map__title"
          >
            Find Us in
            <span> Business Bay, Dubai</span>
          </h2>

          <p className="contact-map__description">
            Visit Shasar Solar System at our Dubai office. Our team is
            ready to discuss your solar energy requirements and help
            you plan the right solution for your property.
          </p>
        </motion.div>

        {/* ==========================================
            MAP WRAPPER
        ========================================== */}

        <motion.div
          className="contact-map__wrapper"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            duration: 0.75,
            ease: "easeOut",
          }}
        >
          {/* Google Maps */}

          <div className="contact-map__frame">
            <iframe
              title="Shasar Solar System Office Location"
              src="https://www.google.com/maps?q=Office%20106%20Bay%20Square%20Business%20Bay%20Dubai%20UAE&output=embed"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* ========================================
              FLOATING OFFICE CARD
          ======================================== */}

          <motion.div
            className="contact-map__card"
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.65,
              delay: 0.2,
            }}
          >
            <div className="contact-map__card-icon">
              <Building2 size={20} />
            </div>

            <div className="contact-map__card-content">
              <span className="contact-map__card-label">
                Shasar Solar System
              </span>

              <h3>Dubai Office</h3>

              <p>
                <MapPin size={15} />
                {address}
              </p>

              <div className="contact-map__card-actions">
                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-map__directions"
                >
                  <Navigation size={15} />

                  <span>Get Directions</span>

                  <ExternalLink size={13} />
                </a>
              </div>
            </div>
          </motion.div>

          {/* ========================================
              MAP BADGE
          ======================================== */}

          <div className="contact-map__badge">
            <span className="contact-map__badge-dot" />

            <span>Our Dubai Office</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactMap;