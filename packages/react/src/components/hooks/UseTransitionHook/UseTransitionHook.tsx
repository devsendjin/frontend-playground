import { CSSProperties, useState } from 'react';
import cn from 'classnames';
import { Button, ButtonGroup, Form } from '@/vendors/bootstrap';
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
        <Button className="btn btn-light" onClick={() => toggleTransition()} variant="light">
          {isEntering ? 'Hide' : 'Show'}
        </Button>
        <Button className="btn btn-light" onClick={() => endTransition()} variant="light">
          endTransition (immediately remove on "exiting")
        </Button>

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
          <Form.Control
            type="number"
            placeholder="Enter text"
            className="ms-3"
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
