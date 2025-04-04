import type { ReactElement } from 'react';
import { cn } from '../../lib/utils';

type CardProps = {
  content: () => ReactElement;
  onClick: () => void;
  footer?: () => ReactElement;
  className?: string;
  title?: string;
  description?: string;
};

export const Card = (props: CardProps) => {
  const { content, footer, onClick, className, title, description } = props;

  return (
    <article
      className={cn(
        'flex flex-col justify-end rounded-lg shadow-lg p-10 bg-white',
        'hover:shadow-xl transition-shadow duration-200',
        'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
        className
      )}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={title}
      aria-describedby={description ? `card-description-${title}` : undefined}
    >
      <div className="flex h-full justify-center items-center">{content()}</div>
      {title && <h2 className="sr-only">{title}</h2>}
      {description && (
        <p id={`card-description-${title}`} className="sr-only">
          {description}
        </p>
      )}
      {footer && (
        <footer className="flex text-black justify-center font-medium mt-auto">
          {footer()}
        </footer>
      )}
    </article>
  );
};
