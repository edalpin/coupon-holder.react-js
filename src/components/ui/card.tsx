import { JSX } from 'react';
import { cn } from '../../lib/utils';

type CardProps = {
  content: () => JSX.Element;
  onClick: () => void;
  footer?: () => JSX.Element;
  className?: string;
};

export const Card = (props: CardProps) => {
  const { content, footer, onClick, className } = props;
  return (
    <section
      className={cn(
        'flex flex-col justify-end aspect-square rounded-lg shadow-lg p-10 bg-white cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      <article className="flex h-full justify-center items-center">
        {content()}
      </article>
      {footer && (
        <footer className="flex text-black justify-center text-xl font-medium">
          {footer()}
        </footer>
      )}
    </section>
  );
};
