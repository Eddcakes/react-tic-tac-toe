import React from "react";
import Game from "./Game";

/*
JEST -
test(name, fn, timeout)
Also under the alias: it(name, fn, timeout)
*/

import {
  render,
  getByText,
  fireEvent,
  cleanup,
  waitForElement,
} from "@testing-library/react"

//jest after each test run cleanup
afterEach(cleanup);

it("renders", () => {
  const { asFragment } = render(<Game size={3}/>);
  //Snapshots aren't always great if we want to change html -> tree u to update tests
  expect(asFragment()).toMatchSnapshot();
});

/*
test("Allows user to set ascending/descending", () => {
  const { getByText } = render(
    <Game size={3}/>
  );
  const orderButton = getByText("set")

  //fireEvent.click(orderButton)
})
*/