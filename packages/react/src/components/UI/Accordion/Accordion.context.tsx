import React, { Dispatch, useContext, useState } from 'react';

export type TSharedAccordionState = number | null;
type TAccordionContext = {
  activeIndex: TSharedAccordionState;
  setActiveIndex: Dispatch<React.SetStateAction<TSharedAccordionState>>;
};

const AccordionContext = React.createContext(null as unknown as TAccordionContext);

const AccordionProvier: React.FC<{ defaultActiveIndex?: TSharedAccordionState }> = ({
  defaultActiveIndex = 0,
  children,
}) => {
  const [activeIndex, setActiveIndex] = useState<TSharedAccordionState>(defaultActiveIndex);

  return <AccordionContext.Provider value={{ activeIndex, setActiveIndex }}>{children}</AccordionContext.Provider>;
};

const useAccordionContext = () => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error('No context found for Accordion');
  }
  return context;
};

export { AccordionContext, AccordionProvier, useAccordionContext };
