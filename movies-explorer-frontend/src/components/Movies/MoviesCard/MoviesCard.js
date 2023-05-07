import "./MoviesCard.css";
import checkImg from "../../../images/checkFilm.svg";
import React from "react";

const MoviesCard = (props) => {

  const [isSaved, setIsSaved] = React.useState(props.isSaved);
  const setSaved = () => {
    return setIsSaved(!isSaved);
  }

  return (
    <div className="movies-card">
      <header className="card-header">
        <h3 className="card-header__text-head">
          В погоне за Бенкси
        </h3>
        <p className="card-header__text-time">
          27 минут
        </p>
      </header>
      <img className="movies-card__img" alt="кадр из фильма" src={props.img} />
      {
        isSaved
        ?
          <button className="movies-card__btn movies-card__btn_withcheck" onClick={setSaved}>
            <img src={checkImg} alt="Чекбокс" />
          </button>
        :
          <button className="movies-card__btn movies-card__btn_withtext" onClick={setSaved}>
            Сохранить
          </button>
      }
    </div>
  )
}

export default MoviesCard;