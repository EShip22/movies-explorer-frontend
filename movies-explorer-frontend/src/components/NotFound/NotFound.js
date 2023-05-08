import { NavLink } from "react-router-dom";
import "./NotFound.css";
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <section className="not-found">
      <p className="not-found__number">404</p>
      <p className="not-found__text">Страница не найдена</p>
      <NavLink className="not-found__link" onClick={() => {navigate(-1)}}>Назад</NavLink>
    </section>
  )
}

export default NotFound;