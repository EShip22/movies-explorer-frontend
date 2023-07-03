import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";
import NotFoundText from "../NotFoundText/NotFoundText";
import { mainApi } from "../../../utils/MainApi";


const MoviesCardList = (props) => {
  const [addCount, setAddCount] = React.useState(0);
  const [clienWidth, setClientWidth] = React.useState(window.innerWidth);
  //  сохраненные фильмы
  const [moviesListSaved, setMoviesListSaved] = React.useState(JSON.parse(localStorage.getItem('savedFilms')) || []);

  const isLiked = (card) => {
    return moviesListSaved?.some(i => {
      return i.movieId === card.id ;
    });
  }

  const handleAddLike = (movie) => {
    mainApi.addLike(movie)
      .then((res) => {
        setMoviesListSaved([...moviesListSaved, res]);
        localStorage.setItem('savedFilms', JSON.stringify([...moviesListSaved, res]));
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const handleDelLike = (movie) => {
    const getIdByMovieId = (movieId) => {
      const id = moviesListSaved?.find((elem) => elem.movieId === movieId)?._id;
      return id;
    }
    mainApi.delLike(getIdByMovieId(movie.id))
      .then((res) => {
        setMoviesListSaved(moviesListSaved.filter((elem) => elem._id !== res._id));

        localStorage.setItem('savedFilms', JSON.stringify(moviesListSaved.filter((elem) => elem._id !== res._id)));
      })
      .catch((err) => {
        console.log(err);
      })
  }

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
        !props.isSaved
          ?
            !props.isNotFound
              ?
                (
                  <ul className="movies-card-list movies-card-list_short-bottom">
                    {
                      //props.moviesList
                      props.showMoviesList
                        ?.slice(0, props.currIndex)
                        ?.map((elem) => {
                          const time = props.minutesToNormalTime(elem.duration);
                          return (
                            <MoviesCard
                              elem={elem}
                              key={elem.id}
                              img={`https://api.nomoreparties.co/${elem.image.url}`}
                              isLiked={isLiked}
                              header={elem.nameRU}
                              trailerLink={elem.trailerLink}
                              duration={time}
                              onAddLike={() => handleAddLike(elem)}
                              onDelLike={() => handleDelLike(elem)}
                              isSaved={false}
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
          :
            (
              <ul className="movies-card-list movies-card-list_short-bottom">
                {
                  props.showMoviesList
                    ?.map((elem) => {
                      const time = props.minutesToNormalTime(elem.duration);
                      return (
                        <MoviesCard
                          elem={elem}
                          key={elem._id}
                          img={elem.image}
                          isLiked={isLiked}
                          header={elem.nameRU}
                          trailerLink={elem.trailerLink}
                          duration={time}
                          onDelLike={() => props.handleDelSave(elem)}
                          isSaved={true}
                        />
                      )
                    })
                }
              </ul>
            )
      }
      {
        !props.isSaved &&
        <section className={`more ${props.currIndex >= props.moviesList?.length ? `more_hide` : ''}`}>
            <button className="more__button" onClick={handleAddCards}>Ещё</button>
        </section>
      }
    </>    
  )
}

export default MoviesCardList;