// AboutMe — компонент с информацией о студенте

import React from "react";
import "./AboutMe.css";
import avatar from "../../images/avatar.jpg"

function AboutMe() {
  return (
    <section className="about-me">
      <a name="aboutme" className="about-me__title">Студентка</a>
      <div className="about-me__wrapper">
        <article className="about-me__box">
          <h4 className="about-me__name">Елена</h4>
          <p className="about-me__description">Фронтенд-разработчик</p>
          <p className="about-me__info2">Привет! Меня зовут&nbsp;&mdash; Лена. Живу в&nbsp;Москве. С&nbsp;2021 года окунулась в&nbsp;удивительный мир веба. Пошла на&nbsp;курс Яндекс-Практикума и&nbsp;научилась программированию c&nbsp;&laquo;нуля&raquo;. В&nbsp;моем портфолио есть несколько интересных проектов сайтов, которые я&nbsp;разработала при подержке моего великолепного наставника&nbsp;&mdash; Лизы Гриненко.</p>
          <p className="about-me__info1">Если Вам понравились мои работы, вам требуется разработать красивый современный сайт пишите lena@ya.ru. Разработаем, напишем, внедрим!!!</p>
          <ul className="about-me__links">
            <li className="about-me_unit">
              <a className="about-me__link" href="https://ru-ru.facebook.com">Facebook</a>
            </li>
            <li className="about-me_unit">
              <a className="about-me__link" href="https://github.com/ElenaPapruga">Github</a>
            </li>
          </ul>
        </article>
        <div>
          <img src={avatar} alt="Фото основателя проекта" className="about-me__image" />
        </div>
      </div>
    </section>
  );
}

export default AboutMe;