import React from "react";
import Header from "../Header/Header";
import "./Profile.css";
import { Link } from "react-router-dom";
import { CurrentUserContext } from '../../context/CurrentUserContext';
import { mainApi } from "../../utils/MainApi";

const Profile = (props) => {
  const currentUser = React.useContext(CurrentUserContext);
  const [isEdit, setIsEdit] = React.useState(false);

  const [formName, setFormName] = React.useState(currentUser.name ?? "");
  const [formNameError, setFormNameError] = React.useState("");
  const [formEmail, setFormEmail] = React.useState(currentUser.email ?? "");
  const [formEmailError, setFormEmailError] = React.useState("");
  const [isBtnDisabled, setIsBtnDisabled] = React.useState(true);

  const handleChangeName = (e) => {
    setFormName(e.target.value);
  }

  const handleChangeEmail = (e) => {
    setFormEmail(e.target.value);
  }

  const isDisabled = () => {
    if (checkEmailValidity() &&
        checkNameValidity() &&
        (
          formEmail !== currentUser.email ||
          formName !== currentUser.name
        ) &&
        formEmail?.length > 0 &&
        formName?.length > 0) {
      return false;
    }
    return true;
  }

  React.useEffect(() => {
    setIsBtnDisabled(isDisabled());
    props.setFormError('');
  },[formEmail, formName]);

  React.useEffect(() => {
    if (checkNameValidity()) {
      setFormNameError("");
    } else {
      setFormNameError("имя должно содержать только буквы, пробел или дефис");
    }
    if (formName.length === 0) {
      setFormNameError("введите имя");
    } else {
      if (formName.length < 2 || formName.length > 30) {
        setFormNameError("длина поля долна быть от 2 до 30 символов");
      }
    }
  }, [formName]);

  React.useEffect(() => {
    if (checkEmailValidity()) {
      setFormEmailError("");
    } else {
      setFormEmailError("некорректный email");
    }
  }, [formEmail]);

  const checkEmailValidity = React.useCallback(() => {
    if (formEmail?.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/g) || formEmail?.length === 0 ) {
      return true;
    } else {
      return false;
    }
  });

  const checkNameValidity = React.useCallback(() => {
    if (formName?.match(/[a-zA-ZА-Яа-яЁё -]+$/g) || formName?.length === 0 ) {
      return true;
    } else {
      return false;
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdateUser({name: formName, email: formEmail});
  };

  const handleUpdateUser = (userInfo) => {
    mainApi.setUserInfo({
      name: userInfo.name,
      email: userInfo.email
    })
      .then((res) => {
        props.setCurrentUser(res);
        alert('данные пользователя успешно обновлены');
      })
      .catch((err) => {
        err.then((error) => {
          setFormEmailError(error);
        });
      });
  }

  return (
    <section className="profile">
      <Header getSavedMovies={props.getSavedMovies} />
      <h2 className="profile__header">Привет, {currentUser?.name} !</h2>
      <form className="about" name="profile-form" 
        onSubmit={handleSubmit}>
        <section className={`about-row ${isEdit ? "about-row_error" : ""}`}>
          {
            isEdit
            ?
              <>
                <input className={`profile__input ${checkNameValidity() && formName?.length > 1 && formName?.length < 31 ? '' : 'profile__input_error'}`} type="edit" placeholder="Имя" value={formName} 
                  onChange={handleChangeName}/>
                <p className="about-row__label about-row__label_error">{formNameError}</p>
              </>
            :
              <>
                <p className="about-row__label about-row__label_bold">Имя</p>
                <p className="about-row__label">{currentUser?.name}</p>
              </>
          }
        </section>
        <section className={`about-row ${isEdit ? "about-row_error" : ""}`}>
          {
            isEdit
            ?
              <>
                <input className={`profile__input ${checkEmailValidity() ? '' : 'profile__input_error'}`} type="edit" placeholder="email" value={formEmail}
                  onChange={handleChangeEmail} />
                <p className="about-row__label about-row__label_error">{formEmailError ?? props.formError}</p>
              </>
            :
              <>
                <p className="about-row__label about-row__label_bold">E-mail</p>
                <p className="about-row__label">{currentUser?.email}</p>
              </>
          }
        </section>
        {
          isEdit
          ?
            <input className={`profile__button-save ${isBtnDisabled ? 'profile__button-reg_disabled' : ''}`} type="submit" value="Сохранить"></input>
          :
            <button className="profile__btn-edit" onClick={() => setIsEdit(true)}>Редактировать</button>
        }
      </form>
      <Link className="profile__out" onClick={props.onLogout} >Выйти из аккаунта</Link>
    </section>
  )
}

export default Profile;