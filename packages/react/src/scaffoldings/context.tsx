import { createContext, useContext } from 'react';

type TScaffoldContext = {};

const ScaffoldContext = createContext(null as unknown as TScaffoldContext);

const ScaffoldProvider: RFC = ({ children }) => {
  return <ScaffoldContext.Provider value={{}}>{children}</ScaffoldContext.Provider>;
};
ScaffoldProvider.displayName = ScaffoldProvider.name;

const useScaffoldContext = (): TScaffoldContext => {
  const context = useContext(ScaffoldContext);
  if (!context) {
    throw new Error('No context found for Scaffold');
  }
  return context;
};

export { ScaffoldContext, ScaffoldProvider, useScaffoldContext };
