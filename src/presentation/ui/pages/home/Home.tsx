import { Link } from 'react-router-dom';
import AppLayout from '../../components/layout/AppLayout';
import { SkeletonLoader } from '../../components/inputs/Loader';
import ProductCard from '../../components/product/ProductCard';
import Button from '../../components/inputs/Button';
import { capitalizeString } from '@/presentation/utils/string.helper';
import { useFetchAllProducts } from '@/core/application/products/product.hooks';
import { useAppSelector } from '@/core/application/state/hooks';
import { Heading } from '../../components/inputs/TextInputs';
import { useEffect } from 'react';

const Home = () => {
  const { productsList } = useAppSelector((state) => state.product);
  const { productsIsFetching, productsIsSuccess, fetchAllProducts } =
    useFetchAllProducts();

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  return (
    <AppLayout>
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome to ShopSmart</h1>
        <p className="text-muted-foreground">
          Discover amazing products at incredible prices
        </p>
      </header>

      <section className="mb-8 flex flex-col gap-4">
        <ul className="w-full flex items-center gap-3 justify-between">
          <Heading type="h2">Featured Products</Heading>
          <Button to={`/products`}>View all</Button>
        </ul>

        {productsIsFetching ? (
          <menu className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <SkeletonLoader key={index} type="card" />
            ))}
          </menu>
        ) : productsIsSuccess && productsList?.length > 0 ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productsList?.slice(0, 8).map((product) => (
              <ProductCard key={product?.id} product={product} />
            ))}
          </ul>
        ) : (
          <section className="flex flex-col items-center justify-center gap-4 py-8">
            <p className="text-muted-foreground text-lg">No products found</p>
            <Button
              onClick={(e) => {
                e.preventDefault();
                fetchAllProducts();
              }}
              className="flex items-center gap-2"
            >
              <span>Try Again</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 2v6h-6" />
                <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
                <path d="M3 22v-6h6" />
                <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
              </svg>
            </Button>
          </section>
        )}
      </section>

      <section className="mb-8 flex flex-col gap-4">
        <Heading type="h2">Shop by Category</Heading>
        <nav className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...new Set(productsList?.map((product) => product?.category))]?.map(
            (category) => (
              <Link
                key={category}
                to={`/products?category=${category}`}
                className="bg-accent rounded-md p-3 hover:bg-accent/80 hover:scale-105 transition-all duration-300 px-4 flex flex-col items-center justify-center text-center"
              >
                {capitalizeString(category)}
              </Link>
            )
          )}
        </nav>
      </section>

      <section>
        <article className="bg-accent/50 rounded-lg p-8 text-center">
          <Heading type="h2">Special Offers</Heading>
          <p className="mb-4">Check out our latest deals and discounts</p>
          <Link
            to="/deals"
            className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/90 transition-colors"
          >
            Browse Deals
          </Link>
        </article>
      </section>
    </AppLayout>
  );
};

export default Home;
