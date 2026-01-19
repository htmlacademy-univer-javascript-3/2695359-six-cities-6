import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import ReviewForm from './ReviewForm';

const mockStore = configureMockStore();

describe('ReviewForm', () => {
  const initialState = {
    reviews: {
      isSubmitting: false,
    },
  };

  it('should render form elements correctly', () => {
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <ReviewForm offerId="1" />
      </Provider>
    );

    expect(screen.getByLabelText(/your review/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/tell how was your stay/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
    expect(screen.getAllByRole('radio')).toHaveLength(5);
  });

  it('should have disabled submit button initially', () => {
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <ReviewForm offerId="1" />
      </Provider>
    );

    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(submitButton).toBeDisabled();
  });

  it('should enable submit button when form is valid', async () => {
    const store = mockStore(initialState);
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <ReviewForm offerId="1" />
      </Provider>
    );

    const ratingInput = screen.getByDisplayValue('5');
    await user.click(ratingInput);

    const textarea = screen.getByPlaceholderText(/tell how was your stay/i);
    await user.type(textarea, 'A'.repeat(50));

    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(submitButton).not.toBeDisabled();
  });

  it('should keep submit button disabled when review is too short', async () => {
    const store = mockStore(initialState);
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <ReviewForm offerId="1" />
      </Provider>
    );

    const ratingInput = screen.getByDisplayValue('5');
    await user.click(ratingInput);

    const textarea = screen.getByPlaceholderText(/tell how was your stay/i);
    await user.type(textarea, 'Short review');

    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(submitButton).toBeDisabled();
  });

  it('should update rating when clicking on stars', async () => {
    const store = mockStore(initialState);
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <ReviewForm offerId="1" />
      </Provider>
    );

    const goodRating = screen.getByDisplayValue('4');
    await user.click(goodRating);

    expect(goodRating).toBeChecked();
  });

  it('should update textarea value when typing', async () => {
    const store = mockStore(initialState);
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <ReviewForm offerId="1" />
      </Provider>
    );

    const textarea = screen.getByPlaceholderText(/tell how was your stay/i) ;
    const testText = 'This is a test review that is long enough to be valid';

    await user.type(textarea, testText);

    expect(textarea.value).toBe(testText);
  });

  it('should disable all inputs when submitting', () => {
    const store = mockStore({
      reviews: {
        isSubmitting: true,
      },
    });

    render(
      <Provider store={store}>
        <ReviewForm offerId="1" />
      </Provider>
    );

    const submitButton = screen.getByRole('button', { name: /submit/i });
    const textarea = screen.getByPlaceholderText(/tell how was your stay/i);
    const ratingInputs = screen.getAllByRole('radio');

    expect(submitButton).toBeDisabled();
    expect(textarea).toBeDisabled();
    ratingInputs.forEach((input) => {
      expect(input).toBeDisabled();
    });
  });
});
