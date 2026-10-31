import useTheme from "../../../hooks/useTheme";

const NavbarBrand = () => {
  const { isDark } = useTheme();

  return (
    <a href="/" className="navbar-brand custom-brand">
      <img
        src={isDark ? "/Shasar_logo_dark.png" : "/Shasar_logo.png"}
        alt="Shasar Solar Energy System"
        className="brand-logo"
      />
    </a>
  );
};

export default NavbarBrand;