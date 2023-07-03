import React from "react";
import Header from "../Header/Header";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Preloader from "./Preloader/Preloader";
import Footer from "../Footer/Footer";
import "./Movies.css";
import { moviesApi } from "../../utils/MoviesApi";

const Movies = (props) => {

  const [isLoading, setIsLoading] = React.useState(false);
  const [isErrorGetFilms, setIsErrorGetFilms] = React.useState(false);
  const [isNotFound, setIsNotFound] = React.useState(false);

  const handleGetMovies = (inputSearchStr) => {
    setIsNotFound(false);
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
        props.setMoviesList(findedMovies);
        localStorage.setItem('films', JSON.stringify(findedMovies));

        let filterMovies = findedMovies.filter((elem) => {
          return (
            props.isShort ? elem.duration <= 40 : true
          )
        })

        localStorage.setItem('showFilms', JSON.stringify(filterMovies));
        localStorage.setItem('searchValue', inputSearchStr);
        localStorage.setItem('isShort', props.isShort.toString());
        props.setShowMoviesList(filterMovies);
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
        handleGetSavedMovies={props.handleGetSavedMovies}
      />
      <MoviesCardList
        isShort={props.isShort}
        isErrorGetFilms={isErrorGetFilms}
        onAddLike={props.onAddLike}
        onDelLike={props.onDelLike}
        moviesList={props.moviesList}
        setMoviesList={props.setMoviesList}
        moviesListSaved={props.moviesListSaved}
        isNotFound={isNotFound}
        currIndex={props.currIndex}
        setCurrIndex={props.setCurrIndex}
        isLiked={props.isLiked}
        minutesToNormalTime={props.minutesToNormalTime}
        showMoviesList={props.showMoviesList}
        setShowMoviesList={props.setShowMoviesList}
        isSaved={false}
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