// MoviesCardList — компонент, который управляет отрисовкой карточек фильмов на страницу и их количеством

import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { Route, Switch } from "react-router-dom";

function MoviesCardList(props) {
  return (
    <section className="movies-card-list">
      <div className="movies-card-list__elements">
        {props.movies?.slice(0, props.counterCard + props.newCard).map((movie, i) => {
          return (
            <MoviesCard
              movie={movie}
              handleMovieLike={props.handleMovieLike}
              key={movie.movieId}
              {...movie}
              changeFilterValue={props.changeFilterValue}
              removeMoviesFunction={props.removeMoviesFunction}
              removeMovie={props.removeMovie}
              addedMovie={props.addedMovie}
            />
          );
        })}
      </div>
      <Switch>
        <Route path='/movies'>
          {props.movies?.length > props.counterCard + props.newCard && (
            <button
              onClick={() => props.addedNewCard()}
              className='movies-card-list__button'
              type='button'
            >Ещё</button>
          )}
        </Route>
        <Route path='/saved-movies'>
          {props.movies?.length > props.counterCard + props.newCard && (
            <button
              onClick={() => props.addedNewCard()}
              className='movies-card-list__button'
              type='button'
            >Ещё</button>
          )}
        </Route>
      </Switch>
    </section>
  );
}

export default MoviesCardList;