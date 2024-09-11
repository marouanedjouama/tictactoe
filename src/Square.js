export function Square({ squareIndex, value, onSquareClick, color }) {
  let squareStyle = { backgroundColor: color };

  switch (squareIndex) {
    case 0:
      squareStyle.borderTop = "none";
      squareStyle.borderLeft = "none";
      break;
    case 1:
      squareStyle.borderTop = "none";
      break;
    case 2:
      squareStyle.borderTop = "none";
      squareStyle.borderRight = "none";
      break;
    case 3:
      squareStyle.borderLeft = "none";
      break;
    case 5:
      squareStyle.borderRight = "none";
      break;
    case 6:
      squareStyle.borderLeft = "none";
      squareStyle.borderBottom = "none";
      break;
    case 7:
      squareStyle.borderBottom = "none";
      break;
    case 8:
      squareStyle.borderRight = "none";
      squareStyle.borderBottom = "none";
      break;
    default:
      break;
  }

  return (
    <button className="square" onClick={onSquareClick} style={squareStyle}>
      {value}
    </button>
  );
}
