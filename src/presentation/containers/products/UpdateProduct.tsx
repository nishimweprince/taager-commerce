import { useAppDispatch, useAppSelector } from '@/core/application/state/hooks';
import { setSelectedProduct } from '@/core/application/state/slices/productSlice';
import { setUpdateProductModal } from '@/core/application/state/slices/productSlice';
import CustomTooltip from '@/presentation/ui/components/common/CustomTooltip';
import Modal from '@/presentation/ui/components/common/Modal';
import Input from '@/presentation/ui/components/inputs/Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TextArea from '@/presentation/ui/components/inputs/TextArea';
import { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { faX } from '@fortawesome/free-solid-svg-icons';
import Button from '@/presentation/ui/components/inputs/Button';
import { useUpdateProduct } from '@/core/application/products/product.hooks';
import { convertFileToBase64 } from '@/presentation/utils/uploads.helper';
import { toast } from 'sonner';

const UpdateProduct = () => {
  /**
   * STATE VARIABLES
   */
  const dispatch = useAppDispatch();
  const { updateProductModal, selectedProduct } = useAppSelector(
    (state) => state.product
  );
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [existingImage, setExistingImage] = useState<File | null>(null);

  /**
   * REACT HOOK FORM
   */
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm();

  // UPDATE PRODUCT
  const {
    updateProduct,
    updateProductIsLoading,
    updateProductIsSuccess,
    resetUpdateProduct,
  } = useUpdateProduct();

  // HANDLE FORM SUBMISSION
  const onSubmit = handleSubmit(async (data) => {
    let convertedImage: string | null = null;
    if (uploadedImage) {
      convertedImage = await convertFileToBase64(uploadedImage);
    } else if (existingImage) {
      convertedImage = await convertFileToBase64(existingImage);
    }
    if (convertedImage && selectedProduct?.id) {
      updateProduct({
        id: selectedProduct?.id,
        title: data?.title,
        price: data?.price,
        category: data?.category,
        description: data?.description,
        image: convertedImage,
      });
    }
  });

  // CLOSE MODAL
  const closeModal = useCallback(() => {
    dispatch(setUpdateProductModal(false));
    dispatch(setSelectedProduct(undefined));
    reset();
    resetUpdateProduct();
  }, [dispatch, reset, resetUpdateProduct]);

  /**
   * SET DEFAULT VALUES
   */

  useEffect(() => {
    if (selectedProduct) {
      Object.entries(selectedProduct).forEach(([key, value]) => {
        if (!key.includes('image')) {
          setValue(key, value);
        } else {
          setExistingImage(value);
          clearErrors('image');
        }
      });
    }
  }, [selectedProduct, reset, setValue, clearErrors]);

  // HANDLE UPDATE PRODUCT SUCCESS
  useEffect(() => {
    if (updateProductIsSuccess) {
      if (selectedProduct?.id) {
        toast.success('Product updated successfully');
        closeModal();
      }
    }
  }, [updateProductIsSuccess, closeModal, selectedProduct?.id]);

  return (
    <Modal
      isOpen={updateProductModal}
      onClose={closeModal}
      heading="Update Product"
      className="min-w-[35vw]"
    >
      <form className="w-full flex flex-col gap-4" onSubmit={onSubmit}>
        <fieldset className="w-full grid grid-cols-1 gap-3 justify-between">
          <Controller
            control={control}
            name="title"
            rules={{ required: `Please provide the product title` }}
            render={({ field }) => (
              <Input
                {...field}
                label="Title"
                required
                errorMessage={errors?.title?.message}
              />
            )}
          />
          <Controller
            name="price"
            control={control}
            rules={{ required: `Please provide the product price` }}
            render={({ field }) => (
              <Input
                {...field}
                label="Price"
                required
                type="number"
                errorMessage={errors?.price?.message}
              />
            )}
          />
          <Controller
            name="category"
            rules={{ required: `Please provide the product category` }}
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label="Category"
                required
                errorMessage={errors?.category?.message}
              />
            )}
          />
          <Controller
            name="description"
            control={control}
            rules={{ required: `Please provide the product description` }}
            render={({ field }) => (
              <TextArea
                {...field}
                label="Description"
                required
                errorMessage={errors?.description?.message}
              />
            )}
          />
          <Controller
            name="image"
            control={control}
            rules={{ required: existingImage ? false : `Please provide the product image` }}
            render={({ field }) => {
              return (
                <ul className="w-full flex flex-col gap-1">
                  <Input
                    {...field}
                    label="Image"
                    required
                    type="file"
                    errorMessage={errors?.image?.message}
                    onChange={(e) => {
                      field.onChange(e);
                      setUploadedImage(e.target.files?.[0] || null);
                    }}
                  />
                  {uploadedImage && (
                    <li className="w-full h-[100px] flex items-center justify-between">
                      <p className="text-sm text-gray-500">
                        {uploadedImage?.name}
                      </p>
                      <CustomTooltip
                        label="Remove image"
                        labelClassName="bg-red-700 text-white"
                      >
                        <FontAwesomeIcon
                          icon={faX}
                          className="text-red-700 text-sm cursor-pointer"
                          onClick={(e) => {
                            e.preventDefault();
                            setUploadedImage(null);
                            setValue('image', null);
                          }}
                        />
                      </CustomTooltip>
                    </li>
                  )}
                </ul>
              );
            }}
          />
        </fieldset>
        {existingImage && (
          <figure className="w-full flex items-center justify-between">
            <img
              src={existingImage as unknown as string}
              alt={selectedProduct?.title}
              className="w-[100px] h-[100px] object-cover rounded-md self-center"
            />
            <CustomTooltip
              label="Remove image"
              labelClassName="bg-red-700 text-white"
            >
              <FontAwesomeIcon
                icon={faX}
                className="text-red-700 text-sm cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  setExistingImage(null);
                  setValue('image', null);
                }}
              />
            </CustomTooltip>
          </figure>
        )}
        <Button primary isLoading={updateProductIsLoading} type="submit">
          Save
        </Button>
      </form>
    </Modal>
  );
};

export default UpdateProduct;
