import * as actions from '../authCreators';
import * as actionTypes from '../../actionTypes';

describe('actions', () => {
  it('should create an action to initialize login', () => {
    const expectedAction = {
      type: actionTypes.LOGIN_USER.INIT,
    };
    expect(actions.loginUserInit()).toEqual(expectedAction);
  });

  it('should create an action to for successful login', () => {
    const expectedAction = {
      type: actionTypes.LOGIN_USER.SUCCESS,
      payload: { token: '' },
    };
    const payload = {
      token: '',
    };
    expect(actions.loginUserSuccess(payload)).toEqual(expectedAction);
  });

  it('should create an action to for a failed login', () => {
    const expectedAction = {
      type: actionTypes.LOGIN_USER.ERROR,
      payload: { error: '' },
    };
    const payload = {
      error: '',
    };
    expect(actions.loginUserError(payload)).toEqual(expectedAction);
  });

  it('should create an action to for a successful logout', () => {
    const expectedAction = {
      type: actionTypes.LOGOUT_USER.SUCCESS,
    };

    expect(actions.logoutUserSuccess()).toEqual(expectedAction);
  });
});
