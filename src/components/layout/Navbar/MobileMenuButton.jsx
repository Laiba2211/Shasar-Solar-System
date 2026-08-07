import { Menu } from "lucide-react";

const MobileMenuButton = () => {
  return (
    <button
      className="menu-btn"
      aria-label="Open Menu"
    >
      <Menu size={24} />
    </button>
  );
};

export default MobileMenuButton;