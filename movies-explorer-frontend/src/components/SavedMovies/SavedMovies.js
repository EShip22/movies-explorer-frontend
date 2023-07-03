import Header from "../Header/Header";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import React from "react";
import { mainApi } from "../../utils/MainApi";

const SavedMovies = (props) => {
  const [savedFilms, setSavedFilms] = React.useState(JSON.parse(localStorage.getItem('savedFilms')) ,[]);
  const [savedFilmsShow, setSavedFilmsShow] = React.useState([]);

  React.useEffect(() => {
    mainApi.getMovies(localStorage.getItem('jwt'))
      .then((res) => {
        setSavedFilmsShow(res);
        localStorage.setItem('savedFilms', JSON.stringify(res))
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  const handleDelSave = (movie) => {
    mainApi.delLike(movie._id)
      .then((res) => {
        setSavedFilms(savedFilms.filter((elem) => elem._id !== res._id));
        setSavedFilmsShow(savedFilmsShow.filter((elem) => elem._id !== res._id));
        localStorage.setItem('savedFilms', JSON.stringify(savedFilms.filter((elem) => elem._id !== res._id)));
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const handleGetSavedMovies = (inputSearchStr) => {
    let findedMovies = savedFilms?.filter((elem) => {
      return (
        (
          elem.nameRU.toLowerCase().indexOf(inputSearchStr?.toLowerCase()) >= 0 ||
          elem.nameEN.toLowerCase().indexOf(inputSearchStr?.toLowerCase()) >= 0
        )
          &&
        (
          localStorage.getItem('isShortSaved') === 'true' ? elem.duration <= 40 : true
        )
      )
    })

    setSavedFilmsShow(findedMovies);
  }

  return (
    <section>
      <Header />
      <SearchForm
        isSavedFilms={true}
        onClickIsShort={props.onClickIsShort}
        isShortSaved={props.isShortSaved}
        setIsShortSaved={props.setIsShortSaved}
        handleGetSavedMovies={handleGetSavedMovies}
        savedFilms={savedFilms}
        savedFilmsShow={savedFilmsShow}
        setSavedFilmsShow={setSavedFilmsShow}
      />
      <MoviesCardList
        isSaved={true}
        showMoviesList={savedFilmsShow}
        minutesToNormalTime={props.minutesToNormalTime}
        handleDelSave={handleDelSave}
      />
      <Footer />
    </section>
  );
}

export default SavedMovies;