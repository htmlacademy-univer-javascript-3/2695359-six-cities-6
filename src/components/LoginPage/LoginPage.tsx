import { useCallback, useEffect, useRef, useMemo, FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { loginAction } from '../../store/actions/userActions';
import { changeCity } from '../../store/slices/appSlice';
import { selectAuthorizationStatus } from '../../store/selectors';
import { CITIES, AuthorizationStatus } from '../../const';

const isPasswordValid = (password: string): boolean => {
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  return hasLetter && hasNumber;
};

function LoginPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);

  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [passwordError, setPasswordError] = useState<string>('');

  const randomCity = useMemo(
    () => CITIES[Math.floor(Math.random() * CITIES.length)],
    []
  );

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      navigate('/');
    }
  }, [authorizationStatus, navigate]);

  const handleRandomCityClick = useCallback(() => {
    dispatch(changeCity(randomCity));
  }, [dispatch, randomCity]);

  const handleSubmit = useCallback((evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setPasswordError('');

    if (loginRef.current && passwordRef.current) {
      const password = passwordRef.current.value;

      if (!isPasswordValid(password)) {
        setPasswordError('Password must contain at least one letter and one number');
        return;
      }

      dispatch(loginAction({
        email: loginRef.current.value,
        password,
      }));
    }
  }, [dispatch]);

  return (
    <div className="page page--gray page--login">
      <Header />

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" onSubmit={handleSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  ref={loginRef}
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  ref={passwordRef}
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                />
                {passwordError && (
                  <p style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>
                    {passwordError}
                  </p>
                )}
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to="/" onClick={handleRandomCityClick}>
                <span>{randomCity}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
