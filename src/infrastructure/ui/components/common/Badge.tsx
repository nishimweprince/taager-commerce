import { Badge as UIBadge } from '@/components/ui/badge';
import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  className?: string;
}

const Badge = ({ children, className, ...props }: BadgeProps) => {
  return <UIBadge className={className} {...props}>{children}</UIBadge>;
};

export default Badge;
