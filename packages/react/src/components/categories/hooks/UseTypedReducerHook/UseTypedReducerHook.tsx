import { Reducer, useReducer, useState } from "react";
import cn from "classnames";
import { SampleTitle } from "@UI/playground/Title";
import { Button, Form } from "@/vendors/bootstrap";
import styles from "./UseTypedReducerHook.module.scss";

type State = {
  count: number;
};

type IncDecAction = {
  type: "INCREMENT" | "DECREMENT";
  payload: { step: number };
};

type ResetAction = {
  type: "RESET";
  payload: { count: number };
};

type Action = IncDecAction | ResetAction;

const countReducer = (state: State, action: Action): State => {
  const { type, payload } = action;
  switch (type) {
    case "INCREMENT":
      return {
        ...state,
        count: state.count + payload.step,
      };
    case "DECREMENT":
      return {
        ...state,
        count: state.count - payload.step,
      };
    case "RESET":
      return {
        ...state,
        count: payload.count,
      };
    default:
      return state;
  }
};

const Counter: RFC<{ initialCount?: number; step?: number }> = ({ initialCount = 0, step = 1 }) => {
  const [state, dispatch] = useReducer<Reducer<State, Action>>(countReducer, { count: initialCount });

  const increment = () => dispatch({ type: "INCREMENT", payload: { step } });
  const decrement = () => dispatch({ type: "DECREMENT", payload: { step } });
  const reset = () => dispatch({ type: "RESET", payload: { count: 0 } });

  return (
    <div className='btn-group'>
      <Button onClick={decrement} variant='light'>
        -
      </Button>
      <Button variant='light'>{state.count}</Button>
      <Button onClick={increment} variant='light'>
        +
      </Button>
      <Button onClick={reset} variant='light'>
        reset
      </Button>
    </div>
  );
};

type UseTypedReducerHookProps = {
  className?: string;
};

const UseTypedReducerHook: RFC<UseTypedReducerHookProps> = ({ className }) => {
  const [step, setStep] = useState<number>(1);
  return (
    <div className={cn(styles["use-reducer-hook"], className)}>
      <SampleTitle>Counter with useReducer</SampleTitle>
      <Form.Control
        type='number'
        placeholder='Enter text'
        className='mb-2'
        style={{ width: "auto" }}
        value={step}
        onChange={(e) => {
          const value = parseInt(e.target.value, 10);
          if (value) {
            setStep(value);
          }
        }}
      />
      <Counter step={step} />
    </div>
  );
};
UseTypedReducerHook.displayName = UseTypedReducerHook.name;

export { UseTypedReducerHook };
