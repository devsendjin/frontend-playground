import cn from 'classnames';
import {useTransition} from "@/hooks/useTransition";
import styles from './UseTransitionHook.module.scss';

interface IUseTransitionHookProps {
  className?: string;
}

const UseTransitionHook: RFC<IUseTransitionHookProps> = ({className}) => {
  const { isElementVisible,transitionState, toggleTransition } = useTransition({
    timeout: 500,
  })

  return (
    <div className={cn(styles['use-transition-hook'], className)}>
      <h2>transitionState: {transitionState}</h2>
      <div>
        <button className="btn btn-primary" onClick={() => toggleTransition()}>
          {transitionState === "entering" || transitionState === "entered" ? "Hide" : "Show"}
        </button>
      </div>
      {isElementVisible && (
        <div className={cn(styles['basic-transition'], transitionState)}>
          React transition state
        </div>
      )}
    </div>
  );
};

export {UseTransitionHook};
