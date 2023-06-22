import Header from "../Header/Header";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import React from "react";

const SavedMovies = (props) => {

  const [savedFilmsShow, setSavedFilmsShow] = React.useState(props.moviesListSaved);

  React.useEffect(() => {
    
    if (!localStorage.getItem('searchValueSaved')) {
      setSavedFilmsShow(props.moviesListSaved);
    }

    setSavedFilmsShow(
      savedFilmsShow?.filter((elem) => {
        return (
          (
            localStorage.getItem('searchValueSaved') 
            ?
              elem.nameRU?.toLowerCase().indexOf(localStorage.getItem('searchValueSaved')?.toLowerCase()) >= 0 ||
              elem.nameEN?.toLowerCase().indexOf(localStorage.getItem('searchValueSaved')?.toLowerCase()) >= 0
            :
              true
          ) &&
          (
            props.isShort ? elem.duration <= 40 : true
          )
        )
      })
    )
  }, [props.isShort]);


  const handleGetMovies = (inputSearchStr) => {
    if (inputSearchStr?.length === 0) {
      setSavedFilmsShow(props.moviesListSaved);
      localStorage.setItem('searchValueSaved', inputSearchStr);
      return;
    }
    let filterMovies = props.moviesListSaved?.filter((elem) => {
      return (
        (
          elem.nameRU.toLowerCase().indexOf(inputSearchStr?.toLowerCase()) >= 0 ||
          elem.nameEN.toLowerCase().indexOf(inputSearchStr?.toLowerCase()) >= 0
        ) &&
        (
          props.isShort ? elem.duration <= 40 : true
        )
      )
    });

    localStorage.setItem('searchValueSaved', inputSearchStr);
    setSavedFilmsShow(filterMovies );
  }

  return (
    <section>
      <Header />
      <SearchForm
        isSavedFilms={true}
        savedFilms={props.moviesListSaved}
        setSavedFilms={props.setSavedFilms}
        onClickIsShort={props.onClickIsShort}
        isShort={props.isShort}
        handleGetMovies={handleGetMovies}
      />
      <MoviesCardList
        moviesListSaved={savedFilmsShow}
        onDelLike={props.onDelLike}
      />
      <Footer />
    </section>
  );
}

export default SavedMovies;