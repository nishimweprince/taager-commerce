import { Star } from 'lucide-react';

interface ProductRatingProps {
  rating: number;
  count?: number;
  size?: number;
  showCount?: boolean;
  className?: string;
}

const ProductRating = ({
  rating,
  count,
  size = 16,
  showCount = true,
  className = '',
}: ProductRatingProps) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <figure className={`flex items-center gap-1 ${className}`}>
      <menu className="flex">
        {Array.from({ length: 5 }).map((_, index) => {
          const isFullStar = index < fullStars;
          const isHalfStar = index === fullStars && hasHalfStar;
          
          return (
            <li key={index} className="relative">
              <Star
                size={size}
                className={
                  isFullStar
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-muted'
                }
              />
              {isHalfStar && (
                <span className="absolute inset-0 overflow-hidden" style={{ width: '50%' }}>
                  <Star
                    size={size}
                    className="fill-yellow-400 text-yellow-400"
                  />
                </span>
              )}
            </li>
          );
        })}
      </menu>
      {showCount && count !== undefined && (
        <figcaption className="text-sm text-muted-foreground">
          ({count})
        </figcaption>
      )}
    </figure>
  );
};

export default ProductRating;
