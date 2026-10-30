import {
  Phone,
  Mail,
  MapPin,
  Clock,
} from "lucide-react";

import { contactInfo } from "../../../data/footerData";

const FooterContact = () => {
  return (
    <div className="footer-widget">

      <h5 className="footer-widget-title">
        Contact Us
      </h5>

      <address className="footer-contact">

        <div className="footer-contact-item">

          <Phone size={18} />

          <span>{contactInfo.phone}</span>

        </div>

        <div className="footer-contact-item">

          <Mail size={18} />

          <span>{contactInfo.email}</span>

        </div>

        <div className="footer-contact-item">

          <MapPin size={18} />

          <span>{contactInfo.address}</span>

        </div>

        <div className="footer-contact-item">

          <Clock size={18} />

          <span>{contactInfo.workingHours}</span>

        </div>

      </address>

    </div>
  );
};

export default FooterContact;