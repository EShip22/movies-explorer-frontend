import React from "react";
import { Link } from "react-router-dom";
import profile from "../../../images/profile.svg";
import burgerMenu from "../../../images/burger-menu.svg";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import "./Navigation.css";



const Navigation = () => {
  const [isShowMenu, setIsShowMenu] = React.useState(false);

  return (
    <nav className="nav">
      <section className="nav-films">
        <Link className="nav__link nav__link_films" to="/movies">Фильмы</Link>
        <Link className="nav__link" to="/saved-movies">Сохранённые фильмы</Link>
      </section>
      <section className="nav-profile">
        <Link className="nav__link" to="/profile">Аккаунт</Link>
        <Link className="nav__link" to="/signup">
          <img className="nav-profile__img" src={profile} alt="профиль" />
        </Link>
      </section>
      <Link
        className="nav__menu-burger-link"
        onClick={() => {
          setIsShowMenu(true);
        }}
      >
        <img className="nav__menu-burger-img" src={burgerMenu} alt="профиль" />
      </Link>
      {
        isShowMenu &&
        <section className="cover">
          <BurgerMenu
            isShowMenu={isShowMenu}
            setIsShowMenu={setIsShowMenu}
          />
        </section>
      }
    </nav>
  )
}

export default Navigation;