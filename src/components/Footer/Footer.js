// Footer — презентационный компонент, который отрисовывает подвал

import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__title"> Учебный проект Яндекс.Практикум х BeatFilm.</div>
      <div className="footer__wrapper">
        <p className="footer__copyright">&copy; {new Date().getFullYear()}</p>
        <ul className="footer__links">
          <li className="footer_card">
            <a className="footer__link" href="https://praktikum.yandex.ru">Яндекс.Практикум</a>
          </li>
          <li className="footer_card">
            <a className="footer__link" href="https://www.facebook.com">Facebook</a>
          </li>
          <li className="footer_list-item">
            <a className="footer__link" href="https://github.com">Github</a>
          </li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer;