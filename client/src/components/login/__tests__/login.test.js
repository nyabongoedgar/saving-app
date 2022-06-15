import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { MemoryRouter } from "react-router-dom";
import { screen } from "@testing-library/react";
import { render, fireEvent } from "../../../test-utils/utils";
import Login from "../Login";

const handlers = [
  // add initial request handlers
  rest.post("/api/v1/users/authenticate", (req, res, ctx) =>
    res(
      ctx.json({
        token: "refresh token",
      }),
      ctx.delay(10)
    )
  ),
];

jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom");
  return {
    __esModule: true,
    ...originalModule,
    // eslint-disable-next-line react/prop-types
    Redirect: ({ to }) => <>{`Dashboard ${to}`}</>,
  };
});

const server = setupServer(...handlers);

describe("Login", () => {
 
  let initialState;

  // Enable API mocking before tests.
  beforeAll(() => server.listen());

  beforeEach(() => {
    server.listen();
    initialState = {
      auth: {
        loggingIn: false,
        isAuthenticated: false,
        error: null,
      },
    };
  });

  const changeInput = (label, value, getter) => {
    const input = getter(label);
    fireEvent.change(input, { target: { value } });
  };

  // Reset any runtime request handlers we may add during the tests.
  afterEach(() => server.resetHandlers());

  // Disable API mocking after the tests are done.
  afterAll(() => server.close());

  it("should initially load the Login form", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
      { initialState }
    );
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
  });
});
