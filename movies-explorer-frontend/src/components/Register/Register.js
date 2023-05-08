import logo from "../../images/logo.svg";
import "./Register.css";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <section className="register">
        <Link to="/" className="register__link">
          <img src={logo} alt="лого" />
        </Link>
        <h2 className="register__header">Добро пожаловать!</h2>
      <form className="register__form" name="register-form">
        <p className="register__label">Имя</p>
        <input className="register__input" type="text" name="name" required minLength="2" placeholder="Имя" maxLength="40" />
        <p className="register__label">E-Mail</p>
        <input className="register__input" type="text" name="email" required minLength="2" placeholder="email" maxLength="40" />
        <p className="register__label">Пароль</p>
        <input className="register__input register__input_error" type="password" placeholder="Пароль"
          id="password-input" name="password" required />
        <p className="register__label register__label_error">что-то пошло не так</p>
      </form>
      <button className="register__button-reg">Зарегистрироваться</button>
      <section className="already-register">
        <p className="already-register__label">Уже зарегистрированы?</p>&nbsp;
        <Link to="/signin" className="already-register__link">Войти</Link>
      </section>
    </section>
  )
}

export default Register;