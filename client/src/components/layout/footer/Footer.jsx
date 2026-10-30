import FooterTop from "./FooterTop";
import FooterBottom from "./FooterBottom";

import "./footer.css";

const Footer = () => {
  return (
    <footer
      className="footer-section"
      role="contentinfo"
    >
      <FooterTop />

      <FooterBottom />
    </footer>
  );
};

export default Footer;