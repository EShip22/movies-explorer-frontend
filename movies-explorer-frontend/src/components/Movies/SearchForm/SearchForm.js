import "./SearchForm.css";
import find from "../../../images/find.svg";
import React from "react";
import { useLocation } from 'react-router-dom';

const SearchForm = (props) => {
  
  //  введенный текст поиска. сохраняю только после сабмита  
  const [inputSearchStr, setInputSearchStr] = React.useState(localStorage.getItem('searchValue'));
  const [inputSearchStrSaved, setInputSearchStrSaved] = React.useState(localStorage.getItem('searchValueSaved'));

  const [required, setRequired] = React.useState( true );

  const location = useLocation();

  React.useEffect(() => {
    if ( location.pathname === '/movies' ) {
      setRequired(true);
    } else {
      setRequired(false);
    }
  }, [required]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (props.isSavedFilms) {
      props.handleGetMovies(inputSearchStrSaved);
    } else {
      props.handleGetMovies(inputSearchStr);
    }
  }

  return (
    <section className="search-form">
      <form className="search-container" name="search-container" onSubmit={handleSubmit}>
        {
          props.isSavedFilms &&
          <input className="search-container__input"
            type="input"
            onChange={(evt) => {
              setInputSearchStrSaved(evt.target.value);
            }}
            value={inputSearchStrSaved ?? ""}
          >
          </input>
        }
        {
          !props.isSavedFilms &&
          <input className="search-container__input"
            type="input"
            required={required}
            onChange={(evt) => {
              setInputSearchStr(evt.target.value);
            }}
            value={inputSearchStr ?? ""}
          >
          </input>
        }
        <button className="search-container__button">
          <img alt="поиск" src={find} className="search-container__img"></img>
        </button>
      </form>
      <section className="short-films-container">
        <input
          className="short-films-container__checkbox"
          type="checkbox"
          checked={props.isShort}
          id="shortFilms"
          name="shortFilms"
          onChange={()=>{}}
        >
        </input>
        <label
          className="short-films-container__text"
          htmlFor="shortFilms"
          onClick={props.onClickIsShort}
        >
          Короткометражки
        </label>
      </section>
    </section>
  );
}

export default SearchForm;