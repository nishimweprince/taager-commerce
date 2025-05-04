import { User } from '@/core/domain/entities/user.entity';
import { ellipsisHClassName, tableActionClassName } from '@/presentation/constants/inputs.constants';
import CustomPopover from '@/presentation/ui/components/common/CustomPopover';
import { capitalizeString } from '@/presentation/utils/string.helper';
import { faCircleInfo, faEllipsisH, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../state/hooks';
import { setDeleteUserModal } from '../state/slices/userSlice';
import { setSelectedUser } from '../state/slices/userSlice';

export const useUserColumns = () => {

  // STATE VARIABLES
  const dispatch = useAppDispatch();

  // USER COLUMNS
  const userColumns: ColumnDef<User>[] = useMemo(
    () => [
      {
        header: 'Name',
        accessorKey: 'name',
        cell: ({ row }) => capitalizeString(row?.original?.name),
      },
      {
        header: 'Username',
        accessorKey: 'username',
        cell: ({ row }) => row?.original?.username,
      },
      {
        header: 'Email',
        accessorKey: 'email',
        cell: ({ row }) => row?.original?.email,
      },
      {
        header: 'Phone',
        accessorKey: 'phone',
        cell: ({ row }) => row?.original?.phone,
      },
      {
        header: 'Address',
        accessorKey: 'address',
        cell: ({ row }) => capitalizeString(row?.original?.address?.city),
      },
      {
        header: 'Actions',
        accessorKey: 'actions',
        cell: ({ row }) => (
          <CustomPopover
            trigger={
              <FontAwesomeIcon
                icon={faEllipsisH}
                className={ellipsisHClassName}
              />
            }
          >
            <menu className="w-full flex flex-col gap-2">
              <Link to={`${row.original.id}`} className={tableActionClassName}>
                <FontAwesomeIcon icon={faCircleInfo} />
                View details
              </Link>
              <Link to={`#`} className={tableActionClassName} onClick={(e) => {
                e.preventDefault();
                dispatch(setDeleteUserModal(true));
                dispatch(setSelectedUser(row.original));
              }}>
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

  return { userColumns };
};
