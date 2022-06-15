import reducer from '../register.reducer';
import * as actions from '../../actions/actionCreators/authCreators';

describe('Registration Reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      loading: false,
      error: null,
    });
  });

  it('should handle successful registration', () => {
    const previousState = {
      loading: false,
      error: null,
    };
    expect(
      reducer(
        previousState,
        actions.registerUserSuccess(),
        )
    ).toEqual({
      loading: false,
      error: null,
    });
  });

  it('should handle unsuccessful registration', () => {
    const previousState = {
      loading: false,
      error: null,
    };
    expect(
      reducer(previousState, actions.registerUserError('failed')),
    ).toEqual({
      loading: false,
      error: 'failed',
    });
  });
});
