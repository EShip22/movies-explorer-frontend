import "./Header.css";
import logo from "../../images/logo.svg";
import Navigation from "./Navigation/Navigation";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <NavLink to="/">
        <img src={logo} alt="лого" />
      </NavLink>
      <Navigation />
    </header>
  )
}

export default Header;