import "./Techs.css";

const Techs = () => {
  return (
    <div className="techs-container">
      <section className="techs">
        <h2 className="techs__header">Технологии</h2>
        <article className="center-text">
          <p className="center-text__bold">7 технологий</p>
          <p className="center-text__normal">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
        </article>
        <section className="techs-grid">
          <div className="techs-grid__item">HTML</div>
          <div className="techs-grid__item">CSS</div>
          <div className="techs-grid__item">JS</div>
          <div className="techs-grid__item">React</div>
          <div className="techs-grid__item">Git</div>
          <div className="techs-grid__item">Express.js</div>
          <div className="techs-grid__item">mongoDB</div>
        </section>
      </section>
    </div>
  )
}

export default Techs;