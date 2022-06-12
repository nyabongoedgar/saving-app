import {GET_SAVINGS} from '../actions/actionTypes';
  
  const savingsInitialState = {
    savings: [],
    error: null,
    loading: false,
  };
  
  const SavingsReducer = (state = savingsInitialState, action) => {
    switch (action.type) {
    case GET_SAVINGS.INIT:
      return {
        ...state,
        loading: true,
      };
    case GET_SAVINGS.SUCCESS:
      // eslint-disable-next-line no-case-declarations
      return {
        ...state,
        loading: false,
        savings: action.payload.savings,
      };
    case GET_SAVINGS.ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
 
    default:
      return state;
    }
  };
  
  export default SavingsReducer;
  