import React from "react";
import Header from "../Header/Header";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Preloader from "./Preloader/Preloader";
import Footer from "../Footer/Footer";
import "./Movies.css";
import { moviesApi } from "../../utils/MoviesApi";

const Movies = (props) => {
  //вместо грид - флекс с переносом?
  const [isLoading, setIsLoading] = React.useState(false);
  const [isErrorGetFilms, setIsErrorGetFilms] = React.useState(false);
  const [isNotFound, setIsNotFound] = React.useState(false);
  const [moviesList, setMoviesList] = React.useState(JSON.parse(localStorage.getItem('films')) || []);

  React.useEffect(() => {
    setMoviesList(
      moviesList?.filter((elem) => {
        return (
          props.isShort ? elem.duration <= 40 : true
        )
      })
    )
  }, [props.isShort]);

  const handleGetMovies = (inputSearchStr) => {
    setIsNotFound(false);
    //  фильмы
    setIsLoading(true);
    moviesApi.getFilms()
      .then((res) => {

        const findedMovies = res.filter((elem) => {
          return (
            (
              elem.nameRU.toLowerCase().indexOf(inputSearchStr.toLowerCase()) >= 0 ||
              elem.nameEN.toLowerCase().indexOf(inputSearchStr.toLowerCase()) >= 0
            )
          )
        })

        let filterMovies = findedMovies.filter((elem) => {
          return (
            props.isShort ? elem.duration <= 40 : true
          )
        })

        //localStorage.setItem('films', JSON.stringify(filterMovies));
        localStorage.setItem('films', JSON.stringify(findedMovies));
        localStorage.setItem('searchValue', inputSearchStr);
        localStorage.setItem('isShort', props.isShort.toString());
        setMoviesList(filterMovies);
        if (filterMovies?.length === 0) {
          setIsNotFound(true);
        }
      })
      .catch(() => {
        setIsErrorGetFilms(true);
        localStorage.removeItem('films');
        localStorage.removeItem('searchValue');
        localStorage.removeItem('isShort');
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  return (
    <section className="movies-container">
      <Header/>
      <SearchForm
        setIsLoading={setIsLoading}
        setIsErrorGetFilms={setIsErrorGetFilms}
        handleGetMovies={handleGetMovies}
        onClickIsShort={props.onClickIsShort}
        isShort={props.isShort}
      />
      <MoviesCardList
        isShort={props.isShort}
        isErrorGetFilms={isErrorGetFilms}
        onAddLike={props.onAddLike}
        onDelLike={props.onDelLike}
        moviesList={moviesList}
        setMoviesList={setMoviesList}
        moviesListSaved={props.moviesListSaved}
        isNotFound={isNotFound}
        currIndex={props.currIndex}
        setCurrIndex={props.setCurrIndex}
        isLiked={props.isLiked}
        minutesToNormalTime={props.minutesToNormalTime}
      />
      {
        isLoading &&
        <Preloader />
      }
      <Footer/>
    </section>
  )
}

export default Movies;