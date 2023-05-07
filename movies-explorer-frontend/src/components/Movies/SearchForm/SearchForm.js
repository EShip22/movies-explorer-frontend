import "./SearchForm.css";
import find from "../../../images/find.svg";

const SearchForm = () => {
  return (
    <section className="search-form">
      <div className="search-container">
        <input className="search-container__input"
          type="input"
        >
        </input>
        <button className="search-container__button">
          <img alt="поиск" src={find} className="search-container__img"></img>
        </button>
      </div>
      <div className="short-films-container">
        <input className="short-films-container__checkbox" type="checkbox" id="shortFilms" name="shortFilms"></input>
        <label
          className="short-films-container__text"
          htmlFor="shortFilms"
        >
          Короткометражки
        </label>
      </div>
    </section>
  );
}

export default SearchForm;