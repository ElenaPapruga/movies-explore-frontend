import React from "react";
import "./SearchForm.css";
// import { useEffect, useState } from "react";

function SearchForm({ value, setChecked, checked, submitFindByNameFilm, setValue, setShowError }) {

  return (
    <section className="search">
      <div className="search__wrapper">
        <form className="search__form">
          <div className="search__image-lupa"></div>
          <input className="search__input" type="text" name="keyword" placeholder='Фильм' minLength="2" maxLength="200" required value={value}
            onChange={(e) => {
              setValue(e.currentTarget.value);
              setShowError("");
            }}
          />
          <button className="search__button" type="submit"
            onClick={(e) => {
              e.preventDefault();
              submitFindByNameFilm(value);
            }}
          >Найти</button>
        </form>
        <div className="search__filter">
          <input type="checkbox" className="search__checkbox" name="filter__film"
            checked={checked}
            onChange={() => {
              setChecked(!checked);
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
