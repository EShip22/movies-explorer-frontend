import React from 'react';
import Promo from './Promo/Promo';
import AboutProject from './AboutProject/AboutProject';
import Techs from './Techs/Techs';
import AboutMe from './AboutMe/AboutMe';
import Footer from '../Footer/Footer';
import './Main.css';

const Main = () => {
  return (
    <div className="root">
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Footer />
    </div>
    );
}

export default Main;