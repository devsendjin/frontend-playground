import { createContext, useContext } from "react";

type FlexGridContextProps = {
  colGap?: number;
  rowGap?: number;
  cols?: number;
};

const FlexGridContext = createContext(null as unknown as FlexGridContextProps);

const FlexGridProvider: RFC<{ value: FlexGridContextProps }> = ({ value, children }) => {
  return <FlexGridContext.Provider value={value}>{children}</FlexGridContext.Provider>;
};
FlexGridProvider.displayName = FlexGridProvider.name;

const useFlexGridContext = (): FlexGridContextProps => {
  const context = useContext(FlexGridContext);
  if (!context) {
    throw new Error("No context found for FlexGrid");
  }
  return context;
};

export { FlexGridContext, FlexGridProvider, useFlexGridContext };
export type { FlexGridContextProps };
