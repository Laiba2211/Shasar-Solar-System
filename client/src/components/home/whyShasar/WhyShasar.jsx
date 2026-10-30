import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import WhyShasarCard from "./WhyShasarCard";
import whyShasarData from "../../../data/whyShasarData";

import "./whyShasar.css";

const WhyShasar = () => {
  const navigate = useNavigate();

  return (
    <section className="why-shasar-section" id="why-shasar">
      <div className="container">

        {/* =========================
            Section Header
        ========================== */}

        <motion.div
          className="row justify-content-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="col-xl-8 col-lg-9 text-center">

            <span className="why-shasar-badge">
              Why Shasar Solar?
            </span>

            <h2 className="why-shasar-title">

              Trusted Solar Experts
              <br />
              Delivering Smarter Energy Solutions

            </h2>

            <p className="why-shasar-description">

              From consultation and system design to installation and
              lifetime support, we deliver premium solar solutions that
              combine quality, reliability, and long-term value for
              homeowners and businesses.

            </p>

          </div>
        </motion.div>

        {/* =========================
            Features Grid
        ========================== */}

        <div className="row g-4 why-shasar-grid">

          {whyShasarData.map((feature, index) => (

            <div
              className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12 d-flex"
              key={feature.id}
            >
              <WhyShasarCard
                feature={feature}
                index={index}
              />
            </div>

          ))}

        </div>

        {/* =========================
            Bottom CTA
        ========================== */}

        <motion.div
          className="why-shasar-cta text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >

          <h3 className="why-shasar-cta-title">

            Ready to Switch to Clean Solar Energy?

          </h3>

          <p className="why-shasar-cta-text">

            Talk to our experts today and receive a free consultation
            with a customized solar solution tailored to your energy
            requirements.

          </p>

          <button
            type="button"
            className="why-shasar-cta-btn"
            onClick={() => navigate("/contact")}
          >
            Get Free Consultation

            <ArrowRight
              size={18}
              className="ms-2"
            />

          </button>

        </motion.div>

      </div>
    </section>
  );
};

export default WhyShasar;