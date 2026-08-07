import { NavLink } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const FooterLinks = ({ title, links }) => {
  return (
    <div className="footer-widget">

      <h5 className="footer-widget-title">
        {title}
      </h5>

      <ul className="list-unstyled footer-links">

        {links.map((link) => (

          <li key={link.title}>

            <NavLink
              to={link.path}
              className="footer-link"
            >

              <ChevronRight
                size={15}
                className="footer-link-icon"
              />

              {link.title}

            </NavLink>

          </li>

        ))}

      </ul>

    </div>
  );
};

export default FooterLinks;