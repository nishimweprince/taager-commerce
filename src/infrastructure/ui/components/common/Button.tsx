import { MouseEventHandler, ReactNode } from 'react';
import { Link, To } from 'react-router-dom';

interface ButtonProps {
  children: ReactNode;
  className?: string;
  to?: To;
  type?: 'button' | 'submit' | 'reset';
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

const Button = ({ children, className, to, type, onClick }: ButtonProps) => {
  if (type && ['submit', 'reset'].includes(type)) {
    return (
      <button type={type} className={`${className}`}>
        {children}
      </button>
    );
  }

  return (
    <Link
      to={to || ''}
      onClick={onClick}
      className={`inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 transition-colors duration-200 ${className}`}
    >
      {children}
    </Link>
  );
};

export default Button;
