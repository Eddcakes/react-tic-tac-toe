import React from "react";

function Square({sqId, squares, onClick}) {
  return (
    <button
      id={`zone${sqId}`}
      className="square"
      type="button"
      onClick={onClick}
      data-testid={`zone${sqId}`}
    >
      {squares}
    </button>
  );
}

export default Square