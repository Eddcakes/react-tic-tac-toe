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
  //Searching for only one character, we do not want to return "Next player: #"
  const filledSqPre = getAllByText(/^O$|^X$/); 
  expect(filledSqPre).toHaveLength(4);
  fireEvent.click(goToMove[1]); //2nd go to button
  const filledSqPost = getAllByText(/^O$|^X$/); 
  expect(filledSqPost).toHaveLength(2);
});

it("3 in a row is winner", () => {
  const { queryAllByTestId, getByText } = render(
    <Game size={3}/>
  );
  const squares = queryAllByTestId(/zone/i);
  fireEvent.click(squares[0]);
  fireEvent.click(squares[1]);
  fireEvent.click(squares[3]);
  fireEvent.click(squares[4]);
  fireEvent.click(squares[6]);
  const winMsg = getByText(/winner/i);
  expect(winMsg).toHaveTextContent("Winner: X");
});

it("full board with no winner is draw", () => {
  const { queryAllByTestId, getByText } = render(
    <Game size={3}/>
  );
  const squares = queryAllByTestId(/zone/i);
  fireEvent.click(squares[0]); //x
  fireEvent.click(squares[1]); //o
  fireEvent.click(squares[2]); //x
  fireEvent.click(squares[4]); //o
  fireEvent.click(squares[3]); //x
  fireEvent.click(squares[5]); //o
  fireEvent.click(squares[7]); //x
  fireEvent.click(squares[6]); //o
  fireEvent.click(squares[8]); //x
  const drawMsg = getByText(/draw/i);
  expect(drawMsg).toHaveTextContent(/game is a draw/i);
});