import React from "react";
import Game from "./Game";

import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
} from "@testing-library/react"

test('Start point, what we expect in render', () => {
  const { debug } = render(
    <Game size={3}/>
  );
  debug();
})

