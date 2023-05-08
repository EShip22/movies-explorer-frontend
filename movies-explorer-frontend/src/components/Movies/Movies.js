import Header from "../Header/Header";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Preloader from "./Preloader/Preloader";
import Footer from "../Footer/Footer";
import "./Movies.css";

const Movies = () => {
  return (
    <section className="movies-container">
      <Header/>
      <SearchForm/>
      <MoviesCardList />
      <Preloader/>
      <Footer/>
    </section>
  )
}

export default Movies;