import reducer from '../savings.reducer';
import * as actions from '../../actions/actionCreators/savingsCreators';

describe('Savings Reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual({
        savings: [],
        error: null,
        loading: false,
        addStatus: false,
    });
  });

  it('should handle successful savings deposit', () => {
    const previousState = {
        savings: [],
        error: null,
        loading: false,
        addStatus: false,
    };
    const date = new Date();
    expect(
      reducer(
        previousState,
        actions.createSavingSuccess({ saving: { amount: 100, description: "any", date}}),
        )
    ).toEqual({
        savings: [{ amount: 100, description: "any", date}],
        error: null,
        loading: false,
        addStatus: false,
    });
  });

  it('should handle unsuccessful saving deposit', () => {
    const previousState = {
        savings: [],
        error: null,
        loading: false,
        addStatus: false,
    };
    expect(
      reducer(previousState, actions.createSavingError({error: 'failed'})),
    ).toEqual({
        savings: [],
        loading: false,
        addStatus: false,
        error: 'failed',
    });
  });
});
