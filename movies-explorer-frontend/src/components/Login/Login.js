import logo from "../../images/logo.svg";
import "./Login.css";
import { Link } from "react-router-dom";
import React from "react";

const Login = (props) => {

  const [formEmail, setFormEmail] = React.useState("");
  const [formEmailError, setFormEmailError] = React.useState("");
  const [formPassword, setFormPassword] = React.useState("");
  const [isBtnDisabled, setIsBtnDisabled] = React.useState(true);

  React.useEffect(() => {
    if (checkEmailValidity()) {
      setFormEmailError("");
    } else {
      setFormEmailError("некорректный email");
    }
  }, [formEmail]);

  const checkEmailValidity = React.useCallback(() => {
    if (formEmail.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/g) || formEmail?.length === 0 ) {
      return true;
    } else {
      return false;
    }
  });


  const handleChangeEmail = (e) => {
    setFormEmail(e.target.value);
  }
  const handleChangePassword = (e) => {
    setFormPassword(e.target.value);
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // все очистить, чтобы при смене юзера не осталось данных, после предыдущего
    localStorage.removeItem('films');
    localStorage.removeItem('searchValue');
    localStorage.removeItem('searchValueSaved');
    localStorage.removeItem('jwt');
    localStorage.removeItem('isShort');
    localStorage.removeItem('savedFilms');

    props.onLogin({
      email: formEmail,
      password: formPassword
    })
  }

  React.useEffect(() => {
    setIsBtnDisabled(isDisabled())
    props.setFormError('');
  },[formEmail, formPassword]);

  const isDisabled = () => {
    if (checkEmailValidity() && formEmail?.length > 0 && formPassword.length > 0) {
      return false;
    }
    return true;
  }

  return (
    <section className="login">
      <Link className="login__link" to="/">
        <img src={logo} alt="лого" />
      </Link>
      <h2 className="login__header">Рады видеть!</h2>
      <form className="login__form" name="login-form" onSubmit={handleSubmit}>
        <p className="login__label">E-Mail</p>
        <input className="login__input" type="text" name="email" required minLength="2" placeholder="email" maxLength="40" 
          onChange={handleChangeEmail} value={formEmail}/>
        <p className="login__label login__label_error">{formEmailError}</p>
        <p className="login__label">Пароль</p>
        <input className="login__input" type="password" placeholder="Пароль"
          id="password-input" name="password" required onChange={handleChangePassword} value={formPassword}/>
        <p className="login__label login__label_error">{props.formError}</p>
        <input className={`login__button-reg ${isBtnDisabled ? 'login__button-reg_disabled' : ''}`} type="submit" value="Войти"></input>
      </form>
      <section className="already-login">
        <p className="already-login__label">Еще не зарегистрированы?</p>&nbsp;
        <Link to="/signup" className="already-login__link">Регистрация</Link>
      </section>
    </section>
  )
}

export default Login;