import { Dispatch, SetStateAction, useState } from "react";

type RenderProps<State> = {
  defaultState?: State;
  state: [State, Dispatch<SetStateAction<State>>];
};

type TRender<State> = ({ state, defaultState }: RenderProps<State>) => JSX.Element;

type DynamicStateControllerProps<State> = {
  defaultState: State;
  render: TRender<State>;
};

const DynamicStateController = <State extends unknown>({
  defaultState,
  render,
}: DynamicStateControllerProps<State>): ReturnType<TRender<State>> => {
  const state = useState<State>(defaultState);

  return render({ state, defaultState });
};

export { DynamicStateController };
