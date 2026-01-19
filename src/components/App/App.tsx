import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from '../MainPage/MainPage';
import LoginPage from '../LoginPage/LoginPage';
import FavoritesPage from '../FavoritesPage/FavoritesPage';
import OfferPage from '../OfferPage/OfferPage';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import { useAppSelector } from '../../hooks';

function App(): JSX.Element {
  const offers = useAppSelector((state) => state.offers);
  const favoriteOffers = offers.filter((offer) => offer.isFavorite);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/favorites"
          element={
            <PrivateRoute isAuthorized={false}>
              <FavoritesPage offers={favoriteOffers} />
            </PrivateRoute>
          }
        />
        <Route path="/offer/:id" element={<OfferPage offers={offers} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
