import React from "react";
import { useHistory } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  const browserHistory = useHistory();
  return (
    <section className="not-found">
      <h1 className="not-found__title">404</h1>
      <div className="not-found__subtitle">Страница не найдена</div>
      <button className="not-found__button" type="button" onClick={browserHistory.goBack} >
        Назад
      </button>
    </section>
  );
}

export default NotFound;