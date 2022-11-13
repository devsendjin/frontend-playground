import React, { useContext } from "react";

type TDropdownContext = {};

const DropdownContext = React.createContext(null as unknown as TDropdownContext);

const DropdownProvider: RFC = ({ children }) => {
  return <DropdownContext.Provider value={{}}>{children}</DropdownContext.Provider>;
};
DropdownProvider.displayName = DropdownProvider.name;

const useDropdownContext = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error("No context found for Dropdown");
  }
  return context;
};

export { DropdownContext, DropdownProvider, useDropdownContext };
