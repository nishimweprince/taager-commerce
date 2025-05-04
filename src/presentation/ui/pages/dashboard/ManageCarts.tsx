import DashboardLayout from '../../components/layout/DashboardLayout';
import { Heading } from '../../components/inputs/TextInputs';
import { faChartLine, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import CustomBreadcrumb from '../../components/common/CustomBreadcrumb';
import Table from '../../components/table/Table';
import { useAppSelector } from '../../../../core/application/state/hooks';
import { useCartColumns } from '@/core/application/cart/columns.carts';
import { useFetchAllCarts } from '@/core/application/cart/cart.hooks';
import { useEffect } from 'react';
import DeleteCart from '../../components/cart/DeleteCart';

const ManageCarts = () => {
  /**
   * STATE VARIABLES
   */
  const { cartsList } = useAppSelector((state) => state.cart);

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
      label: 'Manage Carts',
      route: '/dashboard/manage-carts',
      icon: faShoppingCart,
    },
  ];

  /**
   * CART HOOKS
   */

  // CART COLUMNS
  const { cartColumns } = useCartColumns();

  // FETCH ALL CARTS
  const { fetchAllCarts, cartsIsFetching } = useFetchAllCarts();

  // FETCH ALL CARTS
  useEffect(() => {
    fetchAllCarts();
  }, [fetchAllCarts]);

  return (
    <DashboardLayout>
      <main className="w-full flex flex-col gap-4">
        <nav className="w-full flex flex-col gap-4">
          <CustomBreadcrumb navigationLinks={navigationLinks} />
          <Heading>Manage Carts</Heading>
        </nav>
        <section className="w-full flex flex-col gap-4">
          <Table
            columns={cartColumns}
            data={cartsList}
            isLoading={cartsIsFetching}
          />
        </section>
      </main>
      <DeleteCart />
    </DashboardLayout>
  );
};

export default ManageCarts;
