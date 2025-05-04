import { ApiCart } from '@/adapters/mappers/cartMapper';
import { Cart } from '@/core/domain/entities/cart.entity';
import {
  ellipsisHClassName,
  tableActionClassName,
} from '@/presentation/constants/inputs.constants';
import CustomPopover from '@/presentation/ui/components/common/CustomPopover';
import TableUserLabel from '@/presentation/ui/components/users/TableUserLabel';
import { formatDate } from '@/presentation/utils/string.helper';
import {
  faCircleInfo,
  faEllipsis,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ColumnDef } from '@tanstack/react-table';
import { Link } from 'react-router-dom';
import { setDeleteCartModal, setSelectedCart } from '../state/slices/cartSlice';
import { useAppDispatch } from '../state/hooks';
import { useMemo } from 'react';
import { Product } from '@/core/domain/entities/product.entity';

// MANAGE CARTS COLUMNS
export const useCartColumns = () => {
  /**
   * STATE VARIABLES
   */
  const dispatch = useAppDispatch();

  const cartColumns: ColumnDef<ApiCart | Cart>[] = useMemo(
    () => [
      {
        id: 'id',
        header: 'ID',
        accessorKey: 'id',
      },
      {
        id: 'userId',
        header: 'Created By',
        accessorKey: 'userId',
        cell: ({ row }) => <TableUserLabel userId={row.original?.userId} />,
      },
      {
        id: 'updatedAt',
        header: 'Last Updated',
        accessorKey: 'updatedAt',
        cell: ({ row }) => formatDate(row.original?.date, 'DD/MM/YYYY HH:mm'),
      },
      {
        id: 'actions',
        header: 'Actions',
        accessorKey: 'actions',
        cell: ({ row }) => (
          <CustomPopover
            trigger={
              <FontAwesomeIcon
                icon={faEllipsis}
                className={ellipsisHClassName}
              />
            }
          >
            <menu className="flex flex-col gap-2">
              <Link
                className={tableActionClassName}
                to={`/dashboard/carts/${row.original?.id}`}
              >
                <FontAwesomeIcon icon={faCircleInfo} />
                View details
              </Link>
              <Link
                className={tableActionClassName}
                to={`#`}
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(setSelectedCart(row.original as Cart));
                  dispatch(setDeleteCartModal(true));
                }}
              >
                <FontAwesomeIcon icon={faTrash} className="text-red-700" />
                Delete
              </Link>
            </menu>
          </CustomPopover>
        ),
      },
    ],
    [dispatch]
  );

  return { cartColumns };
};

// CART PRODUCTS COLUMNS
export const useCartProductsColumns = () => {
  const cartProductsColumns = useMemo(
    () => [
      {
        header: 'Product',
        accessorKey: 'title',
        cell: ({
          row,
        }: {
          row: { original: Product & { quantity: number } };
        }) => (
          <Link
            to={`/products/${row.original.id}`}
            className="flex items-center gap-3 p-1 rounded-md hover:bg-gray-100"
          >
            <img
              src={row.original.image}
              alt={row.original.title}
              className="w-10 h-10 object-contain rounded border"
            />
            <span className="font-medium text-gray-800 max-w-[200px] truncate">
              {row.original.title}
            </span>
          </Link>
        ),
      },
      {
        header: 'Description',
        accessorKey: 'description',
        cell: ({
          row,
        }: {
          row: { original: Product & { quantity: number } };
        }) => (
          <span className="text-gray-500 max-w-xs truncate block">
            {row.original.description || '—'}
          </span>
        ),
      },
      {
        header: 'Quantity',
        accessorKey: 'quantity',
        cell: ({
          row,
        }: {
          row: { original: Product & { quantity: number } };
        }) => <span className="text-center">{row.original.quantity}</span>,
      },
      {
        header: 'Price',
        accessorKey: 'price',
        cell: ({
          row,
        }: {
          row: { original: Product & { quantity: number } };
        }) => (
          <span className="text-right">${row.original?.price?.toFixed(2)}</span>
        ),
      },
      {
        header: 'Subtotal',
        id: 'subtotal',
        cell: ({
          row,
        }: {
          row: { original: Product & { quantity: number } };
        }) => (
          <span className="text-right font-semibold text-green-700">
            ${(row.original.price * row.original.quantity).toFixed(2)}
          </span>
        ),
      },
    ],
    []
  );

  return { cartProductsColumns };
};
