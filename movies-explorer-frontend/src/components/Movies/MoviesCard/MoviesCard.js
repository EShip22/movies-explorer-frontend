import "./MoviesCard.css";
import checkImg from "../../../images/checkFilm.svg";
import React from "react";
import { Link } from "react-router-dom";

const MoviesCard = (props) => {
  return (
    <li className="movies-card">
      <header className="card-header">
        <h3 className="card-header__text-head">
          {props.header}
        </h3>
        <p className="card-header__text-time">
          {`${props.duration}`}
        </p>
      </header>
      <Link to={props.trailerLink} target="_blank">
        <img className="movies-card__img" alt="кадр из фильма" src={props.img} />
      </Link>
      {
        props.isLiked
          ?
            <button className="movies-card__btn movies-card__btn_withcheck" onClick={props.onDelLike}>
              <img src={checkImg} alt="Чекбокс" />
            </button>
          :
            <button className="movies-card__btn movies-card__btn_withtext" onClick={props.onAddLike}>
              Сохранить
            </button>
      }
    </li>
  )
}

export default MoviesCard;