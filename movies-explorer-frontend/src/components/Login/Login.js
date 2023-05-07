import logo from "../../images/logo.svg";
import "./Login.css";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <section className="login">
      <Link className="login__link" to="/">
        <img src={logo} alt="лого" />
      </Link>
      <h2 className="login__header">Рады видеть!</h2>
      <form className="login__form" name="login-form">
        <p className="login__label">E-Mail</p>
        <input className="login__input" type="text" name="email" required minLength="2" placeholder="email" maxLength="40" />
        <p className="login__label">Пароль</p>
        <input className="login__input login__input_error" type="password" placeholder="Пароль"
          id="password-input" name="password" required />
      </form>
      <button className="login__button-reg">Войти</button>
      <div className="already-login">
        <p className="already-login__label">Еще не зарегистрированы?</p>&nbsp;
        <Link to="/signup" className="already-login__link">Регистрация</Link>
      </div>
    </section>
  )
}

export default Login;