// Portfolio — компонент со ссылками на другие проекты

import React from "react";
import "./Portfolio.css";
import strelka from "../../images/strelkaUpRight.svg"

function Portfolio() {
  return (
    <section className="portfolio">
      <h5 className="portfolio__title">Портфолио</h5>

      <ul className="portfolio__links">

        <li className="portfolio_card">
          <a className="portfolio__link" href="https://elenapapruga.github.io/how-to-learn" target="_blank" rel="noreferrer">
            <button
              className="portfolio__link-button"
              type="button"
              aria-label="Link Button"
            >
              Статичный сайт
              <img src={strelka} alt="Стрелка" className="portfolio__strelka" />
            </button>
          </a>
        </li>

        <li className="portfolio_card">
          <a className="portfolio__link" href="https://elenapapruga.github.io/russian-travel" target="_blank" rel="noreferrer">
            <button
              className="portfolio__link-button"
              type="button"
              aria-label="Link Button"
            >
              Адаптивный сайт
              <img src={strelka} alt="Стрелка" className="portfolio__strelka" />
            </button>
          </a>
        </li>

        <li className="portfolio_card">
          <a className="portfolio__link" href="https://elenapapruga.github.io/mesto_4_6" target="_blank" rel="noreferrer">
            <button
              className="portfolio__link-button portfolio__noborder"
              type="button"
              aria-label="Link Button"
            >
              Одностраничное приложение
              <img src={strelka} alt="Стрелка" className="portfolio__strelka" />
            </button>
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;