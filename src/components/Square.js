import React from "react";

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.squares}
    </button>
  );
}

export default Square