import { NavLink } from "react-router-dom";

const menuItems = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "Projects", path: "/projects" },
  {name:"Pricing", path:"/pricing"},
  { name: "Team", path: "/team" },
  // { name: "About Us", path: "/about" },
  { name: "Contact Us", path: "/contact" },
];

const NavbarMenu = ({ mobile = false, onNavigate }) => {
  return (
    <ul className={mobile ? "mobile-menu" : "navbar-menu"}>
      {menuItems.map((item) => (
        <li key={item.path}>
          <NavLink
            to={item.path}
            onClick={onNavigate}
            className={({ isActive }) =>
              isActive ? "nav-link active-link" : "nav-link"
            }
          >
            {item.name}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default NavbarMenu;