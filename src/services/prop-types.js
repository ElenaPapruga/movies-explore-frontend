// Для проверки типов данных фильма
import PropTypes from "prop-types";

const MoviesPropTypes = PropTypes.shape({
    id: PropTypes.number.isRequired,
    country: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    year: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    trailerLink: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    movieId: PropTypes.string.isRequired,
    nameRU: PropTypes.string.isRequired,
    inameEN: PropTypes.string.isRequired,
});

export { MoviesPropTypes };