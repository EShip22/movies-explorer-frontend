import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";
import img1 from "../../../images/pic1.png";
import img2 from "../../../images/pic2.png";
import img3 from "../../../images/pic3.png";

const MoviesCardList = () => {
  return (
    <section className="movies-card-list movies-card-list_saved">
      <MoviesCard img={img1} isSaved={true}/>
      <MoviesCard img={img2} isSaved={true}/>
      <MoviesCard img={img3} isSaved={false}/>
    </section>
  )
}

export default MoviesCardList;