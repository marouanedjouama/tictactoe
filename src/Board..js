import { Square } from "./Square";

export function Board({ xIsNext, squares, onPlay, gameModeIs1V1 }) {
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
    if (
      (!gameModeIs1V1 && !xIsNext) ||
      squares[i] ||
      calculateWinner(squares) !== null
    ) {
      return;
    }

    if (gameModeIs1V1) {
    }

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    onPlay(nextSquares);
  }

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function computer_turn() {
    if (calculateWinner(squares) !== null) {
      return;
    }

    let position_to_play = null;

    if (!squares[4]) {
      // take the middle if available
      position_to_play = 4;
    } else {
      lines.every((line) => {
        // if x is going to win, block him, or if o has a chance to win, take it
        let xcount = line.filter((element) => squares[element] === "X").length;
        let ocount = line.filter((element) => squares[element] === "O").length;
        console.log(`xcount : ${xcount}`);

        if (Math.max(xcount, ocount) === 2) {
          for (let i = 0; i < 3; i++) {
            if (!squares[line[i]]) {
              position_to_play = line[i];
              console.log(`ocoposition_to_playunt : ${position_to_play}`);
              return false; // i actually want to break from the foreach loop
            }
          }
        }
        return true;
      });
    }

    // random move
    if (!position_to_play) {
      while (true) {
        let index = getRandomInt(0, 8);
        if (!squares[index]) {
          position_to_play = index;
          break;
        }
      }
    }

    const nextSquares = squares.slice();
    nextSquares[position_to_play] = "O";
    onPlay(nextSquares);
  }

  if (!gameModeIs1V1) {
    if (!xIsNext) {
      setTimeout(() => {
        computer_turn();
      }, 600);
    }
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
      <div className="status">{status}</div>
      <div className="x-o-board">{boardRows}</div>
    </>
  );
}
