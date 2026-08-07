import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

import {
  companyInfo,
  footerBottomLinks,
  developerInfo,
} from "../../../data/footerData";

const FooterBottom = () => {
  return (
    <motion.div
      className="footer-bottom"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.2 }}
      viewport={{ once: true }}
    >
      <div className="container">

        <div className="row align-items-center gy-3">

          {/* Copyright */}

          <div className="col-lg-4 col-md-12">

            <p className="footer-copyright mb-0">

              {companyInfo.copyright}

            </p>

          </div>

          {/* Footer Links */}

          <div className="col-lg-4 col-md-12">

            <nav
              className="footer-bottom-nav d-flex justify-content-center flex-wrap"
              aria-label="Footer Policies"
            >

              {footerBottomLinks.map((link) => (

                <NavLink
                  key={link.title}
                  to={link.path}
                  className="footer-bottom-link"
                >
                  {link.title}
                </NavLink>

              ))}

            </nav>

          </div>

          {/* Developer */}

          <div className="col-lg-4 col-md-12 text-lg-end text-center">

            <p className="footer-developer mb-0">

              {developerInfo.text}

            </p>

          </div>

        </div>

      </div>
    </motion.div>
  );
};

export default FooterBottom;