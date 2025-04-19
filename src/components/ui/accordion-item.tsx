import React, { useMemo } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useAccordionContext } from '@/contexts/accordion';
import { cn } from '@/lib/utils';

type AccordionItemProps = {
  id: string;
  title: string;
  disabled: boolean;
  renderContent: () => React.ReactNode;
};

export const AccordionItem = (props: AccordionItemProps) => {
  const { id, title, disabled, renderContent } = props;
  const { open, setOpen } = useAccordionContext();
  const isOpen = useMemo(() => open === id, [open, id]);

  const handleToggle = () => {
    if (!disabled) {
      setOpen(isOpen ? null : id);
    }
  };

  return (
    <article className="w-full shadow-md">
      <header
        className={cn(
          'flex justify-between items-center p-2 border-2',
          'bg-secondary border-black font-bold',
          isOpen ? 'rounded-t-lg' : 'rounded-lg',
          disabled && 'opacity-40'
        )}
      >
        <span className="truncate">{title}</span>
        <button
          onClick={handleToggle}
          aria-expanded={isOpen}
          aria-controls={`accordion-content-${id}`}
          aria-disabled={disabled}
          className={cn('cursor-pointer', disabled && 'cursor-not-allowed')}
        >
          {isOpen ? <ChevronUp /> : <ChevronDown />}
        </button>
      </header>
      <section
        id={`accordion-content-${id}`}
        className={cn(
          'border-black bg-surface',
          isOpen && 'rounded-b-lg border-l-2 border-r-2 border-b-2 p-2',
          'overflow-hidden transition-[max-height] duration-300 ease-in-out',
          isOpen ? 'max-h-screen' : 'max-h-0'
        )}
      >
        {isOpen && renderContent()}
      </section>
    </article>
  );
};
