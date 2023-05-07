import Header from "../Header/Header";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

const SavedMovies = () => {
  return (
    <div>
      <Header />
      <SearchForm />
      <MoviesCardList />
      <Footer />
    </div>
  )
}

export default SavedMovies;