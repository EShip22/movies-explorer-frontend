import React from "react";
import './App.css';
import Main from "../Main/Main";
import Movies from '../Movies/Movies';
import SavedMovies from "../SavedMovies/SavedMovies"
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { Routes, Route, useNavigate } from 'react-router-dom';
import { mainApi } from '../../utils/MainApi';
import {CurrentUserContext} from '../../context/CurrentUserContext';
import { useLocation } from 'react-router-dom';


const App = () => {

  let startCurrIndex = 0;

  if (window.innerWidth >= 0 && window.innerWidth <= 767) {
    startCurrIndex = 5;
  } else if (window.innerWidth > 767 && window.innerWidth <= 1279) {
    startCurrIndex = 8;
  } else {
    startCurrIndex =12;
  }

  const [currIndex, setCurrIndex] = React.useState(startCurrIndex);
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = React.useState(false);
  const [moviesList, setMoviesList] = React.useState(JSON.parse(localStorage.getItem('films')) || []);
  const [showMoviesList, setShowMoviesList] = React.useState(JSON.parse(localStorage.getItem('showFilms')) || []);

  //  сохраненные фильмы
  const [moviesListSaved, setMoviesListSaved] = React.useState(JSON.parse(localStorage.getItem('savedFilms')) || []);

  //  короткометражки
  const [isShort, setIsShort] = React.useState((localStorage.getItem('isShort') === 'true') || false);
  const [isShortSaved, setIsShortSaved] = React.useState((localStorage.getItem('isShortSaved') === 'true') || false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [formError, setFormError] = React.useState("");
  const [searchValue, setSearchValue] = React.useState(localStorage.getItem('inputSearchText') || "");

  const [isRender, setIsRender] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => {
    if(isLogin) {
      mainApi.getUserInfo()
        .then((res) => {
          setIsLogin(true);
          setCurrentUser(res);
        })
        .catch((err) => console.log(err))
    }
  }, [isLogin]);

  React.useEffect(() => {
    tokenCheck();
  }, []);

   const tokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      mainApi.getContent(jwt)
        .then((res)=> {
          setIsRender(true);
          if(res) {
            setIsLogin(true);
          }
        })
        .catch((err) => {
          console.log(err)
          setIsRender(true)
        })
    } else {
      setIsRender(true);
    }
  }

  React.useEffect(() => {
    setFormError(formError);
  }, [formError]);

  const handleLogin = (props) => {
    mainApi.authorization(props)
      .then((res) => {
        if (res._id) {
          localStorage.setItem('jwt', res._id);
        }
        setIsLogin(true);
        navigate('/movies');
      })
      .catch((err) => {
        err.then((error) => {
          setFormError(error);
        });
      })
  }

  const handleToggleIsShort = () => {
    if ( location.pathname === '/movies' ) {
      setIsShort(!isShort);
      localStorage.setItem('isShort', (!isShort).toString());
      let filterMovies = moviesList.filter((elem) => {
        return (
          !isShort ? elem.duration <= 40 : true
        )
      })
      setShowMoviesList(filterMovies);
      localStorage.setItem('showFilms', JSON.stringify(filterMovies));
     }
    if (location.pathname === '/saved-movies') {
      setIsShortSaved(!isShortSaved);
      localStorage.setItem('isShortSaved', (!isShortSaved).toString());
    }
  }

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
    mainApi.delLike(getIdByMovieId(movie.id) ?? movie._id)
      .then((res) => {
        setMoviesListSaved(moviesListSaved.filter((elem) => elem._id !== res._id))
        localStorage.setItem('savedFilms', JSON.stringify(moviesListSaved.filter((elem) => elem._id !== res._id)));
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const handleLogout = () => {
    navigate('/');
    localStorage.removeItem('films');
    localStorage.removeItem('showFilms');
    localStorage.removeItem('searchValue');
    localStorage.removeItem('searchValueSaved');
    localStorage.removeItem('jwt');
    localStorage.removeItem('isShort');
    localStorage.removeItem('isShortSaved');
    localStorage.removeItem('savedFilms');
    setIsLogin(false);
  }

  const minutesToNormalTime = (totalMin) => {
    const min = totalMin % 60;
    const hours = Math.floor(totalMin / 60);
    if (hours === 0) {
      return `${min}мин`;
    }
    if (min === 0) {
      return `${hours}ч`;
    }
    return `${hours}ч:${min}мин`;
  } 

  return (
    isRender &&
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Routes>
          <Route
            path="/movies"
            element={
              <ProtectedRoute
                element={
                  function movies() {
                    return (
                      <Movies
                        moviesListSaved={moviesListSaved}
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                        isShort={isShort}
                        isLiked={isLiked}
                        onClickIsShort={handleToggleIsShort}
                        onAddLike={handleAddLike}
                        onDelLike={handleDelLike}
                        currIndex={currIndex}
                        setCurrIndex={setCurrIndex}
                        minutesToNormalTime={minutesToNormalTime}
                        moviesList={moviesList}
                        setMoviesList={setMoviesList}
                        showMoviesList={showMoviesList}
                        setShowMoviesList={setShowMoviesList}
                      />
                    )
                  }
                }
                loggedIn = {isLogin}
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute
                element={
                  function savedMovies() {
                    return (
                      <SavedMovies
                        setMoviesListSaved={setMoviesListSaved}
                        moviesListSaved={moviesListSaved}
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                        isShortSaved={isShortSaved}
                        onClickIsShort={handleToggleIsShort}
                        onDelLike={handleDelLike}
                        minutesToNormalTime={minutesToNormalTime}
                      />
                    )
                  }
                }
                loggedIn = {isLogin}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute
                element={
                  function profile() {
                    return (
                      <Profile
                        setFormError={setFormError}
                        setCurrentUser={setCurrentUser}
                        formError={formError}
                        onLogout={handleLogout}
                      />
                    )
                  }
                }
                loggedIn = {isLogin}
              />
            }
          />
          <Route path="/" element={<Main isLogin={isLogin}/>} />
          <Route
            path="/signup"
            element={
              <Register
                onLogin={handleLogin}
              />
            }
          />
          <Route
            path="/signin"
            element={
              <Login
                onLogin={handleLogin}
                isLogin={isLogin}
                setIsLogin={setIsLogin}
                setFormError={setFormError}
                formError={formError}
              />
            }
          />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;