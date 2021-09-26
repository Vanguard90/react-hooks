// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import React, {useEffect} from 'react';
import {useLocalStorageState} from '../utils';

function Board({squares, setSquares, squaresHistory, setSquaresHistory}) {
  // Save all history as array of squares
  // You can go back to the index of it by clicking a button

  const nextValue = calculateNextValue(squares);
  const winner = calculateWinner(squares);
  const status = calculateStatus(winner, squares, nextValue);
  // Can put it on within render as well but it's clearner to keep it here, next
  // to its cntextual siblings

  useEffect(() => {
    window.localStorage.setItem('squares', JSON.stringify(squares));
  }, [squares]);

  // This is the function your square click handler will call. `square` should
  // be an index. So if they click the center square, this will be `4`.
  function selectSquare(square) {
    if (winner || squares[square]) {
      return null;
    }

    const newSquares = [...squares];
    newSquares[square] = nextValue;
    const newSquaresHistory = [...squaresHistory, newSquares];
    window.localStorage.setItem(
      'squaresHistory',
      JSON.stringify(newSquaresHistory),
    );
    setSquaresHistory(newSquaresHistory);
    // Put these new squares item to a new localstorage key
    return setSquares(newSquares);
  }

  function restart() {
    setSquares(Array(9).fill(null));
    setSquaresHistory([Array(9).fill(null)]);
    window.localStorage.setItem(
      'squaresHistory',
      JSON.stringify([Array(9).fill(null)]),
    );
  }

  function renderSquare(i) {
    return (
      <button className="square" onClick={() => selectSquare(i)}>
        {squares[i]}
      </button>
    );
  }

  return (
    <div>
      <div>
        {console.log('rendered!')}
        {/* With everything on useState and triggered by useEffect, rendered twice at each click */}
        {/* With the derived state solution, rendered twice at first click, then rendered once at subsequent clicks */}
      </div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <button className="restart" onClick={restart}>
        restart
      </button>
    </div>
  );
}

function Game() {
  const [squares, setSquares] = useLocalStorageState(
    'squares',
    Array(9).fill(null),
  );

  const [squaresHistory, setSquaresHistory] = useLocalStorageState(
    'squaresHistory',
    [Array(9).fill(null)],
  );

  const steps = calculateSteps(squaresHistory, setSquares);
  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={squares}
          setSquares={setSquares}
          squaresHistory={squaresHistory}
          setSquaresHistory={setSquaresHistory}
        />
      </div>
      <div className="game-info">
        <div>test</div>
        <ol>{steps}</ol>
      </div>
    </div>
  );
}

// function intializeSquares() {
//   const stored = window.localStorage.getItem('squares');
//   if (stored) {
//     return () => JSON.parse(stored);
//   }

//   return () => Array(9).fill(null);
// }

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`;
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O';
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
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
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function calculateSteps(squaresHistory, setSquares) {
  return squaresHistory.map((singleHistory, index) => {
    let message;
    if (index === 0) {
      message = 'Go to game start';
    } else {
      message = `Go to move #${index + 1}`;
    }

    if (index === squaresHistory.length - 1) {
      message = message + ' (Current)';
    }

    return (
      <li
        key={index}
        onClick={() => {
          setSquares(singleHistory);
        }}
      >
        <button>{message}</button>
      </li>
    );
  });
}

function App() {
  return <Game />;
}

export default App;
