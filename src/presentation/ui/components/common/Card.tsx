import { Card as UICard } from '@/components/ui/card';
import { ReactNode } from 'react';

interface CardProps extends React.ComponentProps<'div'> {
  children: ReactNode;
} 

const Card = ({ children, ...props }: CardProps) => {
  return <UICard {...props}>{children}</UICard>;
};

export default Card;

