import { Product } from '@/core/domain/entities/product.entity';
import Card from '../common/Card';
import { Link } from 'react-router-dom';
import { capitalizeString } from '@/presentation/utils/string.helper';
import ProductRating from './ProductRating';
import { Heading } from '../inputs/TextInputs';

const ProductCard = ({ product }: { product?: Product }) => {
  return (
    <Card>
      <Link to={`/products/${product?.id}`} className="block p-5">
        <figure className="aspect-square bg-accent mb-1 rounded-md flex items-center justify-center">
          {product?.image ? (
            <img
              src={product?.image}
              alt={product?.title}
              className="object-cover w-full h-full rounded-md"
            />
          ) : (
            <figcaption className="text-muted-foreground">No image</figcaption>
          )}
        </figure>
        <Heading type="h3" className="font-medium truncate hover:text-primary">
          {product?.title}
        </Heading>
        <section className="flex items-center gap-1 my-1">
          <ProductRating
            rating={product?.rating?.rate || 0}
            count={product?.rating?.count || 0}
          />
        </section>
        <footer className="flex justify-between items-center mt-1">
          <span className="font-bold">${product?.price}</span>
          <span className="text-sm bg-muted px-2 py-0.5 rounded">
            {capitalizeString(product?.category)}
          </span>
        </footer>
      </Link>
    </Card>
  );
};

export default ProductCard;
