// SavedMovies — компонент страницы с сохранёнными карточками фильмов

import { useEffect } from 'react';
import "./SavedMovies.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import useLocalStorage from '../../services/useLocalStorage';

function SavedMovies(props) {
  const [checked, setChecked] = useLocalStorage('save_checked', false); // сеттер для фильтрации короткого фильма

  const [shortMovies, setShortMovies] = useLocalStorage('save_short_movies', []); // фильрация карточек из сохраненного стейта

  useEffect(() => { // управление фильтрацией фильмов при тумблере
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

          findByNameFilm={props.findByNameFilm}
        />
          <div>
            {props.showError && props.movies.length === 0 ? (
              <h1 className='saved-movies__err'>{props.showError}</h1>
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
}

export default SavedMovies;
