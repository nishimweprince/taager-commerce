import { MouseEventHandler, ReactNode } from 'react';
import { Link, To } from 'react-router-dom';
import Loader from './Loader';

interface ButtonProps {
  children: ReactNode;
  className?: string;
  to?: To;
  type?: 'button' | 'submit' | 'reset';
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  isLoading?: boolean;
  primary?: boolean;
  danger?: boolean;
}

const Button = ({
  children,
  className,
  to,
  type,
  onClick,
  isLoading,
  primary,
  danger,
}: ButtonProps) => {
  if (type && ['submit', 'reset'].includes(type)) {
    return (
      <button
        type={type}
        className={`${
          primary
            ? '!bg-primary text-white'
            : danger
            ? '!bg-red-700 text-white'
            : 'bg-white text-primary'
        } inline-flex items-center justify-center cursor-pointer px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 transition-colors duration-200 ${className}`}
      >
        {isLoading ? <Loader className="text-white" /> : children}
      </button>
    );
  }

  return (
    <Link
      to={to || ''}
      onClick={onClick}
      className={`${
        primary
          ? '!bg-primary text-white'
          : danger
          ? '!bg-red-700 text-white'
          : 'bg-white text-primary'
      } inline-flex items-center justify-center cursor-pointer px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 transition-colors duration-200 ${className}`}
    >
      {isLoading ? <Loader className="text-white" /> : children}
    </Link>
  );
};

export default Button;
