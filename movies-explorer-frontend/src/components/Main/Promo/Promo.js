import logo from "../../../images/logo.svg";
import headerImg from "../../../images/text__COLOR_landing-logo.svg"
import "./Promo.css";
import { Link } from "react-router-dom";

const Promo = (props) => {
  return (
    <section className="background-container">
     <header className="promo">
        <section className="title">
          <img alt="лого" src={logo} />
          <section className="auth">
            {
              props.isLogin
                ?
              <>
                <Link className="auth__signup" to="/movies">Фильмы</Link>
                <Link className="auth__signup" to="/saved-movies">Сохраненные фильмы</Link>
                <Link className="auth__signup" to="/profile">Аккаунт</Link>
              </>
                :
              <>
                <Link className="auth__signup" to="/signup">Регистрация</Link>
                <Link to="/signin">
                  <button className="auth__signin" type="button">Войти</button>
                </Link>
              </>
            }
          </section>
        </section>
        <section className="center-block">
          <section className="main-text">
            <p className="main-text__header">Учебный проект студента факультета Веб-разработки.</p>
            <p className="main-text__label">
              Листайте ниже, чтобы узнать больше про этот проект и его создателя.
            </p>
          </section>
          <img className="center-block__planet-img" src={headerImg} alt="веб"/>
        </section>
        <button type="button" className="promo__button">Узнать больше</button>
      </header>
    </section>
  );
}

export default Promo;