// Main — компонент страницы «О проекте»

import React from "react";
import Promo from "../Promo/Promo";
import AboutProject from "../AboutProject/AboutProject";
import Portfolio from "../Portfolio/Portfolio";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
import PropTypes from 'prop-types';

function Main({ loggedIn }) {

  return (
    <div>
      <Header loggedIn={loggedIn} />
      <main>
        <Promo />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />
      </main>
      <Footer />
    </div>
  );
}

Main.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
}

export default Main;