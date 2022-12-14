///////////
import React from 'react';
import { useState, useEffect } from "react";
import Main from "../Main/Main";
import { IngredientsContext } from "../../services/IngredientsContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Profile from "../Profile/Profile";
import Movies from "../Movies/Movies";
import NotFound from "../NotFound/NotFound";
import SavedMovies from "../SavedMovies/SavedMovies";
import { Route, Switch, useLocation, useHistory } from "react-router-dom";
import useLocalStorage from '../../services/useLocalStorage';
import api from "../../utils/MainApi";
import { getMovies } from "../../utils/MoviesApi";
import { useWindowSize } from '../../services/useWindowSize';
import Preloader from '../Preloader/Preloader';
import PropTypes from 'prop-types';

function App() {
  console.log("render");
  const [currentUser, setCurrentUser] = useState({ name: '', email: '' }); // сеттер текущего пользователя //
  console.log(currentUser);
  const [isLoading, setIsLoading] = useState(false); // сеттер загрузки //

  let location = useLocation().pathname; // путь пользователя //

  const [loggedIn, setLoggedIn] = useState(false); // сеттер залогиненного юзера //

  // Сеттер хранения фильмов//
  const [movies, setMovies] = useLocalStorage("all_movies", []);

  const [moviesAction, setMoviesAction] = useLocalStorage("movies_action", []); // для фильтрации фильмов //

  // Сохраненные фильмы в локалсторидж //
  const [saveMoviesAction, setSaveMoviesAction] = useLocalStorage(
    "save_movies_action",
    []
  );

  const history = useHistory();

  useEffect(() => {  // при регистрации переходим на страницу с фильмами //
    if (loggedIn === true) {
      history.push('/movies');
    }
  }, [loggedIn]);

  // Проверка токена //
  function handleTokenCheck() {
    const token = localStorage.getItem('jwt');
    if (token) {
      setIsLoading(true);
      api.getApiUserInfo(token)
        .then(
          (res) => {
            if (res) {
              setLoggedIn(true);
              setCurrentUser({
                name: res.user.name,
                email: res.user.email
              });
              // даём доступ к оснавным страницам
              history.push(location);
              showAllMovies();
              setIsLoading(false);
            }
          })
        .catch((err) => {
          console.log(`Не удалось получить токен: ${err}`)
          localStorage.removeItem('token');
          history.push('/');
          setIsLoading(false);
        })
      console.log(token);
    }
  };

  useEffect(() => {  // проверка токена после каждого обновления ///
    console.log("effect");
    handleTokenCheck();
  }, []);

  // Регистрация ///
  function handleRegister({ name, email, password }) {
    setIsLoading(true);
    api.createProfile(name, email, password)
      .then(
        (res) => {
          setIsLoading(false);
          if (res) {
            handleLogin({ email, password });
          }
        })
      .catch((err) => {
        console.log(`Не удалось пройти регистрацию: ${err}`)
        setIsLoading(false);
      })
  };

  // Функция входа ///
  function handleLogin({ email, password }) {
    setIsLoading(true);
    api.login(email, password)
      .then(
        (res) => {
          setIsLoading(false);
          if (res.token) {
            localStorage.setItem('jwt', res.token);
            setLoggedIn(true);
            history.push("/movies");
          }
        })
      .catch((err) => {
        setIsLoading(false);
        console.log(err)
      });
  };

  // Изменение информации о пользователе
  function handleUpdateUser({ name, email }) {
    localStorage.getItem("jwt");
    setIsLoading(true);
    api.patchUserInfo(name, email)
      .then(
        (res) => {
          console.log("updateProfile", res);
          setCurrentUser({ _id: res._id, name: res.name, email: res.email });
          setIsLoading(false);
          alert(`Данные изменены!`)
        })
      .catch((event) => {
        console.log(`Ошибка в изменении данных пользователя: ${event}`);
        setIsLoading(false);
      });
  };
  //////////////////////////////////////////
  // Хук width следит за шириной экрана
  const { width } = useWindowSize();

  // Ошибка поиска
  const [showError, setShowError] = useState("");

  // Количество отображаемых карточек
  const counterCard =
    (width >= 1280 && 12) ||  // 12 карточек по 3 в ряд
    (width >= 768 && width < 1280 && 8) ||  // 8 карточек по 2 в ряд
    (width >= 320 && width < 768 && 5); //  5 карточек по 1 в ряд

  // Добавление карточек для ряда
  const numberMoviesAdd =
    (width >= 1280 && 3) || // Кнопка «Ещё» загружает по 3 карточки.
    (width >= 768 && width < 1280 && 2) || // Кнопка «Ещё» загружает по 2 карточки.
    (width >= 320 && width < 768 && 1); // Кнопка «Ещё» загружает 1 карточку.

  ///??????
  const [newCard, setNewCard] = useState(numberMoviesAdd); //// колличество новых фильмов - кнопка Еще ///??????

  const [value, setValue] = useLocalStorage("serach_value", "") // для  input по поиску
  const [valueSave, setValueSave] = useLocalStorage("serach_value_save", ""); // для  input по поиску

  function signOut() { // функция выхода
    localStorage.removeItem("jwt");
    // localStorage.clear();
    localStorage.removeItem("save_movies_action");
    console.log('save_movies_action')
    localStorage.removeItem("movies_action");
    setCurrentUser({ name: '', email: '' });
    setValueSave('');
    setValue('');
    setLoggedIn(false);
    setMovies([]);
    setMoviesAction([]);
    history.push('/');
  };

  const showAllMovies = async () => {
    setIsLoading(true);
    const res = await getMovies();
    setIsLoading(false);
    const allMovies = res.map((data) => {
      const imageUrl = data.image
        ? `https://api.nomoreparties.co${data.image.url}`
        : "https://upload.wikimedia.org/wikipedia/commons/9/9a/%D0%9D%D0%B5%D1%82_%D1%84%D0%BE%D1%82%D0%BE.png";
      const thumbnailUrl = data.image
        ? `https://api.nomoreparties.co${data.image.formats.thumbnail.url}`
        : "https://upload.wikimedia.org/wikipedia/commons/9/9a/%D0%9D%D0%B5%D1%82_%D1%84%D0%BE%D1%82%D0%BE.png";
      const unadaptedName = data.nameEN ? data.nameEN : data.nameRU;
      const countryText = data.country ? data.country : 'none';
      return {
        country: countryText,
        director: data.director,
        duration: data.duration,
        year: data.year,
        description: data.description,
        image: imageUrl,
        trailer: data.trailerLink,
        thumbnail: thumbnailUrl,
        movieId: data.id,
        nameRU: data.nameRU,
        nameEN: unadaptedName,
      };
    });
    setMovies(allMovies);
  }

  // Взятие фильмов пользователя //
  const takeFilm = async () => {
    const res = await api.getAllMovies();
    console.log(res)
    setSaveMoviesAction(res)
  }

  // Функция для сохранения фильма для Сохранненые фильмы//
  const addedMovie = async (movie) => {
    console.log(movie)
    await api.createMovie(movie);
    takeFilm()
  };

  // Функция удаления фильма из Сохранненых фильмов //
  const removeMovie = async (movie) => {
    console.log(movie)
    const id = saveMoviesAction.find((data) => data.movieId === movie.movieId)._id;
    await api.deleteMovie(id);
    takeFilm();
  };

  // useEffect(() => {
  //   takeFilm();
  // }, [isLoading]);

  useEffect(() => { //
    if (loggedIn) showAllMovies();
    setShowError('');
  }, [loggedIn]);

  // тумблер настройки выборки карточек менее 40 мин = короткометражки//
  const showShortMovies = (moviesLitle) => {
    return moviesLitle?.filter((i) => i.duration <= 40);
  };

  // Поиск фильмов, перевод в маленькие буквы //
  const findByNameFilm = (movies, value) => {
    const res = movies.filter((i) =>
      i.nameRU.toLowerCase().includes(value.toLowerCase())
    )
    if (res.length === 0) {
      setShowError("Поиск не дал результатов");
    };
    return res
  }

  // search по карточкам в Фмльме
  const submitSearchNameFilm = (value) => {
    showAllMovies();
    setMoviesAction(findByNameFilm(movies, value));
  };

  // search по карточкам в Сохранненые фильмы//
  const submitSearchNameSaveFilm = async (value) => {
    console.log(value)
    const res = await api.getAllMovies();
    showAllMovies();
    setSaveMoviesAction(findByNameFilm(res, value));
  };

  //колличество новых добавляемых карточек
  const [newItem, setNewItem] = useState(numberMoviesAdd);  ///??????

  // Добавление новых фильмов через кнопку Еще //
  function addedNewCard() {
    setNewCard(newItem + numberMoviesAdd);
    // setNewCard(prevState => prevState + numberMoviesAdd);
  };


  // Функция лайка карточки //
  function handleMovieLike(movie) {
    return saveMoviesAction.some((savedMovie) => savedMovie.movieId === movie.movieId);
  };

  return (
    <IngredientsContext.Provider value={currentUser}>
      <div className="App">

        {/* Switch - компонет для отрисовки одного компонента Route */}
        <Switch>
          {/* пропс exact гарантирует, что значение пропса path будет сравниваться с путем url */}
          <Route exact path="/">
            <Main loggedIn={loggedIn} />
          </Route>

          {isLoading ? (
            <Preloader />
          ) : (
            <Route path="/signup">
              <Register onRegister={handleRegister} isLoading={isLoading} loggedIn={loggedIn} />
            </Route>
          )}
          <Route path="/signin">
            <Login onLogin={handleLogin} isLoading={isLoading} loggedIn={loggedIn} />
          </Route>

          {isLoading ? (
            <Preloader />
          ) : (
            <ProtectedRoute
              loggedIn={loggedIn}
              component={Profile}
              onSignOut={signOut}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              onEditProfile={handleUpdateUser}
              path="/profile"
            />
          )}

          <ProtectedRoute
            component={Movies}
            loggedIn={loggedIn}
            removeMovie={removeMovie}
            submitSearchNameFilm={submitSearchNameFilm}
            addedNewCard={addedNewCard}
            newCard={newCard}
            counterCard={counterCard}
            movies={moviesAction}
            showShortMovies={showShortMovies}
            // showAllMovies={showAllMovies}
            addedMovie={addedMovie}
            handleMovieLike={handleMovieLike}
            value={value}
            setValue={setValue}
            showError={showError}
            setShowError={setShowError}
            isLoading={isLoading}
            path="/movies"
          />

          {isLoading ? (
            <Preloader />
          ) : (
            <ProtectedRoute
              component={SavedMovies}
              loggedIn={loggedIn}
              isLoading={isLoading}
              movies={saveMoviesAction}
              newCard={newCard}
              counterCard={counterCard}
              showShortMovies={showShortMovies}
              removeMovie={removeMovie}
              submitSearchNameFilm={submitSearchNameSaveFilm}
              handleMovieLike={handleMovieLike}
              value={valueSave}
              setValue={setValueSave}
              showError={showError}
              setShowError={setShowError}
              path="/saved-movies"
            />
          )}

          {/* - для всех остальных комбинаций для страницы 400 */}
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>
    </IngredientsContext.Provider>
  );
}

App.propTypes = {
  data: PropTypes.shape({
    year: PropTypes.number.isRequired,
    countryText: PropTypes.string.isRequired,
    trailerLink: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
  }),
}

export default App;

