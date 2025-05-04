import { Product } from '@/core/domain/entities/product.entity';
import { ellipsisHClassName, tableActionClassName } from '@/presentation/constants/inputs.constants';
import CustomPopover from '@/presentation/ui/components/common/CustomPopover';
import {
  capitalizeString,
  formatCurrency,
} from '@/presentation/utils/string.helper';
import { faCircleInfo, faEllipsisH, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { setSelectedProduct, setUpdateProductModal } from '../state/slices/productSlice';
import { setDeleteProductModal } from '../state/slices/productSlice';
import { useAppDispatch } from '../state/hooks';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';

// MANAGE PRODUCTS COLUMNS
export const useProductColumns = () => {

    // STATE VARIABELS
    const dispatch = useAppDispatch();

  const productColumns: ColumnDef<Product>[] = useMemo(
    () => [
      {
        header: 'Title',
        accessorKey: 'title',
        cell: ({ row }) => {
          return (
            <span className="flex items-center gap-3">
            <img src={row.original.image} alt={row.original.title} className="w-10 h-10 object-contain rounded border" />
            <span className="font-medium text-gray-800">{row.original.title}</span>
          </span>
          );
        },
      },
      {
        header: 'Description',
        accessorKey: 'description',
        cell: ({ row }) => {
          const description = row.getValue('description') as string;
          return (
            <p className="max-w-[10vw] truncate" title={description}>
              {description}
            </p>
          );
        },
      },
      {
        header: 'Price',
        accessorKey: 'price',
        cell: ({ row }) => {
          const price = row.getValue('price') as number;
          return (
            <p className="max-w-[10vw] truncate">{formatCurrency(price)}</p>
          );
        },
      },
      {
        header: 'Category',
        accessorKey: 'category',
        cell: ({ row }) => {
          const category = row.getValue('category') as string;
          return (
            <p className="max-w-[10vw] truncate" title={category}>
              {capitalizeString(category)}
            </p>
          );
        },
      },
      {
        header: 'Actions',
        accessorKey: 'actions',
        cell: ({ row }) => {
          return (
            <CustomPopover
              trigger={
                <FontAwesomeIcon
                  icon={faEllipsisH}
                  className={ellipsisHClassName}
                />
              }
            >
              <menu className="w-full flex flex-col gap-1">
                <Link
                  to={`/products/${row.original.id}`}
                  className={tableActionClassName}
                >
                    <FontAwesomeIcon icon={faCircleInfo} />
                    View details
                </Link>
                <Link
                  to={`#`}
                  className={tableActionClassName}
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(setUpdateProductModal(true));
                    dispatch(setSelectedProduct(row.original));
                  }}
                >
                    <FontAwesomeIcon icon={faPenToSquare} />
                    Update
                </Link>
                <Link
                  to={`#`}
                  className={tableActionClassName}
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(setDeleteProductModal(true));
                    dispatch(setSelectedProduct(row.original));
                  }}
                >
                    <FontAwesomeIcon icon={faTrash} className='text-red-700' />
                    Delete
                </Link>
              </menu>
            </CustomPopover>
          );
        },
      },
    ],
    [dispatch]
  );

  return { productColumns };
};
