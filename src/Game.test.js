import React from "react";
import Game from "./Game";
/*
JEST -
test(name, fn, timeout)
Also under the alias: it(name, fn, timeout)
*/

import {
  render,
  cleanup,
  fireEvent,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

//jest after each test run cleanup
afterEach(cleanup);

it("renders", () => {
  const { asFragment } = render(<Game size={3}/>);
  //Snapshots aren't always great if we want to change html -> tree u to update tests
  expect(asFragment()).toMatchSnapshot();
});

//mount in enzyme is similar to render() in react-testing-library

it("Players take turns", () => {
  const { container, getByText, queryAllByTestId  } = render(<Game size={3}/>);
  //find the text for first player "Next player:"
  const firstPlayer = getByText(/Next player/i);
  //expect(firstPlayer.textContent).toBe("Next player: X");
  expect(firstPlayer).toHaveTextContent("X");
  const squares = queryAllByTestId(/zone/i);
  fireEvent.click(squares[0]);
  const secondPlayer = getByText(/Next player/i);
  expect(secondPlayer).toHaveTextContent("O");
})

/*
test("Allows user to set ascending/descending", () => {
  const { getByText } = render(
    <Game size={3}/>
  );
  const orderButton = getByText("set")

  //fireEvent.click(orderButton)
})
*/