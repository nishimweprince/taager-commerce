import Modal from '@/presentation/ui/components/common/Modal';
import { useAppDispatch, useAppSelector } from '@/core/application/state/hooks';
import {
  setDeleteProductModal,
  setSelectedProduct,
} from '@/core/application/state/slices/productSlice';
import { useCallback, useEffect } from 'react';
import Button from '@/presentation/ui/components/inputs/Button';
import { useDeleteProduct } from '@/core/application/products/product.hooks';
import { toast } from 'sonner';
const DeleteProduct = () => {
  /**
   * STATE VARIABELS
   */
  const dispatch = useAppDispatch();
  const { deleteProductModal, selectedProduct } = useAppSelector(
    (state) => state.product
  );

  // DELETE PRODUCT
  const {
    deleteProduct,
    deleteProductIsLoading,
    deleteProductIsSuccess,
    resetDeleteProduct,
  } = useDeleteProduct();

  // CLOSE MODAL
  const closeModal = useCallback(() => {
    dispatch(setDeleteProductModal(false));
    dispatch(setSelectedProduct(undefined));
    resetDeleteProduct();
  }, [dispatch, resetDeleteProduct]);

  // HANDLE DELETE PRODUCT
  useEffect(() => {
    if (deleteProductIsSuccess) {
      if (selectedProduct?.id) {
        toast.success('Product deleted successfully');
        closeModal();
      }
    }
  }, [deleteProductIsSuccess, closeModal, selectedProduct?.id]);

  return (
    <Modal
      isOpen={deleteProductModal}
      onClose={closeModal}
      heading={`Delete ${selectedProduct?.title}`}
      headingClassName="text-red-700"
    >
      <article className="w-full flex flex-col gap-4">
        <p>
          Are you sure you want to delete this product? This action cannot be
          undone.
        </p>
        <Button
          danger
          isLoading={deleteProductIsLoading}
          className="self-end"
          onClick={(e) => {
            e.preventDefault();
            if (selectedProduct?.id) {
              deleteProduct(selectedProduct?.id);
            }
          }}
        >
          Delete
        </Button>
      </article>
    </Modal>
  );
};

export default DeleteProduct;
