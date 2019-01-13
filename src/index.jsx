import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./styles.css";

function OrderButton({reorderClick, btnText, ...props}){
  return (
    <button onClick={reorderClick}> 
      {btnText}
    </button>
  )
}

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
        return board.push(
          <Square 
            key={"square"+sqNum} 
            squares={props.squares[sqNum]} 
            onClick={() => props.onClick(sqNum)}
          />
        )
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
  const [isAssending,setIsAssending] = useState(true)
  const current = history[stepNumber];
  const winner = calculateWinner(current);
  const handleClick = i => {
    if (winner || current[i]) {
      //if winner then do not allow anymore play
      //current[i] is here to prevent overwriting squares
      
      //can we add style to current here
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
  const moves = history.map((step, move) => {
    const btnDesc = move ? `Go to move #${move} (${coordinate[move]})` : `Go to game start`;
    let currentStyle;
    stepNumber === move
      ? (currentStyle = { fontWeight: "bold" })
      : (currentStyle = { fontWeight: "normal" });
    return (
      <li key={"GoTo" + move}>
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
  const reorder = () => {
    setIsAssending(!isAssending)
  }
  let movesByOrder //moves or moves.reverse
  let isReversed //boolen
  if (isAssending){
    movesByOrder = moves
    isReversed = false
  }else{
    movesByOrder = moves.slice().reverse()
    isReversed = true
  }
  return (
    <div className="game">
      <div className="game-board">
        <Board 
          squares={current} 
          onClick={i => handleClick(i)} 
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <div>
          <OrderButton 
            reorderClick={() => reorder()} 
            btnText={isAssending ? "Set decending" : "Set Assending"}
          />
          </div>
        <ol reversed={isReversed}>{movesByOrder}</ol>
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
  const winningStyle = {backgroundColor: "yellow"}
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      let boardSqs = document.getElementsByClassName('square')
      lines[i].map( (v) => boardSqs[v].style.background = 'yellow' )
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
