import React from "react";
import Square from "./Square";

function Board({squares, onClick, size,...props}) {
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
            sqId={sqNum}
            key={`square${sqNum}`} 
            squares={squares[sqNum]} 
            onClick={() => onClick(sqNum)}
          />
        )
      })
    })
    return board
  }
  return (
    <div>
      {renderGameBoard(size)}
    </div>
  );
}

export default Board