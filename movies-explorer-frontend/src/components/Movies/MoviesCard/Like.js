import checkImg from "../../../images/checkFilm.svg";
import closeImg from "../../../images/btnclose.svg";

import "./MoviesCard.css";

const Like = (props) => {
  return (
    <>
      {
        props.isSaved
          ?
            <button className="movies-card__save-btn" onClick={props.onDelLike}>
              <img src={closeImg} alt="Чекбокс" />
            </button>
          :
            props.isLiked(props.elem)
            ?
              <button className="movies-card__btn movies-card__btn_withcheck" onClick={props.onDelLike}>
                <img src={checkImg} alt="Чекбокс" />
              </button>
            :
              <button className="movies-card__btn movies-card__btn_withtext" onClick={props.onAddLike}>
                Сохранить
              </button>





      }
    </>
  )
}

export default Like