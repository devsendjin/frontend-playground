import React, { useContext } from 'react';

type TScaffoldContext = {};

const ScaffoldContext = React.createContext(null as unknown as TScaffoldContext);

const ScaffoldProvier: React.FC = ({ children }) => {
  return <ScaffoldContext.Provider value={{}}>{children}</ScaffoldContext.Provider>;
};

const useScaffoldContext = () => {
  const context = useContext(ScaffoldContext);
  if (!context) {
    throw new Error('No context found for Scaffold');
  }
  return context;
};

export { ScaffoldContext, ScaffoldProvier, useScaffoldContext };
