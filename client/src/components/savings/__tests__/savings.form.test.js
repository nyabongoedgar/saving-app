import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { MemoryRouter } from "react-router-dom";
import { render, fireEvent, screen } from "../../../test-utils/utils";
import SavingsForm from "../SavingsForm";

const handlers = [
  rest.post("http://localhost:3001/api/v1/savings", (req, res, ctx) =>
    res(ctx.json({ message: "Ok" }), ctx.delay(10))
  ),
];

const server = setupServer(...handlers);

describe("SavingsForm", () => {
  let initialState;

  // Enable API mocking before tests.
  beforeAll(() => server.listen());

  beforeEach(() => {
    server.listen();
    initialState = {
      savings: {
        savings: [
          {
            amount: 100,
            date: new Date(),
            description: "any",
          },
        ],
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

  it("should change input value", async () => {
    render(
      <MemoryRouter>
        <SavingsForm visible={true} />
      </MemoryRouter>,
      { initialState }
    );

    changeInput("Enter your deposit", 200, screen.getByPlaceholderText);
    expect(screen.getByPlaceholderText("Enter your deposit").value).toBe("200");
  });
});
