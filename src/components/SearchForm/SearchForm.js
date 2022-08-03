import React from "react";
import "./SearchForm.css";
// import { useEffect, useState } from "react";

function SearchForm(props) {
  return (
    <section className="search">
      <div className="search__wrapper">
        <form className="search__form">
          <div className="search__image-lupa"></div>
          <input className="search__input" type="text" name="keyword" placeholder='Фильм' minLength="2" maxLength="200" required value={props.value}
            onChange={(event) => {
              props.setValue(event.currentTarget.value);
              props.setShowError("");
            }}
          />
          <button className="search__button" type="submit"
            onClick={(event) => {
              event.preventDefault();
              props.submitFindByNameFilm(props.value);
            }}
          ></button>
        </form>
        <div className="search__filter">
          <input type="checkbox" className="search__checkbox" name="filter__film"
            checked={props.checked}
            onChange={() => {
              props.setChecked(!props.checked);
            }}
          />
          <p className="search__text">Короткометражки </p>
        </div>
      </div>
      <div className="search__border-bottom"></div>
    </section>
  );
}

export default SearchForm;
