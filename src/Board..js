import { Square } from "./Square";

export function Board({ xIsNext, squares, onPlay }) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function calculateWinner() {
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return i; /* the index of the winning squares in lines */
      }
    }

    for (let j = 0; j < 9; j++) {
      if (!squares[j]) {
        /* true if null */
        return null;
      }
    }

    return -1; /* draw */
  }

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares) !== null) {
      /* return when draw, or there is a winner, or the square[i] is true */
      return;
    }

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    onPlay(nextSquares);
  }

  const i = calculateWinner(squares);

  let status;
  if (i !== null) {
    if (i === -1) {
      status = `result: DRAW !`;
    } else {
      status = `${squares[lines[i][0]]} WINS !`;
    }
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  const boardSize = 3; // For a 3x3 grid
  const boardRows = Array(boardSize)
    .fill(null)
    .map((_, rowIndex) => {
      return (
        <div className="board-row" key={rowIndex}>
          {Array(boardSize)
            .fill(null)
            .map((_, colIndex) => {
              const index = rowIndex * boardSize + colIndex;
              let color;
              if (i !== null && i !== -1) {
                if (lines[i].includes(index)) color = "green";
              }

              return (
                <Square
                  key={index}
                  squareIndex={index}
                  value={squares[index]}
                  onSquareClick={() => handleClick(index)}
                  color={color}
                />
              );
            })}
        </div>
      );
    });

  return (
    <>
      <div className="status">
        <b>{status}</b>
      </div>
      {boardRows}
    </>
  );
}
