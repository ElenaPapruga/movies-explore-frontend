// SavedMovies — компонент страницы с сохранёнными карточками фильмов

import "./SavedMovies.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import useLocalStorage from '../../services/useLocalStorage';
import { useEffect, useState } from 'react';

function SavedMovies(props) {
  const [checked, setChecked] = useLocalStorage('save_checked', false); // сеттер для фильтра для коротких фильмов

  const [shortMovies, setShortMovies] = useLocalStorage('save_short_movies', []);

  useEffect(() => {
    return checked ? setShortMovies(props.showShortMovies(props.movies)) : setShortMovies(props.movies);
  }, [checked, props, setShortMovies]);

  return (
    <>
      <Header loggedIn={props.loggedIn} />
      <main>
        <SearchForm
          checked={checked}
          setChecked={setChecked}
          value={props.value}
          setValue={props.setValue}
          findByNameFilm={props.findByNameFilm}
          submitFindByNameFilm={props.submitFindByNameFilm}
          setShowError={props.setShowError}
        />

        <div>
          {props.showError && props.movies.length === 0 ? (
            <h1 className="saved-movies-err">{props.showError}</h1>
          ) : (
            <MoviesCardList
              handleMovieLike={props.handleMovieLike}
              movies={shortMovies}
              counterCard={props.counterCard}
              newCard={props.newCard}
              removeMoviesFunction={props.removeMoviesFunction}
              addedNewCard={props.addedNewCard}
              removeMovie={props.removeMovie}
            />
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default SavedMovies;
