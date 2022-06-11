import * as actionTypes from "../actionTypes";

export const loginUserInit = () => ({
  type: actionTypes.LOGIN_USER.INIT,
});

export const loginUserSuccess = (payload) => ({
  type: actionTypes.LOGIN_USER.SUCCESS,
  payload,
});

export const loginUserError = (error) => ({
  type: actionTypes.LOGIN_USER.ERROR,
  payload: error,
});

export const logoutUserSuccess = () => ({
  type: actionTypes.LOGOUT_USER.SUCCESS,
});

export const registerUserInit = () => ({
  type: actionTypes.REGISTER_USER.INIT,
});

export const registerUserSuccess = (payload) => ({
  type: actionTypes.REGISTER_USER.SUCCESS,
  payload,
});

export const registerUserError = (error) => ({
  type: actionTypes.REGISTER_USER.ERROR,
  payload: error,
});
