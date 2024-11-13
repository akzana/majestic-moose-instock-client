import "./Header.scss";
import Logo from "../../assets/Logo/InStock-Logo.svg";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <Link to="/" className="header__logo-link">
        <img src={Logo} alt="InStock Logo" className="header__logo" />
      </Link>
      <nav className="header__nav">
        <Link to="/warehouses" className="header__nav-link header__nav-link--warehouses">
          Warehouses
        </Link>
        <Link to="/inventory" className="header__nav-link header__nav-link--inventory">
          Inventory
        </Link>
      </nav>
    </header>
  );
}

export default Header;
