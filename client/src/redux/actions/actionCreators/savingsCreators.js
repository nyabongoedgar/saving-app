import * as actionTypes from "../actionTypes";

export const createSavingInit = () => ({
  type: actionTypes.CREATE_SAVING.INIT,
});

export const createSavingSuccess = (payload) => ({
  type: actionTypes.CREATE_SAVING.SUCCESS,
  payload,
});

export const createSavingError = (error) => ({
  type: actionTypes.CREATE_SAVING.ERROR,
  payload: error,
});

export const getSavingsInit = () => ({
    type: actionTypes.GET_SAVINGS.INIT,
});
  
  export const getSavingsSuccess = (payload) => ({
    type: actionTypes.GET_SAVINGS.SUCCESS,
    payload,
  });
  
  export const getSavingsError = (error) => ({
    type: actionTypes.GET_SAVINGS.ERROR,
    payload: error,
  });
  
