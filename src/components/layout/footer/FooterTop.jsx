import { motion } from "framer-motion";

import FooterLinks from "./FooterLinks";
import FooterContact from "./FooterContact";
import FooterSocial from "./FooterSocial";

import {
  companyInfo,
  quickLinks,
  servicesLinks,
} from "../../../data/footerData";

const FooterTop = () => {
  return (
    <motion.div
      className="footer-top"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
    >
      <div className="container">

        <div className="row g-5">

          {/* Company */}

          <div className="col-lg-4 col-md-6">

            <div className="footer-widget footer-company">

              <div className="footer-logo">

                <h3 className="footer-logo-text">

                  {companyInfo.logo}

                </h3>

                <span className="footer-tagline">

                  {companyInfo.tagline}

                </span>

              </div>

              <p className="footer-description">

                {companyInfo.description}

              </p>

              <FooterSocial />

            </div>

          </div>

          {/* Quick Links */}

          <div className="col-lg-2 col-md-6">

            <FooterLinks
              title="Quick Links"
              links={quickLinks}
            />

          </div>

          {/* Services */}

          <div className="col-lg-3 col-md-6">

            <FooterLinks
              title="Our Services"
              links={servicesLinks}
            />

          </div>

          {/* Contact */}

          <div className="col-lg-3 col-md-6">

            <FooterContact />

          </div>

        </div>

      </div>
    </motion.div>
  );
};

export default FooterTop;