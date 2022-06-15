import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import httpAdapter from 'axios/lib/adapters/http';

import { REGISTER_USER } from '../actionTypes';

import {registerUser} from '../authActions';
import axiosInstance from '../../../helpers/axios';

const host = 'http://localhost:8080';
axiosInstance.defaults.baseURL = 'http://localhost:8080';
axiosInstance.defaults.host = host;
axiosInstance.defaults.adapter = httpAdapter;

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Authentication actions', () => {
  let store;
  let initialState;

  beforeEach(() => {
    initialState = {
      register: {
        loading: false,
        error: null,
      },
    };
    store = mockStore(initialState);
  });

  afterEach(() => {
    nock.cleanAll();
  });

  it('should dispatch expected success actions to login in user', async () => {
    nock('http://localhost:8080')
      .post(`/api/v1/users/register`)
      .reply(200, { token: "abc" });

    await store.dispatch(registerUser({email: "test@gmail.com", password: "test"}));

    const actions = store.getActions();

    expect(actions.length).toEqual(2);
    expect(actions[0].type).toBe(REGISTER_USER.INIT);
    expect(actions[1].type).toBe(REGISTER_USER.SUCCESS);
    expect(actions[1]).toMatchObject({
      type: REGISTER_USER.SUCCESS,
      payload: undefined ,
    });
  });

  it('should dispatch expected error actions on api error', async () => {
    nock('http://localhost:8080')
      .post(`/api/v1/users/register`)
      .reply(400, { error: "error"});

    await store.dispatch(registerUser({email: "test@gmail.com", password: "test"}));

    const actions = store.getActions();

    expect(actions.length).toEqual(2);
    expect(actions[0].type).toBe(REGISTER_USER.INIT);
    expect(actions[1].type).toBe(REGISTER_USER.ERROR);
  });
});
