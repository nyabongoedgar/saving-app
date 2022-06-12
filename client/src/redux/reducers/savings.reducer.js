import {GET_SAVINGS, CREATE_SAVING} from '../actions/actionTypes';
  
  const savingsInitialState = {
    savings: [],
    error: null,
    loading: false,
    addStatus: false,
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
 
    
      case CREATE_SAVING.INIT:
        return {
          ...state,
          addStatus: true,
        };
      case CREATE_SAVING.SUCCESS:
        // eslint-disable-next-line no-case-declarations
        return {
          ...state,
          addStatus: false,
          savings: [action.payload.saving, ...state.savings],
        };
      case CREATE_SAVING.ERROR:
        return {
          ...state,
          addStatus: false,
          error: action.payload.error,
        };
    default:
      return state;
    }
  };
  
  export default SavingsReducer;
  