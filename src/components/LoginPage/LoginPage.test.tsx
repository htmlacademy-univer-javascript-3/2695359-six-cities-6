import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import LoginPage from './LoginPage';
import { AuthorizationStatus } from '../../const';

const mockStore = configureMockStore();

describe('LoginPage', () => {
  const initialState = {
    user: {
      authorizationStatus: AuthorizationStatus.NoAuth,
      user: null,
    },
    favorites: {
      favorites: [],
      isLoading: false,
    },
  };

  it('should render login form correctly', () => {
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByRole('heading', { name: /sign in/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('should display random city link', () => {
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>
    );

    const cityLinks = screen.getAllByRole('link');
    const cityLink = cityLinks[cityLinks.length - 1];
    const cityText = cityLink.textContent;

    expect(['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf']).toContain(cityText);
  });

  it('should show error when password does not contain letter', async () => {
    const store = mockStore(initialState);
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>
    );

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    await user.type(emailInput, 'test@test.com');
    await user.type(passwordInput, '12345');
    await user.click(submitButton);

    expect(screen.getByText(/password must contain at least one letter and one number/i)).toBeInTheDocument();
  });

  it('should show error when password does not contain number', async () => {
    const store = mockStore(initialState);
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>
    );

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    await user.type(emailInput, 'test@test.com');
    await user.type(passwordInput, 'password');
    await user.click(submitButton);

    expect(screen.getByText(/password must contain at least one letter and one number/i)).toBeInTheDocument();
  });

  it('should accept valid password without showing error', async () => {
    const store = mockStore(initialState);
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>
    );

    const passwordInput = screen.getByPlaceholderText('Password');

    await user.type(passwordInput, 'validPassword123');

    expect(screen.queryByText(/password must contain at least one letter and one number/i)).not.toBeInTheDocument();
  });

  it('should have email input with correct type', () => {
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>
    );

    const emailInput = screen.getByPlaceholderText('Email');
    expect(emailInput).toHaveAttribute('type', 'email');
  });

  it('should have password input with correct type', () => {
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>
    );

    const passwordInput = screen.getByPlaceholderText('Password');
    expect(passwordInput).toHaveAttribute('type', 'password');
  });
});
