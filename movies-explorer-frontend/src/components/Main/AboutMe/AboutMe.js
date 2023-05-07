import "./AboutMe.css";
import me from "../../../images/me.jpg"
import { Link } from "react-router-dom";

const PortfolioProject = (props) => {
  return (
    <div >
      <Link to={props.projectLink}  target="_blank" className={`portfolio-project  ${props.isLast ? 'portfolio-project_last' : ''} `}>
        <p className="portfolio-project__name">{props.projectName}</p>
        <p className="portfolio-project__link">↗</p>
      </Link>
    </div>
  )
}

const AboutMe = () => {
  return (
    <div className="aboutme-container">
      <section className="aboutme">
        <h2 className="aboutme__header">Студент</h2>
        <article className="central-block">
          <div className="info-container">
            <p className="info-container__name">Егор</p>
            <p className="info-container__profage">Фронтент-разработчик, 33 года</p>
            <p className="info-container__description">
              Я работаю разработчиком около 8 лет, последние 3 года в компании "Иннотех". 7 лет программировал в СУБД Oracle,
              год назад нашу команду перевели на другой проект и я стал разрабатывать на React и TS. После прохождения курсов по веб-разработке,
              на работе стало легче, пишу код качественнее.<br/>
              
              Помимо работы я увлекаюсь поездками по заграницам, горными лыжами, велосипедом, плаванием с аквалангом, ходить в бассейн и спортзал
            </p>
            <Link to="https://github.com/EShip22"  target="_blank" className="info-container__github">Github</Link>
          </div>
          <img className="aboutme__img" src={me} alt="фото"/>
        </article>
        <div className="portfolio">
          <p className="portfolio__header">Портфолио</p>
          <PortfolioProject
            projectName="Статичный сайт"
            projectLink="https://eship22.github.io/how-to-learn/"
          />
          <PortfolioProject
            projectName="Адаптивный сайт"
            projectLink="https://eship22.github.io/russian-travel/"
          />
          <PortfolioProject
            projectName="Одностраничное приложение"
            projectLink="https://osetr22.students.nomoredomains.work"
            isLast={true}
          />
        </div>
      </section>
    </div>
  )
}

export default AboutMe;