import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

const MoviesCardList = (props) => {

  return (
    <>
      <ul className="movies-card-list movies-card-list_saved">
        {
          props.moviesListSaved?.map((elem, i) => {
            const time = props.minutesToNormalTime(elem.duration);
            return (
              <MoviesCard
                key={elem._id}
                img={elem.image}
                isSaved={false}
                header={elem.nameRU}
                trailerLink={elem.trailerLink}
                duration={time}
                onDelLike={() => {props.onDelLike(elem)}}
              />
            );
          })
        }
      </ul>
    </>
  )
}

export default MoviesCardList;