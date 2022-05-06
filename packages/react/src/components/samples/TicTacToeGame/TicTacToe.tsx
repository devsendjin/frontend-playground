import cn from 'classnames';
import { useLocalStorageState } from '@/hooks/useLocalStorageState';
import { CrossIcon, CircleIcon } from './Icons';
import styles from './TicTacToe.module.scss';

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

const calculateStatus = (winner: Square | null, squares: Square[], nextValue: Square): (() => JSX.Element) => {
  if (winner) {
    const Icon = squareMap[winner];
    return () => (
      <div className="d-flex">
        Winner: <Icon className="ms-2" />
      </div>
    );
  }

  if (squares.every((v) => v === null)) {
    return () => <span>Begin the game.</span>;
  }

  if (squares.every((v) => v !== null)) {
    return () => <span>Standoff!</span>;
  }

  const Icon = squareMap[nextValue];
  return () => (
    <div className="d-flex">
      Next player <Icon className="ms-2" />
    </div>
  );
};

const Cell: RFC<{ onSelect: () => void; className?: string }> = ({ onSelect, className, children }) => {
  return (
    <div className={cn(styles['cell'], className)} onClick={onSelect}>
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

  return (
    <div className={styles['game']}>
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
        <div>
          Status: <br />
          {gameStatus()}
        </div>
      </div>
      <button className="btn btn-dark" onClick={restartGame}>
        restart game
      </button>
    </div>
  );
};

export { TicTacToe };
