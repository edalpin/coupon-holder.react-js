import { cn } from '@/lib/utils';

type ButtonProps = {
  variant: ButtonVariants;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
  type?: ButtonTypes;
  onClick?: () => void;
};

type ButtonVariants = 'primary' | 'secondary';
type ButtonTypes = 'button' | 'submit' | 'reset';

export const Button = (props: ButtonProps) => {
  const {
    onClick,
    disabled = false,
    variant,
    className,
    children,
    type = 'button',
  } = props;

  const variantStyles = {
    primary: 'bg-primary text-black',
    secondary: 'bg-secondary text-black',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'flex justify-center items-center',
        'border-2 p-2 rounded-full gap-2',
        'cursor-pointer border-black font-bold',
        variantStyles[variant],
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      {children}
    </button>
  );
};
