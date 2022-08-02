// Promo — компонент с вёрсткой баннера страницы «О проекте»

import React from 'react';
import "./Promo.css";

function Promo() {
  return (
    <section className="promo">
      <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
      <div className="promo__wrapper">
        <a href="#aboutproject" className="promo__link">О проекте</a>
        <a href="#techs" className="promo__link">Технологии</a>
        <a href="#aboutme" className="promo__link">Студент</a>
      </div>
    </section>
  );
}

export default Promo;