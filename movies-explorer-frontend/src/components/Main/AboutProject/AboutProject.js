import "./AboutProject.css";

const AboutProject = () => {
  return (
    <div className="about-project-container">
      <section className="about-project">
        <h2 className="about-project__header">О проекте</h2>
        <article className="article">
          <p className="article__item article__item_top">Дипломный проект включал 5 этапов</p>
          <p className="article__item article__item_top">На выполнение диплома ушло 5 недель</p>
          <p className="article__item">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
          <p className="article__item">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </article>
        <section className="scale">
          <div className="scale__item scale__item_top scale__item_green">1 неделя</div>
          <div className="scale__item scale__item_top scale__item_grey">4 недели</div>
          <div className="scale__item">Back-end</div>
          <div className="scale__item">Front-end</div>
        </section>
      </section>
    </div>
  )
}

export default AboutProject;