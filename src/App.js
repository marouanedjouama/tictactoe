import { useState } from "react";
import { Board } from "./Board.";
export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const pastmoves = history.map((squares, move) => {
    let description;
    let style = {};
    if (move == currentMove) {
      description = "current move : #" + move;
      style.border = "none";
    } else {
      description = "move : #" + move;
    }

    return move === 0 ? (
      <></>
    ) : (
      <li key={move}>
        <button
          className="moveButtons"
          onClick={() => {
            jumpTo(move);
            setIsOpen(false);
          }}
          style={style}
        >
          {description}
        </button>
      </li>
    );
  });

  const controlButtons = () => {
    const [selectedOption, setSelectedOption] = useState("jump to");

    const toggleDropdown = () => setIsOpen(!isOpen);

    return currentMove === 0 ? (
      <></>
    ) : currentMove > 1 ? (
      <>
        <div className="dropdown">
          <button className="controlButtons" onClick={toggleDropdown}>
            {selectedOption}
          </button>
          {isOpen && <ul className="dropdown-menu">{pastmoves}</ul>}
        </div>
        <button
          className="controlButtons"
          onClick={() => {
            jumpTo(0);
            setIsOpen(false);
          }}
        >
          restart
        </button>
      </>
    ) : (
      <button
        className="controlButtons"
        onClick={() => {
          jumpTo(0);
          setIsOpen(false);
        }}
      >
        restart
      </button>
    );
  };

  return (
    <>
      <div className="game">
        <div>
          <Board
            xIsNext={xIsNext}
            squares={currentSquares}
            onPlay={handlePlay}
          />
        </div>
      </div>
      <div className="game-info">{controlButtons()}</div>
    </>
  );
}
