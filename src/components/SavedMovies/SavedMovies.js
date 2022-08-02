// SavedMovies — компонент страницы с сохранёнными карточками фильмов

import "./SavedMovies.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import useLocalStorage from '../../services/useLocalStorage';
import { useEffect, useState } from 'react';
import Preloader from '../Preloader/Preloader';

function SavedMovies(props) {
  //состояние фильтрации короткометражки
  const [checked, setChecked] = useLocalStorage('save_checked', false);

  //локально фильтруем фильмы которые к нам идут из сохраненного стейта
  const [shortMovies, setShortMovies] = useLocalStorage('save_short_movies', []);

  //при определенном флаге управляем фильтрацией фильмов
  useEffect(() => {
    return checked ? setShortMovies(props.showShortMovies(props.movies)) : setShortMovies(props.movies);
  }, [checked, props, setShortMovies]);

  return (
    <>
      <Header loggedIn={props.loggedIn} />
      <main>
        <SearchForm
          setChecked={setChecked}
          value={props.value}
          setValue={props.setValue}
          checked={checked}
          findByNameFilm={props.findByNameFilm}
          submitFindByNameFilm={props.submitFindByNameFilm}
          setShowError={props.setShowError}
        />
        {props.isLoading ? (
          <Preloader />
        ) : (
          <div>
            {props.showError && props.movies.length === 0 ? (
              <h1 style={{ textAlign: 'center' }}>{props.showError}</h1>
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
        )}
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
