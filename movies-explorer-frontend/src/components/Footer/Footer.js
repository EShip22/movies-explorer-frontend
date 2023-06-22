import "./Footer.css";

const Footer = (props) => {
  return (
    <footer className="footer-container">
      <section className="footer">
        <p className="footer__text">
          Учебный проект Яндекс.Практикум х BeatFilm.
        </p>
        <section className="copyright">
          <p className="copyright__text">© 2023</p>
          <section className="praktikum">
            <p className="copyright__text">
              Яндекс.Практикум
            </p>
            <p className="copyright__text">
              Github
            </p>
          </section>
        </section>
      </section>
    </footer>
  )
}

export default Footer;