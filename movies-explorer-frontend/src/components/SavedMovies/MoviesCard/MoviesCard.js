import "./MoviesCard.css";
import closeImg from "../../../images/btnclose.svg";

const MoviesCard = (props) => {
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
      <button className="movies-card__save-btn">
        <img src={closeImg} alt="закрыть" />
      </button>
    </div>
  )
}

export default MoviesCard;