import { Star } from 'lucide-react';

interface ProductReviewProps {
  review: {
    name: string;
    rating: number;
    date: string;
    comment: string;
  };
}

const ProductReview = ({ review }: ProductReviewProps) => {
  return (
    <li className="border-b pb-6">
      <article>
        <header className="flex justify-between mb-2">
          <h3 className="font-medium">{review.name}</h3>
          <time className="text-sm text-muted-foreground">{review.date}</time>
        </header>
        <section className="flex items-center gap-1 mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={16}
              className={
                i < review.rating
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-muted'
              }
            />
          ))}
        </section>
        <p className="text-muted-foreground">{review.comment}</p>
      </article>
    </li>
  );
};

export default ProductReview;
