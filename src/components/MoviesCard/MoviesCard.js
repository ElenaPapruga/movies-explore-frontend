import "./MoviesCard.css";
import React from 'react';
// import preview from "../../images/film1.svg";
import { Route, Switch } from "react-router-dom";
import PropTypes from 'prop-types';


function MoviesCard(nameRU, duration, movie, image, ...props) {
  return (
    <div className="movies-card">
      <div className="movies-card__wrapper">
        <div className="movie-card__info">
          <div className="movies-card__name">{nameRU}</div>
          <p className="movies-card__time">{duration}</p>
        </div>
        <div>
          <Switch>
            <Route path='/movies'>
              <button
                onClick={() => {
                  !props.handleMovieLike(movie) ? props.addedMovie(movie) : props.removeMovie(movie);
                }}
                className={
                  !props.handleMovieLike(movie)
                    ? 'movies-card__save-button movies-card__save-button'
                    : 'movies-card__save-button movies-card__save-button_active'
                }
                type='button'
              ></button>
            </Route>
            <Route path='/saved-movies'>
              <button
                onClick={() => props.removeMovie(movie)}
                className='movies-card__save-button movies-card__delete-button'
                type='button'
              ></button>
            </Route>
          </Switch>
        </div>
      </div>
      <img className="movies-card__images" alt="Прекрасный фильм" src={image} />
    </div>
  );
}

MoviesCard.propTypes = {
  duration: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  movie: PropTypes.string.isRequired,
  nameRU: PropTypes.string.isRequired,
}

export default MoviesCard;
