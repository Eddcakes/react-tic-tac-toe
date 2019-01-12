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
  const renderGameBoard = boardSize =>{
    let row = new Array(boardSize)
    let col = new Array(boardSize)
    row = row.fill(0).map( (x, i) => x = i )
    col = col.fill(0).map( (x, i) => x = i )
    const board = []
    row.map( rowNum => {
      board.push(<div key={rowNum} className="board-row"> </div>)
      return col.map( colValue => {
        let rowStart = rowNum * boardSize
        let sqNum = rowStart + colValue
        return board.push( <Square key={3+sqNum} squares={props.squares[sqNum]} onClick={() => props.onClick(sqNum)}/>)
      })
    })
    return board
  }
  return (
    <div>
      {renderGameBoard(3)}
    </div>
  );
}

function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [coordinate, setCoordinate] = useState([Array(2).fill(null)])
  const handleClick = i => {
    if (calculateWinner(current) || current[i]) {
      //if winner then do not allow anymore play
      //current[i] is here to prevent overwriting squares
      return;
    }
    const curBoard = current.slice();
    curBoard[i] = xIsNext ? "X" : "O";
    setHistory(history.slice(0, stepNumber + 1).concat([curBoard]));
    setStepNumber(stepNumber + 1);
    setXIsNext(!xIsNext);
    let lastBoard = history[history.length - 1]
    let theMove = curBoard.map( (value, i) => {
      //find difference between current board and last board if different save else replace with null
      curBoard[i] === lastBoard[i] ? value = null : value = curBoard[i]
      return value
    })
    setCoordinate([...coordinate.slice(0, stepNumber + 1), calculateCoord(theMove)])
  };
  const jumpTo = step => {
    setStepNumber(step);
    //if the number we are changing to is even then x is next
    setXIsNext(step % 2 === 0);
  };
  const current = history[stepNumber];
  const winner = calculateWinner(current);
  const moves = history.map((step, move) => {
    const btnDesc = move ? `Go to move #${move} (${coordinate[move]})` : `Go to game start`;
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
