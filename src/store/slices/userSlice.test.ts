import { describe, it, expect } from 'vitest';
import userReducer, { setAuthorizationStatus, setUser } from './userSlice';
import { checkAuthAction, loginAction, logoutAction } from '../actions/userActions';
import { AuthorizationStatus } from '../../const';

describe('userSlice', () => {
  const initialState = {
    authorizationStatus: AuthorizationStatus.Unknown,
    user: null,
  };

  const mockUser = {
    name: 'John Doe',
    avatarUrl: 'avatar.jpg',
    isPro: false,
    email: 'john@example.com',
    token: 'test-token',
  };

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const result = userReducer(undefined, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should set authorization status with "setAuthorizationStatus" action', () => {
    const result = userReducer(initialState, setAuthorizationStatus(AuthorizationStatus.Auth));

    expect(result.authorizationStatus).toBe(AuthorizationStatus.Auth);
  });

  it('should set user with "setUser" action', () => {
    const result = userReducer(initialState, setUser(mockUser));

    expect(result.user).toEqual(mockUser);
  });

  it('should set auth status and user with "checkAuthAction.fulfilled"', () => {
    const result = userReducer(
      initialState,
      checkAuthAction.fulfilled(mockUser, '', undefined)
    );

    expect(result.authorizationStatus).toBe(AuthorizationStatus.Auth);
    expect(result.user).toEqual(mockUser);
  });

  it('should set auth status to NoAuth with "checkAuthAction.rejected"', () => {
    const result = userReducer(
      initialState,
      checkAuthAction.rejected(null, '', undefined)
    );

    expect(result.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
  });

  it('should set auth status and user with "loginAction.fulfilled"', () => {
    const result = userReducer(
      initialState,
      loginAction.fulfilled(mockUser, '', { email: 'test@test.com', password: 'password' })
    );

    expect(result.authorizationStatus).toBe(AuthorizationStatus.Auth);
    expect(result.user).toEqual(mockUser);
  });

  it('should reset auth status and user with "logoutAction.fulfilled"', () => {
    const stateWithUser = {
      authorizationStatus: AuthorizationStatus.Auth,
      user: mockUser,
    };
    const result = userReducer(
      stateWithUser,
      logoutAction.fulfilled(undefined, '', undefined)
    );

    expect(result.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
    expect(result.user).toBeNull();
  });
});
