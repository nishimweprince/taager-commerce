import { faChartLine, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { Heading } from '../../components/inputs/TextInputs';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Table from '../../components/table/Table';
import CustomBreadcrumb from '../../components/common/CustomBreadcrumb';
import { useProductColumns } from '@/core/application/products/columns.products';
import { useFetchAllProducts } from '@/core/application/products/product.hooks';
import { useAppDispatch, useAppSelector } from '@/core/application/state/hooks';
import DeleteProduct from '@/presentation/containers/products/DeleteProduct';
import { useEffect } from 'react';
import Button from '../../components/inputs/Button';
import CreateProduct from '@/presentation/containers/products/CreateProduct';
import { setCreateProductModal } from '@/core/application/state/slices/productSlice';
import UpdateProduct from '@/presentation/containers/products/UpdateProduct';
const ManageProducts = () => {
  /**
   * STATE VARIABELS
   */
  const dispatch = useAppDispatch();
  const { productsList } = useAppSelector((state) => state.product);

  /**
   * NAVIGATION
   */
  const navigationLinks = [
    {
      label: 'Dashboard',
      route: '/dashboard',
      icon: faChartLine,
    },
    {
      label: 'Manage Products',
      route: '/dashboard/products',
      icon: faShoppingBag,
    },
  ];

  // FETCH ALL PRODUCTS
  const { productsIsFetching, fetchAllProducts } = useFetchAllProducts();

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  // PRODUCTS
  const { productColumns } = useProductColumns();

  return (
    <DashboardLayout>
      <main className="w-full flex flex-col gap-4 px-2 sm:px-4 md:px-8">
        <nav className="w-full flex flex-col gap-4">
          <CustomBreadcrumb navigationLinks={navigationLinks} />
          <ul className="w-full flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3 sm:justify-between">
            <Heading type="h1" className="text-center sm:text-left">Manage Products</Heading>
            <Button
              to={`#`}
              className="w-full sm:w-auto"
              onClick={(e) => {
                e.preventDefault();
                dispatch(setCreateProductModal(true));
              }}
            >
              Add Product
            </Button>
          </ul>
        </nav>
        <section className="w-full flex flex-col gap-4">
          <div className="w-full overflow-x-auto rounded-md">
            <Table
              data={productsList}
              columns={productColumns}
              isLoading={productsIsFetching}
              noDataMessage={
                <ul className="w-full flex flex-col items-center gap-4 p-2 sm:p-4">
                  <Heading type="h2" className="text-center">No products found</Heading>
                  <p className="text-center">You can add a new product by clicking the button below.</p>
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      fetchAllProducts();
                    }}
                    className="self-center flex items-center gap-2"
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
                </ul>
              }
            />
          </div>
        </section>
      </main>
      <DeleteProduct />
      <CreateProduct />
      <UpdateProduct />
    </DashboardLayout>
  );
};

export default ManageProducts;
