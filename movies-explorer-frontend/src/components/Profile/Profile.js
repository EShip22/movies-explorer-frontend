import Header from "../Header/Header";
import "./Profile.css";
import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <section className="profile">
      <Header />
      <h2 className="profile__header">Привет, Егор!</h2>
      <section className="about">
        <section className="about-row">
          <p className="about-row__label about-row__label_bold">Имя</p>
          <p className="about-row__label">Егор</p>
        </section>
        <section className="about-row">
          <p className="about-row__label about-row__label_bold">E-mail</p>
          <p className="about-row__label">shipelin.e@yandex.ru</p>
        </section>
      </section>
      <button className="profile__btn-edit">Редактировать</button>
      <Link className="profile__out" to="/signin">Выйти из аккаунта</Link>
    </section>
  )
}

export default Profile;