import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock3,
  ArrowUpRight,
} from "lucide-react";

import "./contactInfo.css";

const contactItems = [
  {
    icon: Phone,
    label: "Call Us",
    title: "+971 50 665 3664",
    description: "Speak directly with our solar experts.",
    href: "tel:+971506653664",
  },
  {
    icon: Mail,
    label: "Email Us",
    title: "info@shasartech.com",
    description: "Send us your requirements anytime.",
    href: "mailto:info@shasartech.com",
  },
  {
    icon: MapPin,
    label: "Visit Our Office",
    title: "Saeed Khalid Building office # 05 , Saeed port Deira",
    description: "Connect with our team at our UAE office.",
    href: "#",
  },
  {
    icon: Clock3,
    label: "Business Hours",
    title: "Mon – Sat | 9:00 AM – 6:00 PM",
    description: "Our team is available during business hours.",
    href: "#",
  },
];

const ContactInfo = () => {
  return (
    <section className="contact-info">
      {/* Background decoration */}
      <div
        className="contact-info__glow contact-info__glow--one"
        aria-hidden="true"
      />

      <div
        className="contact-info__glow contact-info__glow--two"
        aria-hidden="true"
      />

      <div className="container">
        <div className="row align-items-center g-4 g-xl-5">

          {/* =========================================
              LEFT CONTENT
          ========================================== */}

          <div className="col-lg-5">
            <motion.div
              className="contact-info__content"
              initial={{ opacity: 0, x: -35 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.7,
                ease: "easeOut",
              }}
            >
              <div className="contact-info__eyebrow">
                <span className="contact-info__eyebrow-line" />
                <span>Let’s Connect</span>
              </div>

              <h2 className="contact-info__title">
                Let’s Build a
                <span> Smarter Energy Future.</span>
              </h2>

              <p className="contact-info__description">
                Have a solar project in mind? Our team is ready to understand
                your requirements and help you find the right renewable energy
                solution for your property or business.
              </p>

              <div className="contact-info__trust">
                <div className="contact-info__trust-item">
                  <span className="contact-info__trust-dot" />
                  <span>Professional Solar Consultation</span>
                </div>

                <div className="contact-info__trust-item">
                  <span className="contact-info__trust-dot" />
                  <span>UAE-Based Solar Expertise</span>
                </div>

                <div className="contact-info__trust-item">
                  <span className="contact-info__trust-dot" />
                  <span>Reliable Project Support</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* =========================================
              CONTACT CARDS
          ========================================== */}

          <div className="col-lg-7">
            <div className="row g-3">

              {contactItems.map((item, index) => {
                const Icon = item.icon;

                return (
                  <div
                    className="col-sm-6"
                    key={item.label}
                  >
                    <motion.a
                      href={item.href}
                      className="contact-info__card"
                      initial={{
                        opacity: 0,
                        y: 30,
                      }}
                      whileInView={{
                        opacity: 1,
                        y: 0,
                      }}
                      viewport={{
                        once: true,
                        amount: 0.15,
                      }}
                      transition={{
                        duration: 0.55,
                        delay: index * 0.1,
                        ease: "easeOut",
                      }}
                      whileHover={{
                        y: -6,
                      }}
                    >
                      <div className="contact-info__card-top">
                        <div className="contact-info__icon">
                          <Icon
                            size={20}
                            strokeWidth={2}
                          />
                        </div>

                        <span className="contact-info__arrow">
                          <ArrowUpRight size={16} />
                        </span>
                      </div>

                      <div className="contact-info__card-label">
                        {item.label}
                      </div>

                      <h3 className="contact-info__card-title">
                        {item.title}
                      </h3>

                      <p className="contact-info__card-description">
                        {item.description}
                      </p>
                    </motion.a>
                  </div>
                );
              })}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactInfo;