import { Link } from "react-router-dom";
import { ArrowRight, PhoneCall } from "lucide-react";

const ServicesHeroButtons = () => {
  return (
    <div className="services-hero-buttons d-flex flex-wrap justify-content-center gap-3">

      <Link
        to="/contact"
        className="btn services-btn-primary"
      >
        Get Free Quote

        <ArrowRight size={18}/>
      </Link>

      <Link
        to="/contact"
        className="btn services-btn-secondary"
      >
        <PhoneCall size={18}/>
        Talk to Solar Expert
      </Link>

    </div>
  );
};

export default ServicesHeroButtons;