// Header — компонент, который отрисовывает шапку сайта на страницу

import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import "./Header.css";
import Navigation from "../Navigation/Navigation";
import logo from "../../images/logo.svg";

function Header(props) {
  // Объявляем хук useState для попапа бургер меню
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);

  // Объявляем хук медиа-запросов CSS
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1023px)" });

  // Закрытие попапа бургера
  function handleNavigationButtonClose() {
    setIsNavigationOpen(false);
  }

  // Открытие попапа бургера
  function handleNavigationButtonOpen() {
    setIsNavigationOpen(true);
  }

  return (
    <header className="header">
      {/* компонент Link выполняет схожую операцию с тегом <a> */}
      <Link to="/" className="header__link">
        <img src={logo} alt="logo" className="header__logo" />
      </Link>
      {props.loggedIn ? (
        <>
          {!isTabletOrMobile && (
            <ul className="header__links">
              <li className="header__link-item">
                <NavLink to="/movies" className="header__link header__link_login" activeClassName="header__link_active" >
                  Фильмы
                </NavLink>
              </li>
              <li className="header__link-item ">
                <NavLink to="/saved-movies" className="header__link" activeClassName="header__link_active">Сохранённые фильмы</NavLink>
              </li>
            </ul>
          )}
          <>
            {!isTabletOrMobile && (
              <NavLink to="/profile" className="header__link header__profile-link" activeClassName="header__link_active">
                <button className="header__profile-button">Аккаунт</button>
              </NavLink>
            )}
          </>
          {isTabletOrMobile && (
            <div>
              <button className="header__burger-button" type="button" onClick={handleNavigationButtonOpen}></button>
              <Navigation isOpened={isNavigationOpen} onClose={handleNavigationButtonClose} />
            </div>
          )}
        </>
      ) : (
        <ul className="header__links">
          <li className="header__link-item">
            <Link to="signup" className="header__link header__link_active header__link_logout">Регистрация</Link>
          </li>
          <li className="header__link-item">
            <Link to="signin" className="header__link header__link_active">
              <button className="header__button">Войти</button>
            </Link>
          </li>
        </ul>
      )}
    </header>
  );
}

export default Header;
