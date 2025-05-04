import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import {
  addToProductsList,
  removeFromProductsList,
  setProduct,
  setProductsList,
  setUpdateProduct,
} from '../state/slices/productSlice';
import {
  useLazyFetchAllProductsQuery,
  useLazyGetProductByIdQuery,
} from '@/adapters/api/products/productApiQuerySlice';
import { ApiProduct, toApiProduct } from '@/adapters/mappers/productMapper';
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
} from '@/adapters/api/products/productApiSlice';
import { toast } from 'sonner';
import { Product } from '@/core/domain/entities/product.entity';

// FETCH ALL PRODUCTS
export const useFetchAllProducts = () => {
  // STATE VARIABELS
  const dispatch = useAppDispatch();

  // FETCH ALL PRODUCTS
  const [
    fetchAllProducts,
    {
      data: productsData,
      isFetching: productsIsFetching,
      error: productsError,
      isSuccess: productsIsSuccess,
      isError: productsIsError,
    },
  ] = useLazyFetchAllProductsQuery();

  useEffect(() => {
    if (productsIsSuccess) {
      dispatch(setProductsList(productsData?.map(toApiProduct)));
    }
  }, [dispatch, productsData, productsIsSuccess]);

  return {
    productsIsFetching,
    productsError,
    productsIsSuccess,
    productsIsError,
    fetchAllProducts,
  };
};

// GET PRODUCT BY ID
export const useGetProductById = (id?: number) => {
  const dispatch = useAppDispatch();
  const [
    getProductById,
    {
      data: productData,
      isFetching: productIsFetching,
      error: productError,
      isSuccess: productIsSuccess,
      isError: productIsError,
    },
  ] = useLazyGetProductByIdQuery();

  useEffect(() => {
    if (id) {
      getProductById(id);
    }
  }, [getProductById, id]);

  useEffect(() => {
    if (productIsSuccess) {
      dispatch(setProduct(toApiProduct(productData)));
    }
  }, [dispatch, productData, productIsSuccess]);

  return {
    productIsFetching,
    productError,
    productIsSuccess,
    productIsError,
    getProductById,
  };
};

// DELETE PRODUCT
export const useDeleteProduct = () => {
  // STATE VARIABLES
  const dispatch = useAppDispatch();
  const { selectedProduct } = useAppSelector((state) => state.product);
  // DELETE PRODUCT
  const [
    deleteProduct,
    {
      isLoading: deleteProductIsLoading,
      isSuccess: deleteProductIsSuccess,
      isError: deleteProductIsError,
      reset: resetDeleteProduct,
    },
  ] = useDeleteProductMutation();

  useEffect(() => {
    if (deleteProductIsSuccess) {
      dispatch(removeFromProductsList(selectedProduct?.id));
    } else if (deleteProductIsError) {
      toast.error('Failed to delete product');
      resetDeleteProduct();
    }
  }, [
    deleteProductIsError,
    deleteProductIsSuccess,
    dispatch,
    resetDeleteProduct,
    selectedProduct,
  ]);

  return {
    deleteProduct,
    deleteProductIsLoading,
    deleteProductIsSuccess,
    deleteProductIsError,
    resetDeleteProduct,
  };
};

// CREATE PRODUCT
export const useCreateProduct = () => {
  // STATE VARIABLES
  const dispatch = useAppDispatch();

  // CREATE PRODUCT
  const [
    createProduct,
    {
      isLoading: createProductIsLoading,
      isSuccess: createProductIsSuccess,
      isError: createProductIsError,
      reset: resetCreateProduct,
      data: createProductData,
      error: createProductError,
    },
  ] = useCreateProductMutation();

  useEffect(() => {
    if (createProductIsSuccess) {
      dispatch(addToProductsList(createProductData));
    } else if (createProductIsError) {
      toast.error('Failed to create product');
      resetCreateProduct();
    }
  }, [
    createProductData,
    createProductIsError,
    createProductIsSuccess,
    dispatch,
    resetCreateProduct,
    createProductError,
  ]);

  return {
    createProduct,
    createProductIsLoading,
    createProductIsSuccess,
    createProductIsError,
    resetCreateProduct,
  };
};

// UPDATE PRODUCT
export const useUpdateProduct = () => {
  // STATE VARIABLES
  const dispatch = useAppDispatch();

  // UPDATE PRODUCT
  const [
    updateProduct,
    {
      isLoading: updateProductIsLoading,
      isSuccess: updateProductIsSuccess,
      isError: updateProductIsError,
      reset: resetUpdateProduct,
      data: updateProductData,
    },
  ] = useUpdateProductMutation();

  useEffect(() => {
    if (updateProductIsSuccess) {
      dispatch(setUpdateProduct(updateProductData));
    } else if (updateProductIsError) {
      toast.error('Failed to update product');
      resetUpdateProduct();
    }
  }, [
    updateProductIsError,
    updateProductIsSuccess,
    dispatch,
    resetUpdateProduct,
    updateProductData,
  ]);

  return {
    updateProduct,
    updateProductIsLoading,
    updateProductIsSuccess,
    updateProductIsError,
    resetUpdateProduct,
  };
};

/**
 * SEARCH PRODUCTS
 */
export const useSearchProducts = () => {
  const [productsList, setProductsList] = useState<(Product & ApiProduct)[]>(
    []
  );

  // FETCH ALL PRODUCTS
  const [fetchAllProducts, { isFetching: productsIsFetching }] =
    useLazyFetchAllProductsQuery();

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  const searchProducts = useCallback(
    (query?: string) => {
      if (query) {
        if (productsList?.length > 0) {
          const filteredProducts = productsList.filter((product) =>
            product.title.toLowerCase().includes(query.toLowerCase())
          );
          setProductsList(filteredProducts);
        } else {
          fetchAllProducts()
            .unwrap()
            .then((products) => {
              setProductsList(
                products
                  .map(toApiProduct)
                  ?.filter((product) =>
                    product.title.toLowerCase().includes(query.toLowerCase())
                  )
              );
            });
        }
      } else {
        setProductsList([]);
      }
    },
    [fetchAllProducts, productsList]
  );

  return {
    productsList,
    searchProducts,
    productsIsFetching,
  };
};
