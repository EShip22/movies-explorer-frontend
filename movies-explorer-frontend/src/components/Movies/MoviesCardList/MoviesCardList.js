import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";
import NotFoundText from "../NotFoundText/NotFoundText";


const MoviesCardList = (props) => {
  const [addCount, setAddCount] = React.useState(0);
  const [clienWidth, setClientWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    if (clienWidth >= 0 && clienWidth <= 767) {
      setAddCount(2);
    } else if (clienWidth > 767 && clienWidth <= 1279) {
      setAddCount(2);
    } else {
      setAddCount(3);
    }
  },[clienWidth]);

  window.addEventListener("resize", () => {
    if ( window.innerWidth >= 320 && window.innerWidth <= 1279) {
      setTimeout(setAddCount(2), 1000);
    } else if (window.innerWidth > 1279) {
      setTimeout(setAddCount(3), 1000);
    }
  });

  const handleAddCards = () => {
    props.setCurrIndex(props.currIndex + addCount);
  }

  return (
    <>
      {
        !props.isNotFound
          ?
        (
          <ul className="movies-card-list movies-card-list_short-bottom">
            {
              //props.moviesList
              props.showMoviesList
                ?.slice(0, props.currIndex)
                ?.map((elem, i) => {
                  const isLiked = props.isLiked(elem);
                  const time = props.minutesToNormalTime(elem.duration);
                  return (
                    <MoviesCard
                      key={elem.id}
                      img={`https://api.nomoreparties.co/${elem.image.url}`}
                      isLiked={isLiked}
                      header={elem.nameRU}
                      trailerLink={elem.trailerLink}
                      duration={time}
                      onAddLike={() => props.onAddLike(elem)}
                      onDelLike={() => props.onDelLike(elem)}
                    />
                  )
                })
            }
            {
              props.isErrorGetFilms &&
              <p>
                Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. 
                Подождите немного и попробуйте ещё раз
              </p>
            }
          </ul>
        )
          :
        (
          <NotFoundText />
        )
      } 
      
      {
       <section className={`more ${props.currIndex >= props.moviesList?.length ? `more_hide` : ''}`}>
          <button className="more__button" onClick={handleAddCards}>Ещё</button>
       </section>
      }
    </>    
  )
}

export default MoviesCardList;