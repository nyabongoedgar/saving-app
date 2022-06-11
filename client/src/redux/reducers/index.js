import { combineReducers } from 'redux';

import auth from './auth.reducer';
import register from './register.reducer';

import {
  LOGOUT_USER,
} from '../actions/actionTypes';

const appReducer = combineReducers({
  auth,
  register,
});

const rootReducer = (state, action) => {
  if (action.type === LOGOUT_USER.SUCCESS) {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export default rootReducer;
