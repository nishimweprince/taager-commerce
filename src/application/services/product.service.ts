import { useEffect } from 'react';
import { useAppDispatch } from '../state/hooks';
import { setProduct, setProductsList } from '../state/slices/productSlice';
import { useLazyFetchAllProductsQuery, useLazyGetProductByIdQuery } from '../../adapters/api/apiQuerySlice';
import { toApiProduct } from '../../adapters/api/mappers/productMapper';

// FETCH ALL PRODUCTS
export const useFetchAllProducts = () => {
  const dispatch = useAppDispatch();
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
    fetchAllProducts();
  }, [fetchAllProducts]);

  useEffect(() => {
    if (productsIsSuccess) {
        console.log(productsData)
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
