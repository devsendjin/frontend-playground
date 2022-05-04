import { CSSProperties, useState } from 'react';
import {ButtonGroup, FormControl, FormGroup} from 'react-bootstrap';
import cn from 'classnames';
import { useTransition } from '@/hooks/useTransition';
import styles from './UseTransitionHook.module.scss';

interface IUseTransitionHookProps {
  className?: string;
}

const defaultDelay = 1000;
const UseTransitionHook: RFC<IUseTransitionHookProps> = ({ className }) => {
  const [delay, setDelay] = useState<number>(defaultDelay);

  const {
    isEnteringProcess,
    isExitingProcess,
    isElementVisible,
    transitionClassname,
    transitionState,
    endTransition,
    toggleTransition,
  } = useTransition({
    timeout: delay,
    onChange: ({ state }) => {
      console.log('UseTransitionHook state: ', state);
    },
  });

  return (
    <div className={cn(styles['use-transition-hook'], className)}>
      <ButtonGroup>
        <button className="btn btn-primary" onClick={() => toggleTransition()}>
          {isEnteringProcess ? 'Hide' : 'Show'}
        </button>
        <button className="btn btn-primary" onClick={() => endTransition()}>
          endTransition (immediately remove on "exiting")
        </button>
        <FormGroup>
          <FormControl
            type="number"
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
        </FormGroup>
      </ButtonGroup>
      <pre>
        {JSON.stringify(
          { isEnteringProcess, isExitingProcess, isElementVisible, transitionClassname, transitionState },
          null,
          2
        )}
      </pre>
      {isElementVisible && (
        <div
          className={cn(styles['transition-example'], styles[transitionState])}
          style={{ '--transition-duration': `${delay / 1000}s` } as CSSProperties}
        >
          React transition. transitionState: {transitionState}. <br />
          Custom transition classname: {transitionClassname}.
        </div>
      )}
    </div>
  );
};

UseTransitionHook.displayName = UseTransitionHook.name;

export { UseTransitionHook };
