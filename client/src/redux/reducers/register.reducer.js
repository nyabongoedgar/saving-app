import * as actionTypes from '../actions/actionTypes';


const initialState = {
  loading: false,
  error: null,
};

const registrationReducer = (state = initialState, action) => {
  switch (action.type) {
  case actionTypes.REGISTER_USER.INIT:
    return {
      ...state,
      loading: true,
      error: null,
    };
  case actionTypes.REGISTER_USER.SUCCESS:
    return {
      ...state,
      loading: false,
      error: null,
    };
  case actionTypes.REGISTER_USER.ERROR:
    return {
      ...state,
      loading: false,
      error: action.payload,
    };

  default:
    return {
      ...state,
    };
  }
};

export default registrationReducer;
