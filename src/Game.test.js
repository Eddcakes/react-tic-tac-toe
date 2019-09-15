import React from "react";
import Game from "./Game";
import {
  render,
  cleanup,
  fireEvent,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

/*
JEST -
test(name, fn, timeout)
Also under the alias: it(name, fn, timeout)
*/

//mount in enzyme is similar to render() in react-testing-library

//jest after each test run cleanup
afterEach(cleanup);

it("renders", () => {
  const { asFragment } = render(<Game size={3}/>);
  //Snapshots aren't always great if we want to change html -> tree u to update tests
  expect(asFragment()).toMatchSnapshot();
});

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
});

test("Allows user to set ascending/descending", () => {
  const { getByText, getAllByText, queryAllByTestId } = render(
    <Game size={3}/>
  );
  const orderButton = getByText(/set/i);
  const squares = queryAllByTestId(/zone/i);
  /* make four moves */
  fireEvent.click(squares[0]);
  fireEvent.click(squares[1]);
  fireEvent.click(squares[2]);
  fireEvent.click(squares[3]);
  const liButtonsPre = getAllByText(/go to/i);
  expect(liButtonsPre[4]).toHaveTextContent("Go to move #4");
  fireEvent.click(orderButton);
  const liButtonsPost = getAllByText(/go to/i);
  expect(liButtonsPost[4]).toHaveTextContent("Go to game start");
});

//test Go to #move
it("Go to goes back in history", () => {
  const { queryAllByTestId, getAllByText } = render(
    <Game size={3}/>
  );
  const squares = queryAllByTestId(/zone/i);
  /* make four moves */
  fireEvent.click(squares[0]);
  fireEvent.click(squares[1]);
  fireEvent.click(squares[2]);
  fireEvent.click(squares[3]);
  const goToMove = getAllByText(/go to move/i);
  expect(goToMove).toHaveLength(4);
  //expect(squares).toHaveTextContent(/x|o/i).toHaveLength(4);
  const filledSqPre = getAllByText(/O|X/)
  expect(filledSqPre).toHaveLength(4);
  //its grabbing Next player: X too - i dont want this
  //fireEvent.click(goToMove[2]);
  //
});

//test winner
it("3 in a row is winner", () => {
  const {  } = render(
    <Game size={3}/>
  );
});

it("full board with no winner is draw", () => {
  const {  } = render(
    <Game size={3}/>
  );
});