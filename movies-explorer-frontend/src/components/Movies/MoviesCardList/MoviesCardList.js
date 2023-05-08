import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";
import img1 from "../../../images/pic1.png";
import img2 from "../../../images/pic2.png";
import img3 from "../../../images/pic3.png";
import img4 from "../../../images/pic4.png";
import img5 from "../../../images/pic5.png";
import img6 from "../../../images/pic6.png";
import img7 from "../../../images/pic7.png";
import img8 from "../../../images/pic8.png";
import img9 from "../../../images/pic9.png";
import img10 from "../../../images/pic10.png";
import img11 from "../../../images/pic11.png";
import img12 from "../../../images/pic12.png";


const MoviesCardList = (props) => {
  return (
    <ul className="movies-card-list movies-card-list_short-bottom">
      <MoviesCard img={img1} isSaved={true}/>
      <MoviesCard img={img2} isSaved={true}/>
      <MoviesCard img={img3} isSaved={false}/>
      <MoviesCard img={img4} isSaved={false}/>
      <MoviesCard img={img5} isSaved={false}/>
      <MoviesCard img={img6} isSaved={true}/>
      <MoviesCard img={img7} isSaved={true}/>
      <MoviesCard img={img8} isSaved={false}/>
      <MoviesCard img={img9} isSaved={false}/>
      <MoviesCard img={img10} isSaved={false}/>
      <MoviesCard img={img11} isSaved={true}/>
      <MoviesCard img={img12} isSaved={false}/>
    </ul>
  )
}

export default MoviesCardList;