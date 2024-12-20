import "./Header.scss";
import Logo from "../../assets/Logo/InStock-Logo.svg";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();
  const isActivePath = (basePath) => location.pathname.startsWith(basePath);
  return (
    <header className="header">
      <Link to="/" className="header__logo-link">
        <img src={Logo} alt="InStock Logo" className="header__logo" />
      </Link>
      <nav className="header__nav">
        <Link
          to="/warehouses"
          className={`header__nav-link ${
            isActivePath("/warehouses") || location.pathname === "/"
              ? "header__nav-link--active"
              : ""
          }`}
        >
          Warehouses
        </Link>
        <Link
          to="/inventory"
          className={`header__nav-link ${
            isActivePath("/inventory")
              ? "header__nav-link--active"
              : ""
          }`}
        >
          Inventory
        </Link>
      </nav>
    </header>
  );
}

export default Header;
