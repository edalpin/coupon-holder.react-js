import { ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
  onClick: () => void;
};

export const Button = (props: ButtonProps) => {
  const { children, onClick } = props;

  return (
    <button
      onClick={onClick}
      className="cursor-pointer relative inline-flex items-center justify-center p-2 gap-2  overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-white hover:bg-gray-200"
    >
      {children}
    </button>
  );
};
