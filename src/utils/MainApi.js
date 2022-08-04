// Содержание описания запросов к нашему Api //
class MainApi {
  constructor(config) {
    this._url = config.url;
  };

  // Проверка ответа //
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res)
  };

  // Имя и email с сервера //
  getApiUserInfo = (token) => {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    })
      .then(this._checkResponse)
  };

  // Создание профиля пользователя //
  createProfile = (name, email, password) => {
    return fetch(`${this._url}/signup`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    })
      .then(this._checkResponse)
  };

  // Изменить Имя и email //
  patchUserInfo = async (name, email) => {
    const token = localStorage.getItem("jwt");
    const res = await fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        email: email,
        name: name,
      })
    })
    return this._checkResponse(res)
  };

  // Регистрация //
  login = (email, password) => {
    return fetch(`${this._url}/signin`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then(this._checkResponse)
  };

  // Добавление фильма //
  createMovie = (data) => {
    const token = localStorage.getItem("jwt");
    return fetch(`${this._url}/movies`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        country: data.country,
        director: data.director,
        duration: data.duration,
        year: data.year,
        image: data.image,
        description: data.description,
        trailerLink: data.trailer,
        thumbnail: data.thumbnail,
        movieId: data.movieId,
        nameRU: data.nameRU,
        nameEN: data.nameEN,
      })
    })
      .then(this._checkResponse)
  };

  // Удалить фильм //
  deleteMovie = (movieId) => {
    const token = localStorage.getItem("jwt");
    return fetch(`${this._url}/movies/${movieId}`, {
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      }
    })
      .then(this._checkResponse);
  };

  // Получение всех сохраненных фильмов //
  getAllMovies = () => {
    const token = localStorage.getItem("jwt");
    return fetch(`${this._url}/movies`, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      }
    })
      .then(this._checkResponse)
  };

  _set(query, method) {
    return fetch(`${this._url}${query}`, {
      method,
      headers: {
        "Authorization": `Bearer ${this._token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)));
  }
};

// Экземпляр API
const api = new MainApi({
  url: "https://api.epapruga.nomoredomains.sbs",
  headers: {
    "content-type": "application/json"
  }
});

export default api;
