import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AppLayout from '../../components/layout/AppLayout';
import Button from '../../components/inputs/Button';
import Loader, { SkeletonLoader } from '../../components/inputs/Loader';
import { ShoppingCart, Truck, Shield, Heart } from 'lucide-react';
import ProductRating from '../../components/product/ProductRating';
import CustomBreadcrumb from '../../components/common/CustomBreadcrumb';
import { faBox, faFileLines, faHome } from '@fortawesome/free-solid-svg-icons';
import ProductReview from '../../components/product/ProductReview';
import { QuantitySelector } from '../../components/product/ProductQuantity';
import { useAppSelector } from '@/core/application/state/hooks';
import { useGetProductById } from '@/core/application/hooks/product.hooks';
import { capitalizeString } from '@/presentation/utils/string.helper';

const ProductDetails = () => {
  const { product } = useAppSelector((state) => state.product);
  const [quantity, setQuantity] = useState(1);
  const [reviewsIsFetching, setReviewsIsFetching] = useState(false);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { productIsFetching } = useGetProductById(id ? Number(id) : undefined);

  // NAVIGATION LINKS
  const navigationLinks = [
    { label: 'Home', route: '/', icon: faHome },
    { label: 'Products', route: '/products', icon: faFileLines },
    { label: product?.title, icon: faBox, route: `/products/${id}` },
  ];

  /**
   * PRODUCT REVIEWS
   */

  // MOCK REVIEWS DATA
  const reviews = [
    {
      name: 'Alex Johnson',
      rating: 5,
      date: '2 months ago',
      comment:
        'Absolutely love this product! Quality is excellent and it works exactly as described. Would definitely purchase again.',
    },
    {
      name: 'Morgan Smith',
      rating: 4,
      date: '3 months ago',
      comment:
        'Great product overall. Shipping was fast and the quality is good. Only giving 4 stars because the color is slightly different than pictured.',
    },
  ];

  // LOAD MORE REVIEWS
  const loadMoreReviews = useCallback(() => {
    setReviewsIsFetching(true);
    setTimeout(() => setReviewsIsFetching(false), 1500);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (productIsFetching) {
    return (
      <AppLayout>
        <section className="flex flex-col gap-8">
          <SkeletonLoader type="text" className="w-1/2 h-10" />
          <article className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <SkeletonLoader type="card" className="w-full h-full rounded-lg" />
            <section className="space-y-6">
              <SkeletonLoader type="text" className="w-full h-8" />
              <SkeletonLoader type="text" className="w-3/4 h-6" />
              <SkeletonLoader type="text" className="w-1/2 h-10" />
              <SkeletonLoader type="text" className="w-full h-24" />
            </section>
          </article>
        </section>
      </AppLayout>
    );
  }

  if (!product) {
    return (
      <AppLayout>
        <section className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="mb-6">
            We couldn't find the product you're looking for.
          </p>
          <Button onClick={() => navigate('/products')}>
            Back to Products
          </Button>
        </section>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <main className="w-full flex flex-col gap-4">
        <header className="w-full flex flex-col gap-4">
          <CustomBreadcrumb navigationLinks={navigationLinks} />
        </header>

        <article className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* PRODUCT IMAGE */}
          <figure className="aspect-square bg-white border rounded-lg overflow-hidden flex items-center justify-center p-4">
            <img
              src={product?.image}
              alt={product?.title}
              className="max-h-full max-w-full object-contain"
            />
          </figure>

          <section className="flex flex-col gap-4">
            {/* PRODUCT HEADER */}
            <header>
              <h1 className="text-3xl font-bold mb-2">{product?.title}</h1>
              <p className="text-muted-foreground text-sm">
                Category: {capitalizeString(product?.category)}
              </p>
            </header>

            {/* RATING */}
            <ProductRating
              rating={product?.rating?.rate || 0}
              count={product?.rating?.count || 0}
            />

            {/* PRICE */}
            <section className="border-t border-border pt-4">
              <hgroup className="mb-2">
                <span className="text-3xl font-bold text-primary">
                  ${product.price.toFixed(2)}
                </span>
              </hgroup>
              <span className="inline-flex items-center text-sm rounded-full px-3 py-1 bg-green-100 text-green-800">
                In Stock
              </span>
            </section>

            {/* DESCRIPTION */}
            <p className="text-muted-foreground">{product?.description}</p>

            {/* QUANTITY SELECTOR */}
            <QuantitySelector
              quantity={quantity}
              setQuantity={setQuantity}
              maxQuantity={quantity}
            />

            {/* ACTION BUTTONS */}
            <section className="flex flex-col sm:flex-row gap-4">
              <Button className="flex-1 flex items-center justify-center gap-2">
                <ShoppingCart size={18} />
                Add to Cart
              </Button>
              <Button className="flex-1">Buy Now</Button>
              <Button
                className="w-12 h-12 p-0 flex items-center justify-center"
                aria-label="Add to Wishlist"
              >
                <Heart size={18} />
              </Button>
            </section>

            {/* SHIPPING INFO */}
            <section className="border-t border-border pt-4 space-y-4">
              <article className="flex items-start gap-3">
                <Truck className="mt-0.5 text-muted-foreground" size={18} />
                <section>
                  <h3 className="font-medium">Free Shipping</h3>
                  <p className="text-sm text-muted-foreground">
                    Free standard shipping on orders over $35
                  </p>
                </section>
              </article>
              <article className="flex items-start gap-3">
                <Shield className="mt-0.5 text-muted-foreground" size={18} />
                <section>
                  <h3 className="font-medium">30-Day Returns</h3>
                  <p className="text-sm text-muted-foreground">
                    Shop with confidence with our 30-day return policy
                  </p>
                </section>
              </article>
            </section>
          </section>
        </article>

        <section className="border-t border-border py-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">Reviews</h2>
          <ul className="space-y-6">
            {reviews.map((review, index) => (
              <ProductReview key={index} review={review} />
            ))}
          </ul>
          <Button className="mt-6" onClick={loadMoreReviews}>
            {reviewsIsFetching ? (
              <Loader className="text-primary" />
            ) : (
              'Load more'
            )}
          </Button>
        </section>
      </main>
    </AppLayout>
  );
};

export default ProductDetails;
