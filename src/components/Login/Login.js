// Login — компонент страницы авторизации

import React from "react";
import { useEffect, useState } from "react";
import "./Login.css";
import logo from "../../images/logo.svg";
import { Redirect, Link } from "react-router-dom";
import useFormValidation from "../../services/useFormValidation";

function Login(props) {
  const { resetForm } = useFormValidation({});

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false)

  function handleChangeEmail(event) {
    const target = event.target;
    const name = target.name;
    setErrors({ ...errors, [name]: target.validationMessage });
    setIsValid(event.target.closest("form").checkValidity());
    setEmail(event.target.value)
  }

  // Проверка на валидность
  function handleChangePassword(event) {
    const target = event.target;
    const name = target.name
    setErrors({ ...errors, [name]: target.validationMessage });
    setIsValid(event.target.closest("form").checkValidity());
    setPassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.onLogin({ email, password });
    resetForm()
  }

  useEffect(() => {
    setEmail("");
    setPassword("")
  }, []);

  return (
    <div>
      {!props.loggedIn ? (
        <section className="login">
            <div className="login__wrapper">
              <Link to="/" className='login__logo-link'>
                <img className="login__logo" src={logo} alt="Логотип" />
              </Link>
              <h3 className="login__wellcome">Рады видеть!</h3>
              <form className="login__form" name="login" onSubmit={handleSubmit}>
                <label className="login__title">
                  E-mail
                  <input
                    className={`login__input ${errors.email && "login__input_invalid"
                      }`}
                    name="email"
                    id="email"
                    type="email"
                    placeholder="Email"
                    required
                    minLength="2"
                    maxLength="30"
                    value={email || ""}
                    onChange={handleChangeEmail}
                  />
                  <span className="login__input-error">{errors.email}</span>
                </label>
                <label className="login__title">
                  Пароль
                  <input
                    className={`login__input ${errors.password && "login__input_invalid"
                      }`}
                    name="password"
                    id="password"
                    type="password"                    
                    minLength="8"
                    placeholder="Пароль"
                    required
                    maxLength="12"
                    value={password || ""}
                    onChange={handleChangePassword}
                  />
                  <span className="login__input-error">{errors.password}</span>
                </label>
                <button
                  type="submit"
                  className={`login__button ${!isValid && "login__button_disable"}`}
                  disabled={!isValid}
                >
                  Войти
                </button>
                <p className="login__text">
                  Ещё не зарегистрированы?
                  <Link className="login__link" to="/signup">Регистрация</Link>
                </p>
              </form>
            </div>      
        </section>
      ) : (
        <Redirect to="./" />
      )}
    </div>
  );
}

export default Login;