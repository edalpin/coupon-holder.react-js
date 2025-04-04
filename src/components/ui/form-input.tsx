import { InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { BaseInputProps } from '@/types/ui-components';

type TextInputProps = BaseInputProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> & {
    type?: 'text' | 'email' | 'password' | 'url' | 'datetime-local';
  };

export const FormInput = ({
  label,
  error,
  className,
  value,
  onChange,
  ...props
}: TextInputProps) => {
  return (
    <div className="space-y-2">
      <label
        htmlFor={props.id}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <input
        value={value}
        onChange={onChange}
        {...props}
        className={cn(
          'w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500',
          error ? 'border-red-500' : 'border-gray-300',
          className
        )}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};
