// Techs — компонент с использованными технологиями

import React from "react";
import "./Techs.css";

function Techs() {
  return (
    <section className="techs">
      <a name="techs" className="techs__title">Технологии</a>
      <div className="techs__wrapper">
        <h3 className="techs__title7">7 технологий</h3>
        <p className="techs__text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
      </div>
      <ul className="techs__markers">
        <li className="techs_card">HTML</li>
        <li className="techs_card">CSS</li>
        <li className="techs_card">JS</li>
        <li className="techs_card">React</li>
        <li className="techs_card">Git</li>
        <li className="techs_card">Express.js</li>
        <li className="techs_card">mongoDB</li>
      </ul>
    </section>
  );
}

export default Techs;