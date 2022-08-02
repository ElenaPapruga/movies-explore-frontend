// Movies — компонент страницы с поиском по фильмам

import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import useLocalStorage from "../../services/useLocalStorage";
import Preloader from "../Preloader/Preloader";
import { useEffect, useState } from "react";
import PropTypes from 'prop-types';

function Movies({ removeMovie, addedMovie, changeFilterValue, submitFindByNameFilm, counterCard, addedNewCard, handleMovieLike, showError, setShowError, ...props }) {

  const [checked, setChecked] = useLocalStorage("checked", false);
  const [shortMovies, setShortMovies] = useLocalStorage("short_movies", []);

  useEffect(() => {
    return checked ? setShortMovies(props.showShortMovies(props.movies)) : setShortMovies(props.movies);
  }, [checked, props]);

  return (
    <>
      <Header loggedIn={props.loggedIn} />
      <main>
        <SearchForm
          value={props.value}
          setValue={props.setValue}
          checked={checked}
          setChecked={setChecked}
          submitFindByNameFilm={submitFindByNameFilm}
          setShowError={setShowError}
        />
        {props.isLoading ? (
          <Preloader />
        ) : (
          <div>
            {showError && props.movies.length === 0 ? (
              <h1 style={{ textAlign: 'center' }}>
                {showError}
              </h1>
            ) : (
              <MoviesCardList
                movies={shortMovies}
                newCard={props.newCard}
                handleMovieLike={handleMovieLike}
                changeFilterValue={changeFilterValue}
                addedMovie={addedMovie}
                removeMovie={removeMovie}
                addedNewCard={addedNewCard}
                counterCard={counterCard}
              />
            )}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

Movies.propTypes = {
  howError: PropTypes.func.isRequired,
  addedMovie: PropTypes.func.isRequired,
  removeMovie: PropTypes.func.isRequired,
  changeFilterValue: PropTypes.func.isRequired,
  counterCard: PropTypes.func.isRequired,
  addedNewCard: PropTypes.func.isRequired,
  handleMovieLike: PropTypes.func.isRequired,
  showError: PropTypes.func.isRequired,
  setShowError: PropTypes.func.isRequired,
  submitFindByNameFilm: PropTypes.func.isRequired,
}

export default Movies;