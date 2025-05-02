import { Input as UIInput } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import {
  ChangeEvent,
  FocusEvent,
  InputHTMLAttributes,
  KeyboardEvent,
} from 'react';
import { InputErrorMessage } from './ErrorLabels';
import { FieldErrorsImpl, FieldValues } from 'react-hook-form';
import { Merge } from 'react-hook-form';
import { FieldError } from 'react-hook-form';
import { SkeletonLoader } from './Loader';
import CustomTooltip from '../common/CustomTooltip';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  className?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'search' | 'file';
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  onKeyUp?: (e: KeyboardEvent<HTMLInputElement>) => void;
  label?: string;
  errorMessage?:
    | string
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<FieldValues>>
    | undefined;
  required?: boolean;
  isLoading?: boolean;
  accept?: string;
}

const Input = ({
  className,
  value,
  onChange,
  onBlur,
  onFocus,
  onKeyDown,
  onKeyUp,
  label,
  errorMessage,
  required,
  isLoading,
  accept = 'image/*',
  ...props
}: InputProps) => {
  return (
    <label className="flex flex-col gap-[6px] item-start w-full">
      <p
        className={`text-sm flex items-center gap-1 ${!label && 'hidden'}`}
      >
        {label}{' '}
        {required && (
          <CustomTooltip
            label={required ? `${label} is required` : ''}
            labelClassName="text-[12px] bg-red-600"
          >
            <span className="text-red-600 cursor-pointer">*</span>
          </CustomTooltip>
        )}
      </p>
      {isLoading ? (
        <SkeletonLoader className="w-full h-[40px]" />
      ) : (
        <>
          <UIInput
            {...props}
            className={cn(className)}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            onFocus={onFocus}
            onKeyDown={onKeyDown}
            onKeyUp={onKeyUp}
            accept={accept}
          />
          {errorMessage && <InputErrorMessage message={errorMessage} />}
        </>
      )}
    </label>
  );
};

export default Input;
