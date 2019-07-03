import React, {useState} from "react";
import OrderButton from "./components/OrderButton";
import Board from "./components/Board";
import {calculateCoord, calculateWinner} from "./utils/utils";

function Game({size, ...props}) {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [coordinate, setCoordinate] = useState([Array(2).fill(null)])
  const [isAssending,setIsAssending] = useState(true)
  const current = history[stepNumber];
  const winner = calculateWinner(current);
  const handleClick = i => {
    if (winner || current[i]) {
      //if winner or same square then do not allow anymore play
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
    setCoordinate([...coordinate.slice(0, stepNumber + 1), calculateCoord(size, theMove)])
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
  let boardSqs = document.getElementsByClassName('square')
  //is this the best way to set a style for winner and remove it ?
  if (winner) {
    status = `Winner: ${winner.icon}`;
    winner.winningMove.map( (v) => boardSqs[v].style.background = 'yellow' )
  }else if (moves.length > size * size){ //size*size is all the available box's so we know it is draw
    status = `This game is a draw!!!`
  }else{
    status = `Next player: ${xIsNext ? "X" : "O"}`;
    for (let boardSq of boardSqs){
      boardSq.style.background = 'none'
    }
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
    <>
    <h1>React tic-tac-toe with hooks</h1>
    <div className="game">
      <div className="game-board">
        <Board 
          squares={current} 
          onClick={i => handleClick(i)}
          size={size}
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
    </>
  );
}

export default Game