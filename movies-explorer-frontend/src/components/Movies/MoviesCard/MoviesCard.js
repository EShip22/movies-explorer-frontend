import "./MoviesCard.css";
import React from "react";
import { Link } from "react-router-dom";
import Like  from "./Like";

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
      <Like
        elem={props.elem}
        isLiked={props.isLiked}
        onDelLike={props.onDelLike}
        onAddLike={props.onAddLike}
      >
      </Like>
    </li>
  )
}

export default MoviesCard;