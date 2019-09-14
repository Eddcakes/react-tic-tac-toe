import React from "react";
import Board from "./Board";

import {
  render,
  cleanup,
  getByTestId,
  fireEvent,
} from "@testing-library/react"

afterEach(cleanup);

it("runs the onClick when square is clicked", () => {
  const emptySquares = Array(9).fill(null)
  const onClick = jest.fn();
  const { getByTestId } = render(
    <Board squares={emptySquares} onClick={onClick} size={3}/>
  );
  const squareBtn = getByTestId("zone1");
  
  fireEvent.click(squareBtn);
  expect(onClick).toHaveBeenCalledTimes(1);
})