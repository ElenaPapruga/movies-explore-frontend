import "./MoviesCard.css";
import React from 'react';
// import preview from "../../images/film1.svg";
import { Route, Switch } from "react-router-dom";


function MoviesCard(props) {

  const parseDuration = () => {
    let hours;
    let minutes;
    hours = Math.trunc(props.movie.duration / 60)
    minutes = props.movie.duration % 60
    if (props.movie.duration > 59 && minutes !== 0) {
      return `${hours}ч ${minutes}мин`
    } else if (props.movie.duration > 59 && minutes === 0) {
      return `${hours}ч`
    } else return `${minutes}мин`
  }

  return (
    <div className="movies-card">
      <div className="movies-card__wrapper">
        <div className="movie-card__info">
          <div className="movies-card__name">{props.nameRU}</div>
          <p className="movies-card__time">{parseDuration()}</p>
        </div>
        <div>
          <Switch>
            <Route path='/movies'>
              <button
                onClick={() => {
                  !props.handleMovieLike(props.movie) ? props.addedMovie(props.movie) : props.removeMovie(props.movie);
                }}
                className={
                  !props.handleMovieLike(props.movie)
                    ? 'movies-card__save-button movies-card__save-button'
                    : 'movies-card__save-button movies-card__save-button_active'
                }
                type='button'
              ></button>
            </Route>
            <Route path='/saved-movies'>
              <button
                onClick={() => props.removeMovie(props.movie)}
                className='movies-card__save-button movies-card__delete-button'
                type='button'
              ></button>
            </Route>
          </Switch>
        </div>
      </div>
      <a href={props.trailer} target="_blank" rel="noreferrer"></a>
      <img className="movies-card__images" alt="Прекрасный фильм" src={props.image} />
    </div>
  );
}

export default MoviesCard;
