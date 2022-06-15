import reducer from '../auth.reducer';
import * as actions from '../../actions/actionCreators/authCreators';

describe('Authentication Reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      loading: false,
      isAuthenticated: false,
      error: null,
      user: null,
    });
  });

  it('should handle successful login', () => {
    const previousState = {
      loading: false,
      isAuthenticated: false,
      error: null,
      user: null,
    };
    expect(
      reducer(
        previousState,
        actions.loginUserSuccess({
          loading: false,
          isAuthenticated: true,
          error: null,
        }),
      ),
    ).toEqual({
      loading: false,
      error: null,
      isAuthenticated: true,
      user: null,
    });
  });

  it('should handle unsuccessful login', () => {
    const previousState = {
      loading: false,
      isAuthenticated: false,
      error: null,
      user: null,
    };
    expect(
      reducer(previousState, actions.loginUserError('login failed')),
    ).toEqual({
      loading: false,
      isAuthenticated: false,
      error: 'login failed',
      user: null,
    });
  });

  it('should handle logout', () => {
    const previousState = {
      loading: false,
      isAuthenticated: false,
      error: null,
      user: null,
    };
    expect(
      reducer(previousState, actions.logoutUserSuccess()),
    ).toEqual({
      loading: false,
      isAuthenticated: false,
      error: null,
      user: null,
    });
  });
});
