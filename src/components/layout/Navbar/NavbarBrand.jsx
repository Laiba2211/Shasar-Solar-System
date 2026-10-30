import { SunMedium } from "lucide-react";

const NavbarBrand = () => {
  return (
    <a href="/" className="navbar-brand custom-brand">

      <div className="brand-icon">
        <SunMedium size={18} />
      </div>

      <div className="brand-content">
        <span className="brand-title">SHASAR</span>
        <span className="brand-subtitle">SOLAR</span>
      </div>

    </a>
  );
};

export default NavbarBrand;