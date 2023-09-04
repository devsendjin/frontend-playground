import { createContext, useContext } from 'react';

type ScaffoldContextType = {};

const ScaffoldContext = createContext(null as unknown as ScaffoldContextType);
ScaffoldContext.displayName = 'ScaffoldContext';

const ScaffoldProvider: RFC<{ value: ScaffoldContextType }> = ({ value, children }) => {
  return <ScaffoldContext.Provider value={value}>{children}</ScaffoldContext.Provider>;
};
ScaffoldProvider.displayName = ScaffoldProvider.name;

const useScaffoldContext = (): ScaffoldContextType => {
  const context = useContext(ScaffoldContext);
  if (!context) {
    throw new Error('No context found for Scaffold');
  }
  return context;
};

export { ScaffoldContext, ScaffoldProvider, useScaffoldContext };
