import styles from './TicTacToe.module.scss';
import { useState } from 'react';
import { useLocalStorageState } from '@/hooks/useLocalStorageState';

type Square = 'X' | 'O' | null;

const calculateWinner = (squares: Square[]): Square => {
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
};

const calculateNextValue = (squares: Square[]): Square => {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O';
};

const calculateStatus = (winner: Square, squares: Square[], nextValue: Square): string => {
  if (winner) {
    return `Winner: ${winner}`;
  }

  if (squares.every((v) => v === null)) {
    return 'Begin the game.';
  }

  if (squares.every((v) => v !== null)) {
    return 'Standoff!';
  }

  return `Next player ${nextValue}`;
};

const Cell: RFC<{ onSelect: () => void }> = ({ onSelect, children }) => {
  return (
    <div className={styles['cell']} onClick={onSelect}>
      {children}
    </div>
  );
};

// const initialValue = (): Square[] => Array.from({ length: 9 }, (_, index) => index);
const initialValue = (): Square[] => Array(9).fill(null);

const TicTacToe: RFC = () => {
  const [squares, setSquares] = useLocalStorageState<Square[]>('squares', initialValue());

  const winner = calculateWinner(squares);
  const nextValue = calculateNextValue(squares);
  const gameStatus = calculateStatus(winner, squares, nextValue);

  const restartGame = () => {
    setSquares(initialValue());
  };

  const selectSquare = (squareIndex: number): void => {
    if (winner || squares[squareIndex]) {
      return;
    }

    const squaresCopy = [...squares];
    squaresCopy[squareIndex] = nextValue;
    setSquares(squaresCopy);
  };

  // console.log(squares);

  return (
    <div className={styles['game']}>
      <div className={styles['board-area']}>
        <div className={styles['board']}>
          {squares.map((v, index) => (
            <Cell
              key={index}
              onSelect={() => {
                console.log(index);
                selectSquare(index);
              }}
            >
              <span className={styles['value']}>{v}</span>
            </Cell>
          ))}
        </div>
        <div>
          Status: <br />
          {gameStatus}
        </div>
      </div>
      <button className="btn btn-dark" onClick={restartGame}>
        restart game
      </button>
    </div>
  );
};

export { TicTacToe };
