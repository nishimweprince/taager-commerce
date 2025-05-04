import { useCallback, useEffect } from 'react';
import Modal from '../common/Modal';
import { useAppSelector } from '@/core/application/state/hooks';
import { useAppDispatch } from '@/core/application/state/hooks';
import {
  setDeleteUserModal,
  setRemoveFromUsersList,
} from '@/core/application/state/slices/userSlice';
import { setSelectedUser } from '@/core/application/state/slices/userSlice';
import Button from '../inputs/Button';
import { capitalizeString } from '@/presentation/utils/string.helper';
import { useDeleteUser } from '@/core/application/users/user.hooks';
import { toast } from 'sonner';

const DeleteUser = () => {
  /**
   * STATE VARIABLES
   */
  const dispatch = useAppDispatch();
  const { deleteUserModal, selectedUser } = useAppSelector(
    (state) => state.user
  );

  // DELETE USER
  const {
    deleteUser,
    deleteUserIsLoading,
    deleteUserIsSuccess,
    deleteUserReset,
  } = useDeleteUser();

  // CLOSE MODAL
  const closeModal = useCallback(() => {
    dispatch(setDeleteUserModal(false));
    dispatch(setSelectedUser(undefined));
    deleteUserReset();
  }, [dispatch, deleteUserReset]);

  // HANDLE DELETE USER
  useEffect(() => {
    if (deleteUserIsSuccess) {
      if (selectedUser?.id) {
        toast.success(
          `${capitalizeString(selectedUser?.name)} deleted successfully`
        );
        dispatch(setRemoveFromUsersList(selectedUser?.id));
        closeModal();
      }
    }
  }, [deleteUserIsSuccess, closeModal, selectedUser, dispatch]);

  return (
    <Modal
      isOpen={deleteUserModal}
      onClose={closeModal}
      heading={`Delete ${selectedUser?.name}`}
      headingClassName="text-red-700"
    >
      <article className="w-full flex flex-col gap-4">
        <p>
          Are you sure you want to delete{' '}
          <span className="font-bold">
            {capitalizeString(selectedUser?.name)}
          </span>
          ? This action cannot be undone.
        </p>
        <Button
          danger
          className="self-end"
          onClick={(e) => {
            e.preventDefault();
            if (selectedUser?.id) {
              deleteUser(selectedUser?.id);
            }
          }}
          isLoading={deleteUserIsLoading}
        >
          Delete
        </Button>
      </article>
    </Modal>
  );
};

export default DeleteUser;
