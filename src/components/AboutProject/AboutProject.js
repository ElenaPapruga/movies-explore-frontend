// AboutProject — компонент с описанием дипломного проекта

import React from "react";
import "./AboutProject.css";

function AboutProject() {
  return (
    <section className="about-project">
      <a name="aboutproject" className="about-project__title">О проекте </a>
      <div className="about-project__box">
        <article>
          <h2 className="about-project__subtitle">Дипломный проект включал 5 этапов</h2>
          <p className="about-project__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </article>
        <article>
          <h3 className="about-project__subtitle">На выполнение диплома ушло 5 недель</h3>
          <p className="about-project__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </article>
      </div>
      <div className="about-project__scale">
        <p className="about-project__font about-project__box-green">1 неделя</p>
        <p className="about-project__font about-project__box-grey">4 недели</p>
        <span className="about-project__info">Back-end</span>
        <span className="about-project__info">Front-end</span>
      </div>
    </section>
  );
}

export default AboutProject;