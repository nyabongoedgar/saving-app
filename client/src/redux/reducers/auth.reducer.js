import * as actionTypes from '../actions/actionTypes';

const token = localStorage.getItem('token');

const initialState = {
  loading: false,
  isAuthenticated: token !== null && token !== undefined && Boolean(token),
  error: null,
  user: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
  case actionTypes.LOGIN_USER.INIT:
    return {
      ...state,
      loading: true,
      error: null,
    };
  case actionTypes.LOGIN_USER.SUCCESS:
    return {
      ...state,
      loading: false,
      isAuthenticated: true,
      error: null,
    };
  case actionTypes.LOGIN_USER.ERROR:
    return {
      ...state,
      loading: false,
      isAuthenticated: false,
      error: action.payload,
    };
  case actionTypes.LOGOUT_USER.SUCCESS:
    return {
      loading: false,
      isAuthenticated: false,
      error: null,
      user: null,
    };

  default:
    return {
      ...state,
    };
  }
};

export default authReducer;
