import { motion } from "framer-motion";
import { ArrowRight, Sun, Building2, Factory, ShieldCheck } from "lucide-react";
import "./servicesOverview.css";

const stats = [
  {
    icon: <Sun size={22} />,
    value: "10+",
    label: "Years Experience",
  },
  {
    icon: <Building2 size={22} />,
    value: "400+",
    label: "Projects Completed",
  },
  {
    icon: <Factory size={22} />,
    value: "125 MW",
    label: "Installed Capacity",
  },
  {
    icon: <ShieldCheck size={22} />,
    value: "100%",
    label: "Client Satisfaction",
  },
];

export default function ServicesOverview() {
  return (
    <section className="services-overview">
      <div className="container">

        <div className="row align-items-center g-5">

          {/* Left */}

          <motion.div
            className="col-lg-6"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >

            <span className="overview-badge">
              Complete Solar Solutions
            </span>

            <h2 className="overview-title">
              Our Comprehensive Solar Solutions
            </h2>

            <p className="overview-text">
              Shasar Solar System delivers complete end-to-end
              <strong> Solar Installation Dubai</strong> services for
              residential, commercial, and industrial clients across the UAE.
              From engineering and DEWA-approved design to installation,
              maintenance, battery storage, and long-term support, we help
              businesses and homeowners transition to clean renewable energy
              with confidence.
            </p>

            <a
              href="#services-grid"
              className="btn btn-warning overview-btn"
            >
              Explore Our Services
              <ArrowRight size={18} />
            </a>

          </motion.div>

          {/* Right */}

          <motion.div
            className="col-lg-6"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >

            <div className="overview-stats">

              {stats.map((item, index) => (

                <motion.div
                  key={index}
                  className="overview-stat-card"
                  animate={{
                    y: [0, -8, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: index * 0.4,
                  }}
                >

                  <div className="stat-icon">
                    {item.icon}
                  </div>

                  <h3>{item.value}</h3>

                  <p>{item.label}</p>

                </motion.div>

              ))}

            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}