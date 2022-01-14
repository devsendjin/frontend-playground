import { Dispatch, SetStateAction, useState } from 'react';

interface IRenderProps<State> {
  defaultState?: State;
  state: [State, Dispatch<SetStateAction<State>>];
}

type TRender<State> = ({ state, defaultState }: IRenderProps<State>) => JSX.Element;

interface IDynamicStateControllerProps<State> {
  defaultState: State;
  render: TRender<State>;
}

const DynamicStateController = <State extends unknown>({
  defaultState,
  render,
}: IDynamicStateControllerProps<State>): ReturnType<TRender<State>> => {
  const state = useState<State>(defaultState);

  return render({ state, defaultState });
};

export { DynamicStateController };
