import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer-container">
      <footer className="footer">
        <p className="footer__text">
          Учебный проект Яндекс.Практикум х BeatFilm.
        </p>
        <div className="copyright">
          <p className="copyright__text">© 2023</p>
          <div className="praktikum">
            <p className="copyright__text">
              Яндекс.Практикум
            </p>
            <p className="copyright__text">
              Github
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer;