import { SelectHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { BaseInputProps } from '@/types/ui-components';

type SelectInputProps = BaseInputProps &
  Omit<SelectHTMLAttributes<HTMLSelectElement>, 'className'> & {
    options: Array<{ value: string; label: string }>;
    multiple?: boolean;
  };

export const FormSelect = ({
  label,
  error,
  options,
  multiple,
  className,
  value,
  ...props
}: SelectInputProps) => {
  return (
    <div className="space-y-2">
      <label
        htmlFor={props.id}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <select
        multiple={multiple}
        value={value}
        {...props}
        className={cn(
          'w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500',
          error ? 'border-red-500' : 'border-gray-300',
          multiple ? 'min-h-[120px]' : '',
          className
        )}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {multiple && (
        <p className="text-xs text-gray-500 mt-1">
          Hold Ctrl (Windows) or Command (Mac) to select multiple options
        </p>
      )}
    </div>
  );
};
