import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  CheckCircle2,
  Mail,
  MessageCircle,
  Phone,
  Sparkles,
} from "lucide-react";

import "./contactHero.css";

const ContactHero = () => {
  const scrollToForm = () => {
    const formSection = document.getElementById("contact-form");

    if (formSection) {
      formSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section
      className="contact-hero"
      id="contact-hero"
      aria-labelledby="contact-hero-title"
    >
      {/* =====================================================
          BACKGROUND IMAGE
      ===================================================== */}

      <div className="contact-hero__background">
        <img
          src="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=2200&q=90"
          alt=""
          className="contact-hero__background-image"
          aria-hidden="true"
        />

        <div
          className="contact-hero__background-overlay"
          aria-hidden="true"
        />

        <div
          className="contact-hero__background-glow"
          aria-hidden="true"
        />
      </div>

      {/* =====================================================
          DECORATIVE GRID
      ===================================================== */}

      <div
        className="contact-hero__grid"
        aria-hidden="true"
      />

      {/* =====================================================
          DECORATIVE ORBS
      ===================================================== */}

      <div
        className="contact-hero__orb contact-hero__orb--one"
        aria-hidden="true"
      />

      <div
        className="contact-hero__orb contact-hero__orb--two"
        aria-hidden="true"
      />

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div className="container position-relative">
        <div className="contact-hero__layout">

          {/* =================================================
              LEFT / MAIN CONTENT
          ================================================= */}

          <motion.div
            className="contact-hero__content"
            initial={{
              opacity: 0,
              y: 35,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
          >

            {/* =================================================
                BADGE
            ================================================= */}

            <motion.div
              className="contact-hero__badge"
              initial={{
                opacity: 0,
                x: -20,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay: 0.15,
                duration: 0.6,
              }}
            >
              <span className="contact-hero__badge-icon">
                <MessageCircle size={15} />
              </span>

              <span>Connect With Shasar Solar</span>

              <span className="contact-hero__badge-status">
                <span />
                Available
              </span>
            </motion.div>

            {/* =================================================
                TITLE
            ================================================= */}

            <motion.h1
              id="contact-hero-title"
              className="contact-hero__title"
              initial={{
                opacity: 0,
                y: 25,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.25,
                duration: 0.75,
              }}
            >
              Let's Start Your
              <span>Solar Journey.</span>
            </motion.h1>

            {/* =================================================
                DESCRIPTION
            ================================================= */}

            <motion.p
              className="contact-hero__description"
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.35,
                duration: 0.7,
              }}
            >
              Whether you're planning a residential installation,
              commercial solar project, or large-scale renewable
              energy solution, our team is ready to help you turn
              your energy goals into a reliable solar system.
            </motion.p>

            {/* =================================================
                TRUST POINTS
            ================================================= */}

            <motion.div
              className="contact-hero__trust"
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.45,
                duration: 0.6,
              }}
            >
              <div className="contact-hero__trust-item">
                <CheckCircle2 size={16} />
                <span>Expert Consultation</span>
              </div>

              <div className="contact-hero__trust-item">
                <CheckCircle2 size={16} />
                <span>Tailored Solar Solutions</span>
              </div>

              <div className="contact-hero__trust-item">
                <CheckCircle2 size={16} />
                <span>Professional Support</span>
              </div>
            </motion.div>

            {/* =================================================
                CTA
            ================================================= */}

            <motion.div
              className="contact-hero__actions"
              initial={{
                opacity: 0,
                y: 18,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.55,
                duration: 0.6,
              }}
            >
              <motion.button
                type="button"
                className="contact-hero__primary-btn"
                onClick={scrollToForm}
                whileHover={{
                  y: -3,
                }}
                whileTap={{
                  scale: 0.98,
                }}
              >
                <span>Talk To Our Team</span>

                <span className="contact-hero__primary-icon">
                  <ArrowRight size={17} />
                </span>
              </motion.button>

              <button
                type="button"
                className="contact-hero__scroll-btn"
                onClick={scrollToForm}
              >
                <span>Send An Inquiry</span>

                <ArrowDown size={16} />
              </button>
            </motion.div>
          </motion.div>

          {/* =================================================
              RIGHT CONTACT PANEL
          ================================================= */}

          <motion.div
            className="contact-hero__panel"
            initial={{
              opacity: 0,
              x: 35,
              scale: 0.97,
            }}
            animate={{
              opacity: 1,
              x: 0,
              scale: 1,
            }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeOut",
            }}
          >

            {/* Panel Header */}

            <div className="contact-hero__panel-header">
              <div className="contact-hero__panel-icon">
                <Sparkles size={18} />
              </div>

              <div>
                <span>Let's Connect</span>

                <strong>
                  Your next solar project starts here.
                </strong>
              </div>
            </div>

            {/* Panel Divider */}

            <div className="contact-hero__panel-divider" />

            {/* Contact Items */}

            <div className="contact-hero__contact-list">

              <div className="contact-hero__contact-item">
                <div className="contact-hero__contact-icon">
                  <Phone size={17} />
                </div>

                <div>
                  <span>Call Our Team</span>
                  <strong>+971 50 665 3664</strong>
                </div>
              </div>

              <div className="contact-hero__contact-item">
                <div className="contact-hero__contact-icon">
                  <Mail size={17} />
                </div>

                <div>
                  <span>Email Us</span>
                  <strong>Shasartech@gmail.com</strong>
                </div>
              </div>

            </div>

            {/* Panel Footer */}

            <div className="contact-hero__panel-footer">
              <span className="contact-hero__live-dot" />

              <span>
                Our team is ready to discuss your requirements.
              </span>
            </div>
          </motion.div>
        </div>

        {/* =====================================================
            BOTTOM INFO BAR
        ===================================================== */}

        <motion.div
          className="contact-hero__bottom-bar"
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.7,
            duration: 0.6,
          }}
        >
          <div className="contact-hero__bottom-item">
            <span>01</span>
            <strong>Tell Us Your Requirements</strong>
          </div>

          <div className="contact-hero__bottom-line" />

          <div className="contact-hero__bottom-item">
            <span>02</span>
            <strong>Get A Tailored Solution</strong>
          </div>

          <div className="contact-hero__bottom-line" />

          <div className="contact-hero__bottom-item">
            <span>03</span>
            <strong>Move Towards Clean Energy</strong>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactHero;