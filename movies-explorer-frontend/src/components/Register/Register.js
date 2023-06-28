import React from "react";
import logo from "../../images/logo.svg";
import "./Register.css";
import { Link } from "react-router-dom";
import { mainApi } from "../../utils/MainApi";

const Register = (props) => {

  const [formName, setFormName] = React.useState("");
  const [formNameError, setFormNameError] = React.useState("");
  const [formEmail, setFormEmail] = React.useState("");
  const [formEmailError, setFormEmailError] = React.useState("");
  const [formPassword, setFormPassword] = React.useState("");
  const [formError, setFormError] = React.useState("");
  const [isBtnDisabled, setIsBtnDisabled] = React.useState(true);

  React.useEffect(() => {
    if (checkNameValidity()) {
      setFormNameError("");
    } else {
      setFormNameError("имя должно содержать только буквы, пробел или дефис");
    }
    if (formName.length === 0) {
      setFormNameError("необходимо ввести имя");
    } 
    if (formName?.length === 1 || formName?.length > 30) {
      setFormNameError("длина должна быть от 2 до 30 символов");
    } 
  }, [formName]);

  React.useEffect(() => {
    if (checkEmailValidity()) {
      setFormEmailError("");
    } else {
      setFormEmailError("некорректный email");
    }
    if (formEmail.length === 0) {
      setFormEmailError("необходимо ввести email");
    } 
  }, [formEmail]);

  const checkNameValidity = React.useCallback(() => {
    if (formName.match(/[a-zA-ZА-Яа-яЁё -]+$/g) || formName?.length === 0 ) {
      return true;
    } else {
      return false;
    }
  });

  const checkEmailValidity = React.useCallback(() => {
    if (formEmail.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/g) || formEmail?.length === 0 ) {
      return true;
    } else {
      return false;
    }
  });

  const handleChangeName = (e) => {
    setFormName(e.target.value);
  }  
  
  const handleChangeEmail = (e) => {
    setFormEmail(e.target.value);
  }
  const handleChangePassword = (e) => {
    setFormPassword(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    mainApi.register({
      name: formName,
      password: formPassword,
      email: formEmail
    })
      .then((res) => {
        props.onLogin({
          email: formEmail,
          password: formPassword
        })
      })
      .catch((err) => {
        err.then((error) => {
          setFormError(error);
        });
      });
  }

  React.useEffect(() => {
    setIsBtnDisabled(isDisabled())
    setFormError('');
  },[formName, formEmail, formPassword]);

  const isDisabled = () => {
    if (checkEmailValidity() &&
        //formEmail?.length > 0 && 
        checkNameValidity() && 
        formName?.length > 1 && 
        formName?.length <= 30 && 
        formPassword.length > 0) {
      return false;
    }
    return true;
  }

  return (
    <section className="register">
        <Link to="/" className="register__link">
          <img src={logo} alt="лого" />
        </Link>
        <h2 className="register__header">Добро пожаловать!</h2>
      <form className="register__form" name="register-form" onSubmit={handleSubmit}>
        <p className="register__label">Имя</p>
        <input className={`register__input ${checkNameValidity() && formName?.length > 1 && formName?.length < 31 ? '' : 'register__input_error'}`} 
          type="text" name="name" required minLength="2" placeholder="Имя" maxLength="40"
          onChange={handleChangeName} />
        <p className="register__label register__label_error">{formNameError}</p>
        <p className="register__label">E-Mail</p>
        <input className={`register__input ${checkEmailValidity() ? '' : 'register__input_error'}`} type="text" name="email" required minLength="2"
          placeholder="email" maxLength="40" onChange={handleChangeEmail}
        />
        <p className="register__label register__label_error">{formEmailError}</p>
        <p className="register__label">Пароль</p>
        <input className={`register__input ${formError.length > 0 ? 'register__input_error' : ''}`} type="password" placeholder="Пароль"
          id="password-input" name="password" required onChange={handleChangePassword}/>
        <p className="register__label register__label_error">{formError}</p>
        <input className={`register__button-reg ${isBtnDisabled ? 'register__button-reg_disabled' : ''}`} type="submit" value="Зарегистрироваться" />
      </form>
      <section className="already-register">
        <p className="already-register__label">Уже зарегистрированы?</p>&nbsp;
        <Link to="/signin" className="already-register__link">Войти</Link>
      </section>
    </section>
  )
}

export default Register;