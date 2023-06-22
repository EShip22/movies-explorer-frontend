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

  //  сохраненные фильмы
  const [moviesListSaved, setMoviesListSaved] = React.useState(JSON.parse(localStorage.getItem('savedFilms')) || []);

  //  короткометражки
  const [isShort, setIsShort] = React.useState((localStorage.getItem('isShort') === 'true') || false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [formError, setFormError] = React.useState("");
  const [searchValue, setSearchValue] = React.useState(localStorage.getItem('inputSearchText') || "");

  React.useEffect(() => {
    if(isLogin) {
      mainApi.getUserInfo()
        .then((res) => {
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
          if(res) {
            setIsLogin(true);
          }
        })
        .catch((err) => console.log(err))
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
    setIsShort(!isShort);
    localStorage.setItem('isShort', (!isShort).toString())
  }

  const handleAddLike = (movie) => {
    mainApi.addLike(movie)
      .then((res) => {
       mainApi.getMovies(localStorage.getItem('jwt'))
          .then((res) => {
            setMoviesListSaved(res);
            localStorage.setItem('savedFilms', JSON.stringify(res));
          })
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const handleDelLike = (movie) => {
    const getIdByMovieId = (movieId) => {
      const id = moviesListSaved?.find((elem) => elem.movieId ===movieId)?._id;
      return id;
    }
    mainApi.delLike(getIdByMovieId(movie.id) ?? movie._id)
      .then((res) => {
        mainApi.getMovies(localStorage.getItem('jwt'))
          .then((result) => {
            setMoviesListSaved(result);
          });
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const handleLogout = () => {
    localStorage.removeItem('films');
    localStorage.removeItem('searchValue');
    localStorage.removeItem('searchValueSaved');
    localStorage.removeItem('jwt');
    localStorage.removeItem('isShort');
    localStorage.removeItem('savedFilms');
  }

  // пока не пройдет проверка токена не отрисовывать компоненты
  if (!isLogin) {
    return (
      <div className='page'>
        <Routes>
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
        </Routes>
      </div>
    )
  }

  return (
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
                        onClickIsShort={handleToggleIsShort}
                        onAddLike={handleAddLike}
                        onDelLike={handleDelLike}
                        currIndex={currIndex}
                        setCurrIndex={setCurrIndex}
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
                        isShort={isShort}
                        onClickIsShort={handleToggleIsShort}
                        onDelLike={handleDelLike}
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
          <Route path="/" element={<Main/>} />
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
