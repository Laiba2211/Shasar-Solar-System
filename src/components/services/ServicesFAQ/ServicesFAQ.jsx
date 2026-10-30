import { motion } from "framer-motion";
import { ChevronDown, MessageCircleQuestion } from "lucide-react";
import { Link } from "react-router-dom";

import "./servicesFAQ.css";

const faqData = [
  {
    id: 1,
    question: "How does the solar installation process work in Dubai?",
    answer:
      "Our process begins with an initial consultation and site assessment. Our engineering team then evaluates your energy requirements, develops the appropriate solar system design, manages the required documentation and approvals, and proceeds with professional installation, testing, commissioning, and ongoing support.",
  },
  {
    id: 2,
    question: "Do you provide DEWA approval and documentation?",
    answer:
      "Yes. Where applicable, our team can assist with the required technical documentation and approval process for grid-connected solar installations. Our engineers ensure the system design and documentation follow the applicable requirements.",
  },
  {
    id: 3,
    question: "How much can I save by installing solar panels?",
    answer:
      "Your potential savings depend on factors such as electricity consumption, system size, available roof area, operating hours, tariff structure, and site conditions. During the consultation, we can assess your property and provide a project-specific estimate.",
  },
  {
    id: 4,
    question: "How long does a solar installation take?",
    answer:
      "Installation time depends on system size, project complexity, site conditions, equipment availability, and approval requirements. Residential installations are generally faster than large commercial or industrial projects.",
  },
  {
    id: 5,
    question: "Do you provide solar panel cleaning and maintenance?",
    answer:
      "Yes. We provide professional solar panel cleaning, preventive maintenance, system inspection, performance checks, and annual maintenance programs designed to keep solar systems operating efficiently in the UAE climate.",
  },
  {
    id: 6,
    question: "Can you install solar equipment that we have already purchased?",
    answer:
      "Yes. Our Installation Only service is designed for customers who already have solar equipment. Our technical team can verify the equipment and site requirements before carrying out professional installation, electrical connections, testing, and commissioning.",
  },
  {
    id: 7,
    question: "Do you provide battery storage solutions?",
    answer:
      "Yes. We provide battery energy storage solutions for residential, commercial, industrial, and suitable off-grid applications. Battery capacity and configuration are selected according to the property's energy requirements and operating profile.",
  },
  {
    id: 8,
    question: "Do you provide solar solutions for commercial and industrial properties?",
    answer:
      "Yes. We design scalable solar solutions for offices, retail facilities, warehouses, factories, industrial sites, hotels, and other commercial properties. System design is based on energy consumption, available space, operational requirements, and project objectives.",
  },
];

const ServicesFAQ = () => {
  return (
    <section className="services-faq-section" id="services-faq">
      <div className="container">
        {/* Section Header */}
        <motion.div
          className="services-faq-header text-center mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
        >
          <span className="services-section-badge">
            <MessageCircleQuestion size={16} strokeWidth={2.2} />
            Solar Services FAQ
          </span>

          <h2 className="services-faq-title">
            Frequently Asked{" "}
            <span>Questions</span>
          </h2>

          <p className="services-faq-description">
            Have questions about solar installation, maintenance, battery
            storage, or renewable energy solutions in the UAE? Find answers
            to some of the most common questions below.
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          className="services-faq-wrapper"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <div
            className="accordion services-faq-accordion"
            id="servicesFaqAccordion"
          >
            {faqData.map((faq, index) => (
              <div
                className="accordion-item services-faq-item"
                key={faq.id}
              >
                <h3
                  className="accordion-header"
                  id={`servicesFaqHeading${faq.id}`}
                >
                  <button
                    className={`accordion-button services-faq-button ${
                      index !== 0 ? "collapsed" : ""
                    }`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#servicesFaqCollapse${faq.id}`}
                    aria-expanded={index === 0 ? "true" : "false"}
                    aria-controls={`servicesFaqCollapse${faq.id}`}
                  >
                    <span className="services-faq-number">
                      {String(faq.id).padStart(2, "0")}
                    </span>

                    <span className="services-faq-question">
                      {faq.question}
                    </span>

                    <span className="services-faq-chevron">
                      <ChevronDown size={20} strokeWidth={2} />
                    </span>
                  </button>
                </h3>

                <div
                  id={`servicesFaqCollapse${faq.id}`}
                  className={`accordion-collapse collapse ${
                    index === 0 ? "show" : ""
                  }`}
                  aria-labelledby={`servicesFaqHeading${faq.id}`}
                  data-bs-parent="#servicesFaqAccordion"
                >
                  <div className="accordion-body services-faq-answer">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="services-faq-contact"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          <div>
            <span className="services-faq-contact-label">
              Still have questions?
            </span>

            <h3>
              Talk to our solar experts.
            </h3>

            <p>
              Get professional guidance based on your property, energy
              requirements, and project goals.
            </p>
          </div>

          <Link
            to="/contact"
            className="services-faq-contact-btn"
          >
            Talk to an Expert
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesFAQ;