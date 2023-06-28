import "./MoviesCard.css";
import closeImg from "../../../images/btnclose.svg";
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
      <button className="movies-card__save-btn" onClick={props.onDelLike}>
        <img src={closeImg} alt="закрыть" />
      </button>
    </li>
  )
}

export default MoviesCard;