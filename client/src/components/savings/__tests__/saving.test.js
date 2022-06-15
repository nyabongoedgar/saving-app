import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { MemoryRouter } from "react-router-dom";
import { render, fireEvent,  screen } from "../../../test-utils/utils";
import Savings from "../Savings";

const handlers = [
  rest.get("http://localhost:3001/api/v1/savings", (req, res, ctx) =>
    res(
      ctx.json({ savings: [{
       amount: 100, date: new Date(), description: "any"
      }]}),
      ctx.delay(10)
    )
  ),
];

const server = setupServer(...handlers);

describe("Savings", () => {
 
  let initialState;

  // Enable API mocking before tests.
  beforeAll(() => server.listen());

  beforeEach(() => {
    server.listen();
    initialState = {
      savings: {
        savings: [{
            amount: 100, date: new Date(), description: "any"
        }],
        error: null,
        loading: false,
        addStatus: false,
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

  it("should initially load savings", async () => {
    render(
      <MemoryRouter>
        <Savings />
      </MemoryRouter>,
      { initialState }
    );

    // await waitFor(() => expect(screen.getByText('any')).toBeInTheDocument());
    expect(await screen.findByText("100")).toBeInTheDocument();
    expect(await screen.findByText("any")).toBeInTheDocument();
  });

});
