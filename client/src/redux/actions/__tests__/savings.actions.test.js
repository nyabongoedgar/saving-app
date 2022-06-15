import nock from "nock";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import httpAdapter from "axios/lib/adapters/http";

import { CREATE_SAVING } from "../actionTypes";

import { createSaving } from "../savingsActions";
import axiosInstance from "../../../helpers/axios";

const host = "http://localhost:8080";
axiosInstance.defaults.baseURL = "http://localhost:8080";
axiosInstance.defaults.host = host;
axiosInstance.defaults.adapter = httpAdapter;

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Savings actions", () => {
  let store;
  let initialState;

  beforeEach(() => {
    initialState = {
      savings: {
        savings: [],
        error: null,
        loading: false,
        addStatus: false,
      },
    };
    store = mockStore(initialState);
  });

  afterEach(() => {
    nock.cleanAll();
  });

  it("should dispatch expected success actions to login in user", async () => {
    const date = new Date();
    nock("http://localhost:8080")
      .post(`/api/v1/savings`)
      .reply(200, { amount: 100, description: "any", date });

    await store.dispatch(
      createSaving({ amount: 100, description: "any", date })
    );

    const actions = store.getActions();
    expect(actions.length).toEqual(2);
    expect(actions[0].type).toBe(CREATE_SAVING.INIT);
    expect(actions[1].type).toBe(CREATE_SAVING.SUCCESS);
    expect(actions[1]).toMatchObject({
      type: CREATE_SAVING.SUCCESS,
      payload: { amount: 100, description: "any", date: new Date(date).toISOString(), },
    });
  });

  it("should dispatch expected error actions on api error", async () => {
    const date = new Date();
    nock("http://localhost:8080")
      .post(`/api/v1/savings`)
      .reply(400, { error: "error" });

    await store.dispatch(
      createSaving({ amount: 100, description: "any", date })
    );

    const actions = store.getActions();

    expect(actions.length).toEqual(2);
    expect(actions[0].type).toBe(CREATE_SAVING.INIT);
    expect(actions[1].type).toBe(CREATE_SAVING.ERROR);
  });
});
