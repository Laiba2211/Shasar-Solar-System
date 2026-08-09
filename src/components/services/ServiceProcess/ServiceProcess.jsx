import { motion } from "framer-motion";
import {
  ClipboardList,
  Search,
  PenTool,
  FileCheck2,
  Wrench,
  ShieldCheck,
  Headphones,
} from "lucide-react";

import "./serviceProcess.css";

const processSteps = [
  {
    id: 1,
    number: "01",
    icon: ClipboardList,
    title: "Consultation",
    description:
      "We understand your energy requirements, property type, goals, and budget before recommending the right solar solution.",
  },
  {
    id: 2,
    number: "02",
    icon: Search,
    title: "Site Survey",
    description:
      "Our technical team evaluates the site, roof structure, electrical requirements, shading, and available installation area.",
  },
  {
    id: 3,
    number: "03",
    icon: PenTool,
    title: "Engineering & Design",
    description:
      "Our engineers develop a customized solar system designed for efficiency, safety, performance, and long-term savings.",
  },
  {
    id: 4,
    number: "04",
    icon: FileCheck2,
    title: "DEWA Approval",
    description:
      "We manage the required documentation and approval process to ensure your project follows applicable UAE requirements.",
  },
  {
    id: 5,
    number: "05",
    icon: Wrench,
    title: "Installation",
    description:
      "Certified installation professionals deploy the system using quality equipment and carefully planned installation procedures.",
  },
  {
    id: 6,
    number: "06",
    icon: ShieldCheck,
    title: "Testing & Commissioning",
    description:
      "Every system is thoroughly tested and commissioned to verify safety, performance, connectivity, and operational reliability.",
  },
  {
    id: 7,
    number: "07",
    icon: Headphones,
    title: "Monitoring & Support",
    description:
      "After installation, we continue supporting your solar investment through monitoring, maintenance, and technical assistance.",
  },
];

const ServiceProcess = () => {
  return (
    <section className="service-process-section">
      <div className="container">
        {/* Section Header */}
        <motion.div
          className="row justify-content-center text-center"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
        >
          <div className="col-lg-8">
            <span className="service-process-badge">
              <span className="service-process-badge-dot" />
              Our Proven Process
            </span>

            <h2 className="service-process-title">
              From Solar Consultation to
              <span> Clean Energy</span>
            </h2>

            <p className="service-process-description">
              From initial consultation and site assessment to engineering,
              installation, commissioning, and ongoing support, our structured
              process ensures every solar project is delivered with precision
              and professionalism.
            </p>
          </div>
        </motion.div>

        {/* Process Timeline */}
        <div className="service-process-timeline">
          {processSteps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                className="service-process-step"
                key={step.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.08,
                }}
              >
                {/* Connector */}
                {index !== processSteps.length - 1 && (
                  <div className="service-process-connector">
                    <span />
                  </div>
                )}

                {/* Icon */}
                <div
                  className="service-process-icon"
                  aria-hidden="true"
                >
                  <Icon size={24} strokeWidth={1.8} />
                </div>

                {/* Number */}
                <span className="service-process-number">
                  {step.number}
                </span>

                {/* Content */}
                <div className="service-process-content">
                  <h3>{step.title}</h3>

                  <p>{step.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Message */}
        <motion.div
          className="row justify-content-center"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="col-lg-9">
            <div className="service-process-bottom">
              <div className="service-process-bottom-icon">
                <ShieldCheck size={22} strokeWidth={1.8} />
              </div>

              <div>
                <h3>Built for reliability from day one.</h3>

                <p>
                  Every stage is carefully coordinated to deliver a safe,
                  efficient, and dependable renewable energy system for your
                  property.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceProcess;