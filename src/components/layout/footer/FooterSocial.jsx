import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaWhatsapp,
  FaXTwitter,
} from "react-icons/fa6";

import { socialLinks } from "../../../data/footerData";


const iconMap = {
  Facebook: FaFacebookF,
  Instagram: FaInstagram,
  LinkedIn: FaLinkedinIn,
  YouTube: FaYoutube,
  WhatsApp: FaWhatsapp,
  X: FaXTwitter,
};


const FooterSocial = () => {

  return (
    <div className="footer-social d-flex">

      {socialLinks.map((social)=>{

        const Icon = iconMap[social.name];


        if (!Icon) {
          console.warn(
            `Missing icon for: ${social.name}`
          );
          return null;
        }


        return (
          <a
            key={social.name}
            href={social.url}
            className="footer-social-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.name}
          >
            <Icon size={20}/>
          </a>
        );

      })}

    </div>
  );

};


export default FooterSocial;