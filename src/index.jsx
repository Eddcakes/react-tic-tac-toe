import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./styles.css";

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.squares}
    </button>
  );
}

function Board(props) {
  const renderSquare = i => (
    <Square squares={props.squares[i]} onClick={() => props.onClick(i)} />
  );
  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}

function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const handleClick = i => {
    if (calculateWinner(current) || current[i]) {
      //if winner then do not allow anymore play
      //current[i] is here to prevent overwriting squares
      return;
    }
    const sq = current.slice();
    sq[i] = xIsNext ? "X" : "O";
    setHistory(history.slice(0, stepNumber + 1).concat([sq]));
    setStepNumber(stepNumber + 1);
    setXIsNext(!xIsNext);
  };
  const jumpTo = step => {
    setStepNumber(step);
    //if number we are changing to is even then x is next
    setXIsNext(step % 2 === 0);
  };
  let coord;
  if (history.length > 1) {
    let his1 = history[history.length - 1]
    let his2 = history[history.length - 2]
    let newArr = []
    for (let i = 0; i < his1.length; i++){
      if (his1[i] === his2[i]){
        newArr[i] = null
      }else{
        newArr[i] = his1[i]
      }
    }
    coord = calculateCoord(newArr)
  }
  //console.log(coord)
  const current = history[stepNumber];
  const winner = calculateWinner(current);
  const moves = history.map((step, move) => {
    console.log(history[move])
    const btnDesc = move ? `Go to move #${move} Coords: ${coord}` : `Go to game start`;
    let currentStyle;
    stepNumber === move
      ? (currentStyle = { fontWeight: "bold" })
      : (currentStyle = { fontWeight: "normal" });

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)} style={currentStyle}>{btnDesc}</button>
      </li>
    );
  });

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next player: ${xIsNext ? "X" : "O"}`;
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current} onClick={i => handleClick(i)} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  //all winning moves
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function calculateCoord(arr) {
  const size = 3
  let count = 0
  let location = []
  for (let i = 0; i < size; i++) {
      arr[i] = []
    for (let j = 0; j < size; j++, count++) {
    //console.log(`i: ${i}, j: ${j}`)
        arr[i][j] = arr[count]
        if (arr[count] !== null){
          location = [i+1,j+1]
        }
    }
  }
    return location
}
// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
