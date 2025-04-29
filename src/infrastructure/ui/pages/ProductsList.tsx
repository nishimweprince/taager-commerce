import { useFetchAllProducts } from '@/application/services/product.service';
import { useAppSelector } from '@/application/state/hooks';
import { useEffect, useMemo, useState } from 'react';
import Input from '../components/common/Input';
import AppLayout from '../components/layout/AppLayout';
import Combobox from '../components/common/Combobox';
import ProductCard from '../components/product/ProductCard';
import { SkeletonLoader } from '../components/common/Loader';
import { capitalizeString } from '@/infrastructure/lib/string.helper';
import { useSearchParams } from 'react-router-dom';
import { faFileLines, faHome } from '@fortawesome/free-solid-svg-icons';
import CustomBreadcrumb from '../components/common/CustomBreadcrumb';

const Products = () => {
  /**
   * STATE VARIABLES
   */
  const { productsList } = useAppSelector((state) => state.product);
  const { productsIsFetching } = useFetchAllProducts();
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');

  /**
   * NAVIGATION
   */
  const [searchParams, setSearchParams] = useSearchParams();

  // NAVIGATION
  const navigationLinks = [
    {
      label: 'Home',
      route: '/',
      icon: faHome,
    },
    {
      label: 'Products',
      route: '/products',
      icon: faFileLines,
    },
  ];

  // GET UNIQUE CATEGORIES
  const categories = useMemo(
    () => ['All', ...new Set(productsList.map((product) => product.category))],
    [productsList]
  );

  // FILTER PRODUCTS
  const filteredProducts = productsList.filter(
    (product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        category === 'All'
          ? true
          : category
          ? product.category === category
          : true;
      return matchesSearch && matchesCategory;
    },
    [productsList, searchQuery, category]
  );

  // SET DEFAULT CATEGORY
  useEffect(() => {
    if (!category) {
      setCategory(categories?.[0]);
    }

    if (searchParams?.get('category')) {
      setCategory(searchParams?.get('category') || '');
    }
  }, [categories, category, searchParams]);

  return (
    <AppLayout>
      <header className="mb-8 flex flex-col gap-4">
        <CustomBreadcrumb navigationLinks={navigationLinks} />
        <h1 className="text-3xl font-bold mb-4">All Products</h1>
        <fieldset className="flex flex-col md:flex-row gap-4">
          <section className="flex-1">
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchQuery(e.target.value)
              }
              className="w-full"
            />
          </section>
          <section className="w-full md:w-1/3">
            <Combobox
              options={categories?.map((cat) => ({
                label: capitalizeString(cat),
                value: cat,
              }))}
              value={category}
              onChange={(value) => {
                searchParams.delete('category');
                setCategory(value);
                setSearchParams(searchParams);
              }}
            />
          </section>
        </fieldset>
      </header>

      {productsIsFetching ? (
        <menu className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <SkeletonLoader key={index} type="card" />
          ))}
        </menu>
      ) : (
        <>
          <section className="mb-4">
            <p className="text-muted-foreground">
              Showing {filteredProducts?.length} of {productsList?.length}{' '}
              products
            </p>
          </section>

          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts?.map((product) => (
              <ProductCard key={product?.id} product={product} />
            ))}
          </section>

          {filteredProducts?.length === 0 && (
            <section className="text-center py-12">
              <p className="text-lg mb-2">No products found</p>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
            </section>
          )}
        </>
      )}
    </AppLayout>
  );
};

export default Products;
