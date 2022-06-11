import axiosInstance from '../../helpers/axios';
import * as actions from './actionCreators/authCreators';
import notify from "../../helpers/notification";

export const loginUser = ({ username, password }) => async (dispatch) => {
  dispatch(actions.loginUserInit());

  const body = { username, password };
  // simulate a success login
  if (process.env.REACT_APP_ENV === 'testing') {
    localStorage.setItem('token', 'access_token');
    await dispatch(actions.loginUserSuccess());
  } else {
    try {
      const res = await axiosInstance.post(
        '/api/v1/users/authenticate',
        body,
      );
      localStorage.setItem('token', res.data.token);
      dispatch(actions.loginUserSuccess());
    } catch (error) {
      if (error.response) {
        localStorage.removeItem('token');
        dispatch(actions.loginUserError(error.response.data.detail));
        notify('error', 'Authentication error', error.response.data.detail);
      } else {
        dispatch(actions.loginUserError(`${error}`));
      }
    }
  }
};

export const registerUser = ({ username, password }) => async (dispatch) => {
    dispatch(actions.registerUserInit());
  const body = { username, password };  
      try {
        await axiosInstance.post(
          '/api/v1/users/register',
          body,
        );
        dispatch(actions.registerUserSuccess());
        notify('success', 'Account successfully register');
      } catch (error) {
        if (error.response) {
          dispatch(actions.registerUserError(error.response.data));
          notify('error', 'Registration Error', error.response.data.detail);
        } else {
          dispatch(actions.registerUserError(`${error}`));
        }
      }
    
  };


export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('token');
  localStorage.removeItem('refresh');
  dispatch(actions.logoutUserSuccess());
};
