import * as actions from '../savingsCreators';
import * as actionTypes from '../../actionTypes';

describe('actions', () => {
  it('should create an action to initialize saving action', () => {
    const expectedAction = {
      type: actionTypes.CREATE_SAVING.INIT,
    };
    expect(actions.createSavingInit()).toEqual(expectedAction);
  });

  it('should create an action for creating a saving', () => {
    const expectedAction = {
      type: actionTypes.CREATE_SAVING.SUCCESS,
      payload: { saving: {} },
    };
    const payload = {
      saving: {},
    };
    expect(actions.createSavingSuccess(payload)).toEqual(expectedAction);
  });

  it('should create an action to for a failed login', () => {
    const expectedAction = {
      type: actionTypes.CREATE_SAVING.ERROR,
      payload: { error: '' },
    };
    const payload = {
      error: '',
    };
    expect(actions.createSavingError(payload)).toEqual(expectedAction);
  });

it('should create an init action for getting all savings', () => {
    const expectedAction = {
      type: actionTypes.GET_SAVINGS.INIT,
    };
    expect(actions.getSavingsInit()).toEqual(expectedAction);
  });

  it('should create a success action for getting savings', () => {
    const expectedAction = {
      type: actionTypes.GET_SAVINGS.SUCCESS,
      payload: { savings: [] },
    };
    const payload = {
      savings: [],
    };
    expect(actions.getSavingsSuccess(payload)).toEqual(expectedAction);
  });

  it('should create an action for a failed savings retreival action', () => {
    const expectedAction = {
      type: actionTypes.GET_SAVINGS.ERROR,
      payload: { error: '' },
    };
    const payload = {
      error: '',
    };
    expect(actions.getSavingsError(payload)).toEqual(expectedAction);
  });
});
