// MoviesCardList — компонент, который управляет отрисовкой карточек фильмов на страницу и их количеством

import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { Route, Switch } from "react-router-dom";
import PropTypes from 'prop-types';

function MoviesCardList({ movies, changeFilterValue, removeMoviesFunction, newCard, handleMovieLike, addedNewCard, counterCard, addedMovie, removeMovie }) {
  return (
    <section className="movies-card-list">
      <div className="movies-card-list__elements">
        {movies?.slice(0, counterCard + newCard).map((movie, i) => {
          return (
            <MoviesCard
              movie={movie}
              handleMovieLike={handleMovieLike}
              key={movie.movieId}
              {...movie}
              changeFilterValue={changeFilterValue}
              removeMoviesFunction={removeMoviesFunction}
              removeMovie={removeMovie}
              addedMovie={addedMovie}
            />
          );
        })}
      </div>
      <Switch>
        <Route path='/movies'>movies-card-list__button-hidden
          {movies?.length > counterCard + newCard && (
            <button onClick={() => addedNewCard()} className='movies-card-list__button' type='button'>
              {' '}
              Ещё{' '}
            </button>
          )}
        </Route>
        <Route path='/saved-movies'>
          {movies?.length > counterCard + newCard && (
            <button onClick={
              () => addedNewCard()} className='movies-card-list__button' type='button'>
              {' '}
              Ещё{' '}
            </button>
          )}
        </Route>
      </Switch>
    </section>
  );
}

MoviesCardList.propTypes = {
  movie: PropTypes.shape({
    movieId: PropTypes.number.isRequired,
  }),
  duration: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  nameRU: PropTypes.string.isRequired,
  addedNewCard: PropTypes.func.isRequired,
  handleMovieLike: PropTypes.func.isRequired,
  changeFilterValue: PropTypes.func.isRequired,
  removeMoviesFunction: PropTypes.func.isRequired,
  counterCard: PropTypes.func.isRequired,
  removeMovi: PropTypes.func.isRequired,
  addedMovie: PropTypes.func.isRequired,
}


export default MoviesCardList;