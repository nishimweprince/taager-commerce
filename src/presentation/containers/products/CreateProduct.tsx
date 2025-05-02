import { useAppDispatch, useAppSelector } from '@/core/application/state/hooks';
import { useEffect, useState } from 'react';
import { setCreateProductModal } from '@/core/application/state/slices/productSlice';
import Modal from '@/presentation/ui/components/common/Modal';
import Input from '@/presentation/ui/components/inputs/Input';
import TextArea from '@/presentation/ui/components/inputs/TextArea';
import { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import CustomTooltip from '@/presentation/ui/components/common/CustomTooltip';
import { convertFileToBase64 } from '@/presentation/utils/uploads.helper';
import Button from '@/presentation/ui/components/inputs/Button';
import { useCreateProduct } from '@/core/application/products/product.hooks';
import { toast } from 'sonner';
const CreateProduct = () => {
  /**
   * STATE VARIABLES
   */
  const dispatch = useAppDispatch();
  const { createProductModal } = useAppSelector((state) => state.product);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);

  // CREATE PRODUCT
  const {
    createProduct,
    createProductIsLoading,
    resetCreateProduct,
    createProductIsSuccess,
  } = useCreateProduct();

  /**
   * REACT HOOK FORM
   */
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  // HANDLE FORM SUBMISSION
  const onSubmit = handleSubmit(async (data) => {
    let imageBase64 = null;
    if (uploadedImage) {
      imageBase64 = await convertFileToBase64(uploadedImage);
    }
    if (imageBase64) {
      createProduct({
        id: 0,
        title: data?.title,
        description: data?.description,
        category: data?.category,
        price: Number(data?.price),
        image: imageBase64,
      });
    }
  });

  // CLOSE MODAL
  const closeModal = useCallback(() => {
    dispatch(setCreateProductModal(false));
    reset();
    resetCreateProduct();
  }, [dispatch, reset, resetCreateProduct]);

  // HANDLE CREATE PRODUCT
  useEffect(() => {
    if (createProductIsSuccess) {
      toast.success('Product created successfully');
      closeModal();
    }
  }, [createProductIsSuccess, closeModal]);

  return (
    <Modal
      isOpen={createProductModal}
      onClose={closeModal}
      heading="Add new product"
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
            rules={{ required: `Please provide the product image` }}
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
        <Button
          primary
          isLoading={createProductIsLoading}
          type="submit"
          className="w-full"
        >
          Add product
        </Button>
      </form>
    </Modal>
  );
};

export default CreateProduct;
