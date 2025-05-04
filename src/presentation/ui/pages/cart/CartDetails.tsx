import { useEffect, useMemo } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useGetCartById } from '@/core/application/cart/cart.hooks';
import { useCartProducts } from '@/core/application/cart/cart.hooks';
import { useUpdateCart } from '@/core/application/cart/cart.hooks';
import TableUserLabel from '@/presentation/ui/components/users/TableUserLabel';
import Table from '@/presentation/ui/components/table/Table';
import { useCartProductsColumns } from '@/core/application/cart/columns.hooks';
import CustomTooltip from '../../components/common/CustomTooltip';
import { Product } from '@/core/domain/entities/product.entity';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleMinus } from '@fortawesome/free-solid-svg-icons';
import Button from '../../components/inputs/Button';
import { Heading } from '../../components/inputs/TextInputs';
import Loader from '../../components/inputs/Loader';
import { useAppSelector } from '@/core/application/state/hooks';

const CartDetails = () => {
  /**
   * STATE VARIABLES
   */
  const { cart } = useAppSelector((state) => state.cart);
  const { getCartById } = useGetCartById();
  const { products, loading, cartTotal } = useCartProducts();
  const {
    updateCart,
    updateCartIsLoading,
  } = useUpdateCart();

  /**
   * NAVIGATION
   */
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  // FETCH CART BY ID
  useEffect(() => {
    if (!searchParams.get('fromUrl') && !cart) {
      getCartById(id ? Number(id) : 1);
    }
  }, [id, getCartById, searchParams, cart]);

  // CART PRODUCTS COLUMNS
  const { cartProductsColumns } = useCartProductsColumns();

  // CART PRODUCTS EXTENDED COLUMNS
  const cartProductsExtendedColumns = useMemo(() => {
    return [
      ...cartProductsColumns,
      {
        header: '',
        accessorKey: 'actions',
        cell: ({
          row,
        }: {
          row: { original: Product & { quantity: number } };
        }) => (
          <CustomTooltip
            label="Remove from cart"
            labelClassName="bg-red-700 text-white"
          >
            {updateCartIsLoading ? (
              <Loader className="text-primary" />
            ) : (
              <FontAwesomeIcon
                icon={faCircleMinus}
                className="text-red-700 cursor-pointer mx-auto"
                onClick={(e) => {
                  e.preventDefault();
                  if (cart) {
                    updateCart({
                      id: cart?.id,
                      data: {
                        userId: cart?.userId,
                        date: cart?.date,
                        products: products
                          .filter((product) => product.id !== row.original.id)
                          .map((product) => ({
                            productId: product.id,
                            quantity: product.quantity,
                          })),
                      },
                    });
                  }
                }}
              />
            )}
          </CustomTooltip>
        ),
      },
    ];
  }, [cart, cartProductsColumns, products, updateCart, updateCartIsLoading]);

  return (
    <DashboardLayout>
      <main className="w-full flex flex-col gap-4">
        <header className="mb-4">
          <Heading type={'h1'}>Cart Details</Heading>
        </header>
        {cart ? (
          <section
            aria-labelledby="cart-meta"
            className="mb-2 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <section aria-label="Cart Meta" className="not-prose">
              <p className="text-gray-500 text-sm">
                Cart ID: <span className="font-mono">{cart.id}</span>
              </p>
              <p className="text-gray-500 text-sm">
                Date:{' '}
                {cart.date ? new Date(cart.date).toLocaleDateString() : '—'}
              </p>
            </section>
            <aside aria-label="Cart User" className="not-prose">
              <span className="text-gray-500 text-sm">Created By:</span>
              <TableUserLabel userId={cart.userId} />
            </aside>
          </section>
        ) : (
          <section className="text-center text-gray-400 py-12">
            Cart not found.
          </section>
        )}
        <section aria-labelledby="cart-products" className="mb-2">
          <Table
            columns={cartProductsExtendedColumns}
            data={products}
            isLoading={loading}
            noDataMessage="No products in cart."
            showPagination={false}
          />
        </section>
        <section className="bg-gray-100 w-fit self-end rounded-lg px-4 py-2 text-base font-semibold text-gray-800 shadow-inner mb-6">
          Total: <span className="text-green-700">${cartTotal.toFixed(2)}</span>
        </section>
        <footer className="flex items-center justify-between">
          <Button
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
          >
            Back
          </Button>
        </footer>
      </main>
    </DashboardLayout>
  );
};

export default CartDetails;
