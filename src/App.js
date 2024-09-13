import { useState } from "react";
import { Board } from "./Board.";
export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [is1V1, setis1V1] = useState(true);
  const [isChooseMode, setIsChooseMode] = useState(true);
  const toggleDropdown = () => setIsOpen(!isOpen);

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
    let className;
    if (move == currentMove) {
      description = "current move : #" + move;
      className = "curerntMove";
    } else {
      description = "move : #" + move;
      className = "moveButtons";
    }

    return move === 0 ? (
      <></>
    ) : (
      <li key={move}>
        <button
          className={className}
          onClick={() => {
            jumpTo(move);
            setIsOpen(false);
          }}
          // style={style}
        >
          {description}
        </button>
      </li>
    );
  });

  const controlButtons = () => {
    return currentMove === 0 ? (
      <></>
    ) : currentMove > 1 ? (
      <>
        <div className="dropdown">
          <button className="moveButtons" onClick={toggleDropdown}>
            jump tp
          </button>
          {isOpen && <ul className="dropdown-menu">{pastmoves}</ul>}
        </div>
        <button
          className="moveButtons"
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
        className="moveButtons"
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
      <div className="game-info">
        {isChooseMode ? (
          <></>
        ) : (
          <div className="l-controls">
            <button
              className="moveButtons"
              onClick={() => {
                setIsChooseMode(true);
                setCurrentMove(0);
              }}
            >
              back
            </button>
          </div>
        )}

        <div className="r-controls">
          {currentMove === 0 || isChooseMode ? (
            <></>
          ) : currentMove > 1 ? (
            <>
              <div className="dropdown">
                <button className="moveButtons" onClick={toggleDropdown}>
                  jump to
                </button>
                {isOpen && <ul className="dropdown-menu">{pastmoves}</ul>}
              </div>
              <button
                className="moveButtons"
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
              className="moveButtons"
              onClick={() => {
                jumpTo(0);
                setIsOpen(false);
              }}
            >
              restart
            </button>
          )}
        </div>
      </div>
      <div className="game">
        {isChooseMode ? (
          <div className="modeButtonsContainer">
            <button
              className="modeButtons"
              onClick={() => {
                setis1V1(true);
                setIsChooseMode(false);
              }}
            >
              1 v 1
            </button>
            <button
              className="modeButtons"
              onClick={() => {
                setis1V1(false);
                setIsChooseMode(false);
              }}
            >
              1 v computer
            </button>
          </div>
        ) : (
          <div>
            <Board
              xIsNext={xIsNext}
              squares={currentSquares}
              onPlay={handlePlay}
              gameModeIs1V1={is1V1}
            />
          </div>
        )}
      </div>
    </>
  );
}
