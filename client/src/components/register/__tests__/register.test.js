import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { MemoryRouter } from "react-router-dom";
import { screen } from "@testing-library/react";
import { render, fireEvent } from "../../../test-utils/utils";
import Register from "../Register";

const handlers = [
  // add initial request handlers
  rest.post("/api/v1/users/register", (req, res, ctx) =>
    res(
      ctx.json({
        user: {},
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

describe("Register", () => {
 
  let initialState;

  // Enable API mocking before tests.
  beforeAll(() => server.listen());

  beforeEach(() => {
    server.listen();
    initialState = {
      register: {
        loading: false,
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

  it("should initially load the Register form", () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>,
      { initialState }
    );
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirm Password")).toBeInTheDocument();
  });
});
