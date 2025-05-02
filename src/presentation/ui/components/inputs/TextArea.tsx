import {
    FC,
    ChangeEvent,
    useEffect,
    useRef,
  } from 'react';
import { SkeletonLoader } from './Loader';
import CustomTooltip from '../common/CustomTooltip';
import { FieldValues } from 'react-hook-form';
import { FieldErrorsImpl } from 'react-hook-form';
import { Merge } from 'react-hook-form';
import { FieldError } from 'react-hook-form';
import { InputErrorMessage } from './ErrorLabels';
  
  interface TextAreaProps {
    cols?: number;
    rows?: number;
    className?: string;
    defaultValue?: string | number | readonly string[] | undefined;
    resize?: boolean;
    onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder?: string | undefined;
    required?: boolean;
    readonly?: boolean;
    onBlur?: () => void | undefined;
    label?: string;
    value?: string | number | readonly string[] | undefined;
    isLoading?: boolean;
    errorMessage?: string | FieldError | Merge<FieldError, FieldErrorsImpl<FieldValues>> | undefined;
  }
  
  const TextArea: FC<TextAreaProps> = ({
    cols = 50,
    rows = 5,
    className = '',
    defaultValue = undefined,
    resize = false,
    onChange,
    placeholder = undefined,
    required = false,
    readonly = false,
    onBlur,
    label = null,
    value,
    isLoading,
    errorMessage,
  }) => {
    const ref = useRef<HTMLTextAreaElement>(null);
  
    useEffect(() => {
      if (!defaultValue && !value && ref?.current) {
        ref.current.value = '';
      }
    }, [defaultValue, value]);
  
    return (
      <label className="flex flex-col gap-[6px] item-start w-full">
        <p
          className={`text-[15px] flex items-center gap-1 ${!label && 'hidden'}`}
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
          <textarea
            cols={cols}
            rows={rows}
            ref={ref}
            value={value}
            readOnly={readonly}
            placeholder={placeholder}
          className={`border-[1.5px] border-opacity-50 text-[15px] placeholder:text-[13px] border-secondary flex items-center justify-center px-4 py-[8px] w-full focus:border-[1.3px] focus:outline-none focus:border-primary rounded-md ${
            resize ? null : 'resize-none'
          } ${className}`}
          onChange={onChange}
          onBlur={onBlur}
            defaultValue={defaultValue}
          ></textarea>
          {errorMessage && <InputErrorMessage message={errorMessage} />}
          </>
        )}
      </label>
    );
  };
  
  export default TextArea;
  