import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from '../MainPage/MainPage';
import LoginPage from '../LoginPage/LoginPage';
import FavoritesPage from '../FavoritesPage/FavoritesPage';
import OfferPage from '../OfferPage/OfferPage';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import Spinner from '../Spinner/Spinner';
import { useAppSelector } from '../../hooks';
import { selectOffersLoading, selectAuthorizationStatus } from '../../store/selectors';
import { AuthorizationStatus } from '../../const';

function App(): JSX.Element {
  const isOffersLoading = useAppSelector(selectOffersLoading);
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);

  if (isOffersLoading || authorizationStatus === AuthorizationStatus.Unknown) {
    return <Spinner />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/favorites"
          element={
            <PrivateRoute>
              <FavoritesPage />
            </PrivateRoute>
          }
        />
        <Route path="/offer/:id" element={<OfferPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
