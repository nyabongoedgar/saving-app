import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import httpAdapter from 'axios/lib/adapters/http';

import { LOGIN_USER } from '../actionTypes';

import {loginUser} from '../authActions';
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
      auth: {
        loading: false,
        isAuthenticated: false,
        error: null,
        user: null,
      },
    };
    store = mockStore(initialState);
  });

  afterEach(() => {
    nock.cleanAll();
  });

  it('should dispatch expected success actions to login in user', async () => {
    nock('http://localhost:8080')
      .post(`/api/v1/users/authenticate`)
      .reply(200, { token: "abc" });

    await store.dispatch(loginUser({email: "test@gmail.com", password: "test"}));

    const actions = store.getActions();

    expect(actions.length).toEqual(2);
    expect(actions[0].type).toBe(LOGIN_USER.INIT);
    expect(actions[1].type).toBe(LOGIN_USER.SUCCESS);
    expect(actions[1]).toMatchObject({
      type: LOGIN_USER.SUCCESS,
      payload: undefined ,
    });
  });

  it('should dispatch expected error actions on api error', async () => {
    nock('http://localhost:8080')
      .post(`/api/v1/users/authenticate`)
      .reply(400, { error: "error"});

    await store.dispatch(loginUser({email: "test@gmail.com", password: "test"}));

    const actions = store.getActions();

    expect(actions.length).toEqual(2);
    expect(actions[0].type).toBe(LOGIN_USER.INIT);
    expect(actions[1].type).toBe(LOGIN_USER.ERROR);
  });
});
