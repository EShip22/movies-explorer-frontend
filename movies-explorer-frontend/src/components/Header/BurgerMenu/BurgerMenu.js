import "./BurgerMenu.css";
import close from "../../../images/close.png";
import account from "../../../images/account.svg";
import { NavLink } from "react-router-dom";

const BurgerMenu = (props) => {
  return (
    <div className="burger-menu">
      <img
        className="burger-menu__close"
        src={close}
        alt="закрыть"
        onClick={() => {
          props.setIsShowMenu(false);
        }}
      />
      <NavLink className="burger-menu__link-menu burger-menu__link-menu_first" to="/">Главная</NavLink>
      <NavLink className="burger-menu__link-menu burger-menu__link-menu_is-active" to="/movies">Фильмы</NavLink>
      <NavLink className="burger-menu__link-menu" to="/saved-movies">Сохраненные фильмы</NavLink>
      <NavLink className="burger-menu__link-account" to="/profile">
        Аккаунт
        <img
          className="burger-menu__account"
          src={account}
          alt="аккаунт"
        />
      </NavLink>
    </div>
  )
}

export default BurgerMenu;