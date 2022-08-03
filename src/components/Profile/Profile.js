// Profile — компонент страницы изменения профиля

import React from "react";
import { useEffect, useState, useContext } from "react";
import "./Profile.css";
import Header from "../Header/Header";
import { IngredientsContext } from "../../services/IngredientsContext";
import api from "../../utils/MainApi";

function Profile(props) {
  const currentUser = useContext(IngredientsContext);
  const [user, setUser] = useState({
    name: "",
    email: "",
  });
  const [name, setName] = useState(user.name);
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState(user.email);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      api.getApiUserInfo(token).then((res) => {
        props.setIsLoading(false);
        if (res) {
          setUser({
            name: res.user.name,
            email: res.user.email,
          });
          setName(res.user.name);
          setEmail(res.user.email);
        }
      });
    }
  }, [props, props.isLoading]);

  function handleSubmit(event) {
    event.preventDefault();
    if (name === user.name && email === user.email) return;
    props.onEditProfile({
      name: name,
      email: email,
    });
  }

  function handleName(event) {
    if (event.target.value === user.name) return;
    const target = event.target;
    const name = target.name;
    setName(event.target.value);
    setErrors({ ...errors, [name]: target.validationMessage });
    setIsValid(event.target.closest("form").checkValidity());
  }

  function handleEmail(event) {
    if (event.target.value === user.email) return;
    const target = event.target;
    const name = target.name;
    setErrors({ ...errors, [name]: target.validationMessage });
    setIsValid(event.target.closest("form").checkValidity());
    setEmail(event.target.value);
  }

  return (
    <>
      <Header loggedIn={props.loggedIn} />
        <section className="profile">
          <div className="profile__container">
            <h3 className="profile__wellcome">Привет, Друг!</h3>
            <form className="profile__edit-form" onSubmit={handleSubmit}>
              <label className="profile__unit">
                Имя
                <input
                  className="profile__input"
                  name='name'
                  type="text"
                  placeholder='Имя'
                  value={name || ""}
                  onChange={handleName}
                  pattern="[а-яА-Яa-zA-ZёË\- ]{1,}"
                />
              </label>
              <span className="profile__input-error">{errors.name}</span>
              <hr className="profile__meredian" />
              <label className="profile__unit">
                Почта
                <input
                  className="profile__input"
                  name='email'
                  type="email"
                  placeholder='Email'
                  value={email || ''}
                  onChange={handleEmail}
                />
              </label>
              <span className="profile__input-error">{errors.email}</span>
              <div className="profile__buttons-container">
                <button
                  type="submit"
                  className={
                    isValid
                      ? "profile__button"
                      : "profile__button profile__button_invalid"
                  }
                  disabled={!isValid}
                >
                  Редактировать
                </button>
                <button
                  type="button"
                  className="profile__button profile__button_logout"
                  onClick={props.onSignOut}
                >
                  Выйти из аккаунта
                </button>
              </div>
            </form>
          </div>
        </section>
    </>
  );
}

export default Profile;