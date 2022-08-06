// Movies — компонент страницы с поиском по фильмам

import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import useLocalStorage from "../../services/useLocalStorage";
import { useEffect } from "react";

function Movies(props) {

  const [checked, setChecked] = useLocalStorage("checked", false); // сеттер фильтрации короткометражки
  const [shortMovies, setShortMovies] = useLocalStorage("short_movies", []); // фильтрация карточек из поискового стейта

  useEffect(() => { // управление фильтрацией карточек на тумблере
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
          submitSearchNameFilm={props.submitSearchNameFilm}
          setShowError={props.setShowError}
        />
        <div>
          {props.showError && props.movies.length === 0 ? (
            <h1 style={{ textAlign: "center" }}>{props.showError}</h1>
          ) : (
            <MoviesCardList
              movies={shortMovies}
              newCard={props.newCard}
              handleMovieLike={props.handleMovieLike}
              changeFilterValue={props.changeFilterValue}
              addedMovie={props.addedMovie}
              removeMovie={props.removeMovie}
              addedNewCard={props.addedNewCard}
              counterCard={props.counterCard}
            />
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Movies;