import { CSSProperties, useState } from 'react';
import { ButtonGroup } from 'react-bootstrap';
import cn from 'classnames';
import { useTransition } from '@/hooks/useTransition';
import styles from './UseTransitionHook.module.scss';

interface UseTransitionHookProps {
  className?: string;
}

const defaultDelay = 1000;
const UseTransitionHook: RFC<UseTransitionHookProps> = ({ className }) => {
  const [delay, setDelay] = useState<number>(defaultDelay);
  const [unmountOnExit, setUnmountOnExit] = useState<boolean>(true);

  const {
    isPreEntered,
    isEntering,
    isEntered,
    isExiting,
    isExited,
    isUnmounted,
    isMounted,
    transitionState,
    transitionClassname,
    endTransition,
    toggleTransition,
  } = useTransition({
    timeout: delay,
    unmountOnExit,
    // initialEntered: true, // if need "mounted" as initial state
    customClassnames: {
      preEnter: 'custom-preEnter',
      entering: 'custom-entering',
      entered: 'custom-entered',
      exiting: 'custom-exiting',
      exited: 'custom-exited',
    },
    onChange: ({ state }) => {
      console.log('UseTransitionHook onChange state: ', state);
    },
  });

  return (
    <div className={cn(styles['use-transition-hook'], className)}>
      <ButtonGroup>
        <button className="btn btn-primary" onClick={() => toggleTransition()}>
          {isEntering ? 'Hide' : 'Show'}
        </button>
        <button className="btn btn-primary" onClick={() => endTransition()}>
          endTransition (immediately remove on "exiting")
        </button>

        <div className="d-flex align-items-center">
          <div className="form-check ms-3" style={{ whiteSpace: 'nowrap' }}>
            <label className="form-check-label">
              <input
                className="form-check-input"
                type="checkbox"
                checked={unmountOnExit}
                onChange={(e) => {
                  setUnmountOnExit(e.target.checked);
                }}
              />
              unmountOnExit
            </label>
          </div>
          <input
            type="number"
            className="form-control ms-3"
            value={delay}
            onChange={(e) => {
              const value = parseInt(e.target.value, 10);
              if (value) {
                setDelay(value);
                return;
              }
              setDelay(defaultDelay);
            }}
          />
        </div>
      </ButtonGroup>
      <pre>
        {JSON.stringify(
          {
            isPreEntered,
            isEntering,
            isEntered,
            isExiting,
            isExited,
            isUnmounted,
            isMounted,
            transitionState,
          },
          null,
          2
        )}
      </pre>
      {isMounted && (
        <div
          className={cn(styles['transition-example'], styles[transitionState], transitionClassname)}
          style={{ '--transition-duration': `${delay / 1000}s` } as CSSProperties}
        >
          React transition. transitionState: <ins>{transitionState}</ins>. <br />
          Custom transition classname: <ins>{transitionClassname}</ins>.
        </div>
      )}
    </div>
  );
};

UseTransitionHook.displayName = UseTransitionHook.name;

export { UseTransitionHook };
