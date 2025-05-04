import { useAppDispatch, useAppSelector } from '@/core/application/state/hooks';
import Modal from '../common/Modal';
import {
    removeFromCartsList,
  setDeleteCartModal,
  setSelectedCart,
} from '@/core/application/state/slices/cartSlice';
import { useCallback, useEffect } from 'react';
import Button from '../inputs/Button';
import { useDeleteCart } from '@/core/application/cart/cart.hooks';
import { toast } from 'sonner';

const DeleteCart = () => {
  /**
   * STATE VARIABLES
   */
  const dispatch = useAppDispatch();
  const { deleteCartModal, selectedCart } = useAppSelector(
    (state) => state.cart
  );

  // DELETE CART
  const {
    deleteCart,
    deleteCartIsLoading,
    deleteCartIsSuccess,
    deleteCartReset,
  } = useDeleteCart();

  // CLOSE MODAL
  const closeModal = useCallback(() => {
    dispatch(setDeleteCartModal(false));
    dispatch(setSelectedCart(undefined));
    deleteCartReset();
  }, [dispatch, deleteCartReset]);

  // HANDLE DELETE CART
  useEffect(() => {
    if (deleteCartIsSuccess) {
      if (selectedCart?.id) {
        toast.success('Cart deleted successfully');
        dispatch(removeFromCartsList(selectedCart.id));
        closeModal();
      }
    }
  }, [deleteCartIsSuccess, closeModal, selectedCart?.id, dispatch]);

  return (
    <Modal
      isOpen={deleteCartModal}
      onClose={closeModal}
      heading={`Delete Cart ${selectedCart?.id}`}
    >
      <article className="w-full flex flex-col gap-4">
        <p>
          Are you sure you want to delete this cart? This action cannot be
          undone.
        </p>
        <Button danger className="self-end" isLoading={deleteCartIsLoading} onClick={(e) => {
          e.preventDefault();
          if (selectedCart?.id) {
            deleteCart(selectedCart.id);
          }
        }}>
          Delete
        </Button>
      </article>
    </Modal>
  );
};

export default DeleteCart;
