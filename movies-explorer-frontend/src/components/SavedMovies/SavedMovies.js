import Header from "../Header/Header";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

const SavedMovies = () => {
  return (
    <section>
      <Header />
      <SearchForm />
      <MoviesCardList />
      <Footer />
    </section>
  )
}

export default SavedMovies;