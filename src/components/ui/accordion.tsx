import { AccordionContext } from '@/contexts/accordion';
import React, { useState, useMemo } from 'react';

type AccordionProps = {
  children: React.ReactNode;
};

export const Accordion = (props: AccordionProps) => {
  const { children } = props;
  const [open, setOpen] = useState<string | null>(null);

  const value = useMemo(() => ({ open, setOpen }), [open]);

  return (
    <AccordionContext.Provider value={value}>
      <main className="flex flex-col gap-5">{children}</main>
    </AccordionContext.Provider>
  );
};
