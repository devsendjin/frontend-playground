import { Dispatch, MutableRefObject, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';

enum TransitionStates {
  'PRE_ENTER' = 0,
  'ENTERING' = 1,
  'ENTERED' = 2,
  'PRE_EXIT' = 3,
  'EXITING' = 4,
  'EXITED' = 5,
  'UNMOUNTED' = 6,
}
export type State = 'preEnter' | 'entering' | 'entered' | 'preExit' | 'exiting' | 'exited' | 'unmounted';
type TimeoutId = ReturnType<typeof window.setTimeout>;
type TimeoutIdMutable = MutableRefObject<TimeoutId | undefined>;
interface UseTransitionImperativeParams {
  enter?: boolean;
  exit?: boolean;
  preEnter?: boolean;
  preExit?: boolean;
  timeout?: number | { enter?: number; exit?: number };
  initialEntered?: boolean;
  mountOnEnter?: boolean;
  unmountOnExit?: boolean;
  onChange?: (params: { state: State }) => void;
}
interface UseTransitionImperativeReturn {
  transitionState: State;
  toggleTransition: (toEnter?: boolean) => void;
  endTransition: () => void;
}

const STATES: ReadonlyArray<State> = ['preEnter', 'entering', 'entered', 'preExit', 'exiting', 'exited', 'unmounted'];

const startOrEnd = (unmounted: boolean): TransitionStates => {
  return unmounted ? TransitionStates.UNMOUNTED : TransitionStates.EXITED;
};

const updateState = (
  state: TransitionStates,
  setState: Dispatch<SetStateAction<TransitionStates>>,
  latestState: MutableRefObject<TransitionStates>,
  timeoutId: TimeoutIdMutable,
  onChange: UseTransitionImperativeParams['onChange']
) => {
  clearTimeout(timeoutId.current as TimeoutId);
  setState(state);
  latestState.current = state;
  onChange && onChange({ state: STATES[state] });
};

/**
 *
 * @param {boolean} [enter=true] - Enable or disable enter phase transitions
 * @param {boolean} [exit=true] - Enable or disable exit phase transitions
 * @param {boolean} [preEnter=unmountOnExit] - Add a 'preEnter' state immediately before 'entering', which is necessary to change DOM elements from unmounted or display: none with CSS transition (not necessary for CSS animation).
 * @param {boolean} [preExit=true] - Add a 'preExit' state immediately before 'exiting'
 * @param {number | { [enter]: number, [exit]: number }} [timeout=500] - Set timeout in ms for transitions; you can set a single value or different values for enter and exit transitions.
 * @param {boolean} [initialEntered=false] - Beginning from 'entered' state
 * @param {boolean} [mountOnEnter=true] - State will be 'unmounted' until hit enter phase for the first time. It allows you to create lazily mounted component.
 * @param {boolean} [unmountOnExit=true] - State will become 'unmounted' after 'exiting' finishes. It allows you to transition component out of DOM.
 * @param {function} onChange - Event fired when state has changed. Prefer to read state from the hook function return value
 * directly unless you want to perform some side effects in response to state changes. Note: create an event handler with
 * useCallback if you need to keep toggle or endTransition function's identity stable across re-renders.
 * @return {
 *   {
 *     transitionState: State,
 *     toggleTransition: (toEnter?: boolean) => void,
 *     endTransition: () => void,
 *   }
 * }
 */
const useTransitionImperative = ({
  mountOnEnter = true,
  unmountOnExit = true,
  enter = true,
  exit = true,
  preEnter = unmountOnExit,
  preExit = false,
  initialEntered = false,
  timeout = 500,
  onChange,
}: UseTransitionImperativeParams = {}): UseTransitionImperativeReturn => {
  const [state, setState] = useState<TransitionStates>(
    initialEntered ? TransitionStates.ENTERED : startOrEnd(mountOnEnter)
  );
  const latestState = useRef<TransitionStates>(state);
  const timeoutId = useRef<TimeoutId>();
  const transitionState = STATES[state];

  let enterTimeout: number | undefined, exitTimeout: number | undefined;
  if (typeof timeout === 'object') {
    enterTimeout = timeout.enter;
    exitTimeout = timeout.exit;
  } else {
    enterTimeout = exitTimeout = timeout;
  }

  const endTransition = useCallback(() => {
    let newState: TransitionStates | undefined;
    switch (latestState.current) {
      case TransitionStates.ENTERING:
      case TransitionStates.PRE_ENTER:
        newState = TransitionStates.ENTERED;
        break;

      case TransitionStates.EXITING:
      case TransitionStates.PRE_EXIT:
        newState = startOrEnd(unmountOnExit);
        break;
    }

    if (newState !== undefined) {
      updateState(newState, setState, latestState, timeoutId, onChange);
    }
  }, [onChange, unmountOnExit]);

  const toggleTransition = useCallback(
    (toEnter?: boolean) => {
      const transitState = (newState: TransitionStates) => {
        updateState(newState, setState, latestState, timeoutId, onChange);

        switch (newState) {
          case TransitionStates.ENTERING:
            if (enterTimeout && enterTimeout >= 0) timeoutId.current = setTimeout(endTransition, enterTimeout);
            break;

          case TransitionStates.EXITING:
            if (exitTimeout && exitTimeout >= 0) timeoutId.current = setTimeout(endTransition, exitTimeout);
            break;

          case TransitionStates.PRE_ENTER:
          case TransitionStates.PRE_EXIT:
            timeoutId.current = setTimeout(() => transitState(newState + 1), 0);
            break;
        }
      };

      const enterStage = latestState.current <= TransitionStates.ENTERED;
      // if (typeof toEnter !== 'boolean') toEnter = !enterStage;

      if (toEnter ?? !enterStage) {
        if (!enterStage) {
          transitState(
            enter ? (preEnter ? TransitionStates.PRE_ENTER : TransitionStates.ENTERING) : TransitionStates.ENTERED
          );
        }
      } else {
        if (enterStage) {
          transitState(
            exit ? (preExit ? TransitionStates.PRE_EXIT : TransitionStates.EXITING) : startOrEnd(unmountOnExit)
          );
        }
      }
    },
    [endTransition, onChange, enter, exit, preEnter, preExit, enterTimeout, exitTimeout, unmountOnExit]
  );

  useEffect(() => () => clearTimeout(timeoutId.current as TimeoutId), []);

  return {
    transitionState,
    toggleTransition,
    endTransition,
  };
};

interface UseTransitionReturn extends UseTransitionImperativeReturn {
  isPreEntered: boolean;
  isEntering: boolean;
  isEntered: boolean;
  isExiting: boolean;
  isExited: boolean;
  isUnmounted: boolean;
  isMounted: boolean;
  transitionClassname: string;
}
type MappedTransitionStateToClassnameKey = State;
type MappedTransitionStateToClassname = {
  [key in MappedTransitionStateToClassnameKey]?: string;
};
interface UseTransitionParams extends UseTransitionImperativeParams {
  customClassnames?: MappedTransitionStateToClassname;
}

const transitionClassNames = STATES.reduce<MappedTransitionStateToClassname>((acc, state) => {
  acc[state] = state;
  return acc;
}, {});

const useTransition = ({ customClassnames, ...restParams }: UseTransitionParams): UseTransitionReturn => {
  const { transitionState, ...restTransitionValues } = useTransitionImperative(restParams);
  const transitionClassnames = useRef<MappedTransitionStateToClassname>(transitionClassNames);

  useEffect(() => {
    if (customClassnames) {
      transitionClassnames.current = {
        ...transitionClassnames.current,
        ...customClassnames,
      };
    }
  }, []);

  return {
    isPreEntered: transitionState === STATES[TransitionStates.PRE_ENTER],
    isEntering: transitionState === STATES[TransitionStates.ENTERING],
    isEntered: transitionState === STATES[TransitionStates.ENTERED],
    isExiting: transitionState === STATES[TransitionStates.EXITING],
    isExited: transitionState === STATES[TransitionStates.EXITED],
    isUnmounted: transitionState === STATES[TransitionStates.UNMOUNTED],
    isMounted: transitionState !== STATES[TransitionStates.UNMOUNTED],
    transitionState,
    transitionClassname: transitionClassnames.current[transitionState] ?? '',
    ...restTransitionValues,
  };
};

export { useTransitionImperative, useTransition };
