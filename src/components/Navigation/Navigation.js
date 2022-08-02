// Navigation — компонент, который отвечает за меню навигации на сайте

import React from "react";
import { NavLink } from "react-router-dom";
import "./Navigation.css";
import PropTypes from 'prop-types';

function Navigation(props) {
  return (
    <section className={`navigate ${props.isOpened ? 'navigate__opened' : ' '}`}>
      <nav className="navigate__wrapper">
        <button className="navigate__close-button" onClick={props.onClose} />
        <ul className="navigate__links">
          <NavLink className="navigate__link" to="/">Главная</NavLink>
          <NavLink className="navigate__link navigate__link_active" to="/movies">Фильмы</NavLink>
          <NavLink className="navigate__link" to="/saved-movies">Сохранённые фильмы</NavLink>
        </ul>
        <NavLink to="/profile">
          <button className="navigate__profile-button">Аккаунт</button>
        </NavLink>
      </nav>
    </section>
  );
}

Navigation.propTypes = {
  onClose: PropTypes.func.isRequired,
  isOpened: PropTypes.func.isRequired,
}

export default Navigation;
