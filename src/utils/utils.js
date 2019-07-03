export function calculateWinner(squares) {
  //all winning moves -> a way to do this automagically
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
      return {icon: squares[a], winningMove: lines[i]};
    }
  }
  return null;
}

export function calculateCoord(size, arr) {
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