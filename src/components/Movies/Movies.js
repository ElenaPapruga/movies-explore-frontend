// Movies — компонент страницы с поиском по фильмам

import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import useLocalStorage from "../../services/useLocalStorage";
// import Preloader from "../Preloader/Preloader";
import { useEffect, useState } from "react";
import { useWindowSize } from '../../services/useWindowSize';

function Movies(props) {

  const [checked, setChecked] = useLocalStorage("checked", false);
  const [shortMovies, setShortMovies] = useLocalStorage("short_movies", []);

  useEffect(() => {
    return checked ? setShortMovies(props.showShortMovies(props.movies)) : setShortMovies(props.movies);
  }, [checked, props]);

  ///////////////////////////////////////////////////////
  // Хук width следит за шириной экрана
  const { width } = useWindowSize();

  // Количество отображаемых карточек
  const counterCard =
    (width >= 1280 && 12) ||  // 12 карточек по 3 в ряд
    (width >= 768 && width < 1280 && 8) ||  // 8 карточек по 2 в ряд
    (width >= 320 && width < 768 && 5) //  5 карточек по 1 в ряд

  // Добавление карточек для ряда
  const numberMoviesAdd =
    (width >= 1280 && 3) || // Кнопка «Ещё» загружает по 3 карточки.
    (width >= 768 && width < 1280 && 2) || // Кнопка «Ещё» загружает по 2 карточки.
    (width >= 320 && width < 768 && 1) // Кнопка «Ещё» загружает 1 карточку.

  // Добавление новых фильмов через кнопку Еще //
  function addedNewCard() {
    setNewCard(prevState => prevState + numberMoviesAdd);
  };

  const [newCard, setNewCard] = useState(numberMoviesAdd);
  /////////////////////////////////////////////

  return (
    <>
      <Header loggedIn={props.loggedIn} />
      <main>
        <SearchForm
          value={props.value}
          setValue={props.setValue}
          checked={checked}
          setChecked={setChecked}
          submitFindByNameFilm={props.submitFindByNameFilm}
          setShowError={props.setShowError}
        />
        <div>
          {props.showError && props.movies.length === 0 ? (
            <h1 style={{ textAlign: 'center' }}>
              {props.showError}
            </h1>
          ) : (
            <MoviesCardList
              movies={shortMovies}
              newCard={newCard}
              handleMovieLike={props.handleMovieLike}
              changeFilterValue={props.changeFilterValue}
              addedMovie={props.addedMovie}
              removeMovie={props.removeMovie}
              addedNewCard={addedNewCard}
              counterCard={counterCard}
            />
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Movies;