// ==========================================================
// SHASAR SOLAR SYSTEM
// PRICING FAQ
// PHASE 4
// ==========================================================

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

import "./pricingFAQ.css";

const faqs = [
  {
    question: "What is included in your solar pricing plans?",
    answer:
      "Our pricing plans can include system design, high-quality solar panels, inverter solutions, installation, commissioning, monitoring, and after-sales support. The final package depends on your property, energy requirements, and selected system capacity.",
  },
  {
    question: "Are the prices fixed for every property?",
    answer:
      "No. Solar pricing depends on several factors including system size, roof structure, energy consumption, equipment selection, installation complexity, and project requirements. We provide a customized quotation after evaluating your property.",
  },
  {
    question: "Do you provide solar solutions for villas and residential properties?",
    answer:
      "Yes. We provide customized residential solar solutions for villas and homes across the UAE, with designs focused on energy savings, reliable performance, and clean integration with the property's architecture.",
  },
  {
    question: "Do you handle commercial and industrial solar projects?",
    answer:
      "Yes. Our commercial and industrial solutions are designed for larger energy requirements and can be customized for offices, warehouses, factories, retail facilities, and other commercial properties.",
  },
  {
    question: "Does the installation price include system commissioning?",
    answer:
      "Our complete project packages can include professional installation, testing, commissioning, and system handover. The exact scope will be clearly mentioned in your final quotation.",
  },
  {
    question: "Can I upgrade my solar system in the future?",
    answer:
      "In many cases, yes. Future expansion depends on the existing inverter capacity, electrical infrastructure, available roof space, and the original system design. We recommend planning future requirements during the initial system design.",
  },
  {
    question: "How long does a typical solar installation take?",
    answer:
      "Installation time depends on the project size and complexity. Residential systems are generally completed faster than large commercial or industrial installations. A project-specific timeline is provided during the proposal stage.",
  },
  {
    question: "How can I get a customized solar quotation?",
    answer:
      "Simply contact our team with your property details and approximate electricity requirements. Our team can evaluate your requirements and prepare a customized solar proposal based on your project.",
  },
];

const PricingFAQ = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleFAQ = (index) => {
    setActiveIndex((current) => (current === index ? null : index));
  };

  return (
    <section
      className="pricing-faq"
      id="pricing-faq"
      aria-labelledby="pricing-faq-title"
    >
      {/* ==================================================
          BACKGROUND DECORATION
      ================================================== */}

      <div
        className="pricing-faq__glow pricing-faq__glow--one"
        aria-hidden="true"
      />

      <div
        className="pricing-faq__glow pricing-faq__glow--two"
        aria-hidden="true"
      />

      <div className="container">
        {/* ==================================================
            HEADER
        ================================================== */}

        <motion.div
          className="pricing-faq__header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
        >
          <div className="pricing-faq__eyebrow">
            <span className="pricing-faq__eyebrow-line" />

            <HelpCircle size={15} />

            <span>Pricing Support</span>

            <span className="pricing-faq__eyebrow-line" />
          </div>

          <h2 id="pricing-faq-title" className="pricing-faq__title">
            Questions About Our
            <span> Solar Pricing?</span>
          </h2>

          <p className="pricing-faq__intro">
            Find answers to common questions about our solar packages,
            installation process, project pricing, and customized solutions.
          </p>
        </motion.div>

        {/* ==================================================
            FAQ LIST
        ================================================== */}

        <motion.div
          className="pricing-faq__list"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          {faqs.map((faq, index) => {
            const isActive = activeIndex === index;

            return (
              <motion.div
                key={faq.question}
                className={`pricing-faq__item ${
                  isActive ? "is-active" : ""
                }`}
                layout
              >
                <button
                  type="button"
                  className="pricing-faq__question"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isActive}
                  aria-controls={`pricing-faq-answer-${index}`}
                >
                  <span className="pricing-faq__number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="pricing-faq__question-text">
                    {faq.question}
                  </span>

                  <span className="pricing-faq__icon">
                    <ChevronDown size={19} />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      id={`pricing-faq-answer-${index}`}
                      className="pricing-faq__answer-wrapper"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        duration: 0.3,
                        ease: "easeInOut",
                      }}
                    >
                      <div className="pricing-faq__answer">
                        <p>{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ==================================================
            BOTTOM CTA
        ================================================== */}

        <motion.div
          className="pricing-faq__bottom"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <span className="pricing-faq__bottom-label">
              Need a customized solution?
            </span>

            <p>
              Get a solar proposal designed around your property's energy
              requirements.
            </p>
          </div>

          <a href="/contact" className="pricing-faq__cta">
            <span>Request a Quote</span>
            <ChevronDown size={17} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingFAQ;