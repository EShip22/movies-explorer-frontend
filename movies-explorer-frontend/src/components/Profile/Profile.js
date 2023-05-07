import Header from "../Header/Header";
import "./Profile.css";
import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <div className="profile">
      <Header />
      <h2 className="profile__header">Привет, Егор!</h2>
      <div className="about">
        <div className="about-row">
          <p className="about-row__label about-row__label_bold">Имя</p>
          <p className="about-row__label">Егор</p>
        </div>
        <div className="about-row">
          <p className="about-row__label about-row__label_bold">E-mail</p>
          <p className="about-row__label">shipelin.e@yandex.ru</p>
        </div>
      </div>
      <button className="profile__btn-edit">Редактировать</button>
      <Link className="profile__out" to="/signin">Выйти из аккаунта</Link>
    </div>
  )
}

export default Profile;