import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import { AuthorizationStatus } from '../../const';

const mockStore = configureMockStore();

describe('PrivateRoute', () => {
  it('should render children when user is authorized', () => {
    const store = mockStore({
      user: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: null,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/private']}>
          <Routes>
            <Route
              path="/private"
              element={
                <PrivateRoute>
                  <div>Private Content</div>
                </PrivateRoute>
              }
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Private Content')).toBeInTheDocument();
  });

  it('should redirect to /login when user is not authorized', () => {
    const store = mockStore({
      user: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        user: null,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/private']}>
          <Routes>
            <Route
              path="/private"
              element={
                <PrivateRoute>
                  <div>Private Content</div>
                </PrivateRoute>
              }
            />
            <Route path="/login" element={<div>Login Page</div>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.queryByText('Private Content')).not.toBeInTheDocument();
    expect(screen.getByText('Login Page')).toBeInTheDocument();
  });
});
