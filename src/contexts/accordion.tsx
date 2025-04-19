import { createContext, useContext } from 'react';

type AccordionContextType = {
  open: string | null;
  setOpen: (open: string | null) => void;
};

export const AccordionContext = createContext<AccordionContextType | undefined>(
  undefined
);

export const useAccordionContext = () => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error(
      'useAccordionContext must be used within an AccordionProvider'
    );
  }
  return context;
};
