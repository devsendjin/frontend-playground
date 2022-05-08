import cn from 'classnames';
import { useLocalStorageState } from '@/hooks/useLocalStorageState';
import { CrossIcon, CircleIcon } from './Icons';
import styles from './TicTacToe.module.scss';
import { useState } from 'react';

type Square = 'X' | 'O';

const squareMap: { [key in Square]: typeof CrossIcon } = {
  X: CrossIcon,
  O: CircleIcon,
};

const calculateWinner = (squares: Square[]): Square | null => {
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

const Cell: RFC<{ onSelect: () => void; className?: string }> = ({ onSelect, className, children }) => {
  return (
    <div className={cn(styles['cell'], className)} onClick={onSelect}>
      {children}
    </div>
  );
};

const GameStatus: RFC<{ winner: Square | null; squares: Square[]; nextValue: Square }> = ({
  winner,
  squares,
  nextValue,
}) => {
  if (winner) {
    const Icon = squareMap[winner];
    return (
      <span className="d-flex">
        Winner <Icon className="ms-2" />
      </span>
    );
  }

  if (squares.every((v) => v === null)) {
    return <span>Begin the game.</span>;
  }

  if (squares.every((v) => v !== null)) {
    return <span>Standoff!</span>;
  }

  const Icon = squareMap[nextValue];
  return (
    <span className="d-flex">
      Next player <Icon className="ms-2" />
    </span>
  );
};

const squaresInitial = (): Square[] => Array(9).fill(null);

const TicTacToe: RFC<{ className?: string }> = ({ className }) => {
  const [squares, setSquares] = useLocalStorageState<Square[]>('squares', () => squaresInitial());

  const winner = calculateWinner(squares);
  const nextValue = calculateNextValue(squares);

  const restartGame = () => {
    setSquares(squaresInitial());
  };

  const selectSquare = (squareIndex: number): void => {
    if (winner || squares[squareIndex]) {
      return;
    }

    const squaresCopy = [...squares];
    squaresCopy[squareIndex] = nextValue;
    setSquares(squaresCopy);
  };

  return (
    <div className={cn(styles['game'], className)}>
      <div className={styles['board-area']}>
        <div className={styles['board']}>
          {squares.map((squareChar, index) => {
            const Icon = squareChar ? squareMap[squareChar] : null;
            return (
              <Cell
                key={index}
                onSelect={() => {
                  selectSquare(index);
                }}
                className={cn(squareChar && styles['with-value'])}
              >
                {Icon && (
                  <span className={styles['value']}>
                    <Icon />
                  </span>
                )}
              </Cell>
            );
          })}
        </div>
      </div>
      <div>
        <div>
          <button className="d-block btn btn-light" onClick={restartGame}>
            restart game
          </button>
          <b className="d-block me-1">Status:</b>
          <GameStatus winner={winner} squares={squares} nextValue={nextValue} />
        </div>
      </div>
    </div>
  );
};

const TicTacToeWithHistory: RFC = () => {
  const [history, setHistory] = useLocalStorageState<Square[][]>('TicTacToeWithHistory:squares', () => [
    squaresInitial(),
  ]);
  const [currentStep, setCurrentStep] = useLocalStorageState<number>('TicTacToeWithHistory:step', 0);
  const currentSquares = history[currentStep];

  const winner = calculateWinner(currentSquares);
  const nextValue = calculateNextValue(currentSquares);

  const restartGame = () => {
    setHistory([squaresInitial()]);
    setCurrentStep(0);
  };

  const selectSquare = (squareIndex: number): void => {
    if (winner || currentSquares[squareIndex]) {
      return;
    }

    const newHistory = history.slice(0, currentStep + 1);
    const squaresCopy = [...currentSquares];
    squaresCopy[squareIndex] = nextValue;

    setHistory([...newHistory, squaresCopy]);
    setCurrentStep(newHistory.length);
  };

  const moves = history.map((_, step) => {
    const desc = step === 0 ? 'Go to game start' : `Go to move #${step}`;
    const isCurrentStep = step == currentStep;
    return (
      <li key={step} className={styles['list-group-item']}>
        <button
          disabled={isCurrentStep}
          className={cn(styles['button'], isCurrentStep && styles['disabled'])}
          onClick={() => setCurrentStep(step)}
        >
          <b>
            {step + 1}. {desc} {isCurrentStep ? '(current)' : null}
          </b>
        </button>
      </li>
    );
  });

  return (
    <div className={cn(styles['game'], styles['game-with-history'])}>
      <div className={styles['board']}>
        {currentSquares.map((squareChar, index) => {
          const Icon = squareChar ? squareMap[squareChar] : null;
          return (
            <Cell
              key={index}
              onSelect={() => {
                selectSquare(index);
              }}
              className={cn(squareChar && styles['with-value'])}
            >
              {Icon && (
                <span className={styles['value']}>
                  <Icon />
                </span>
              )}
            </Cell>
          );
        })}
      </div>
      <div className={styles['game-panel']}>
        <button className="btn btn-light" onClick={restartGame}>
          restart game
        </button>
        <div className={styles['game-info']}>
          <div className="d-flex mt-2">
            <b className="me-1">Status:</b>
            <GameStatus winner={winner} squares={currentSquares} nextValue={nextValue} />
          </div>
          <ul className={cn(styles['list-group'], 'mt-2')}>{moves}</ul>
        </div>
      </div>
    </div>
  );
};

const TicTacToeGame: RFC = () => {
  return (
    <div className="d-flex flex-wrap">
      <div>
        <p className="h5">Without history</p>
        <TicTacToe className="me-5" />
      </div>
      <div>
        <p className="h5">With history</p>
        <TicTacToeWithHistory />
      </div>
    </div>
  );
};

export { TicTacToeGame };
