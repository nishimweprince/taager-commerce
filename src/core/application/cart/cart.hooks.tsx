import { useLazyFetchAllCartsQuery, useLazyGetCartByIdQuery } from '@/adapters/api/cart/cartApiQuerySlice';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { useCallback, useEffect, useState } from 'react';
import { setCart, setCartsList } from '../state/slices/cartSlice';
import { useDeleteCartMutation, useUpdateCartMutation } from '@/adapters/api/cart/cartApiSlice';
import { useLazyGetProductByIdQuery } from '@/adapters/api/products/productApiQuerySlice';
import { Product } from '@/core/domain/entities/product.entity';
import { toCart } from '@/adapters/mappers/cartMapper';
import { Cart } from '@/core/domain/entities/cart.entity';

/**
 * FETCH ALL CARTS
 */
export const useFetchAllCarts = () => {
  /**
   * STATE VARIABLES
   */

  const dispatch = useAppDispatch();

  /**
   * FETCH ALL CARTS
   */
  const [
    fetchAllCarts,
    {
      data: cartsData,
      isFetching: cartsIsFetching,
      error: cartsError,
      isError: cartsIsError,
      isSuccess: cartsIsSuccess,
    },
  ] = useLazyFetchAllCartsQuery();

  useEffect(() => {
    if (cartsIsSuccess) {
      dispatch(setCartsList(cartsData.map(toCart)));
    }
  }, [cartsData, cartsIsSuccess, dispatch]);

  return {
    fetchAllCarts,
    cartsData,
    cartsIsFetching,
    cartsError,
    cartsIsError,
    cartsIsSuccess,
  };
};

// DELETE CART
export const useDeleteCart = () => {

  // DELETE CART
  const [
    deleteCart,
    {
      isLoading: deleteCartIsLoading,
      isError: deleteCartIsError,
      isSuccess: deleteCartIsSuccess,
      error: deleteCartError,
      reset: deleteCartReset,
    },
  ] = useDeleteCartMutation();

  useEffect(() => {
    if (deleteCartIsError) {
      deleteCartReset();
    }
  }, [deleteCartIsError, deleteCartReset]);

  return {
    deleteCart,
    deleteCartIsLoading,
    deleteCartIsError,
    deleteCartIsSuccess,
    deleteCartError,
    deleteCartReset,
  };
};

// GET CART BY ID
export const useGetCartById = () => {

  /**
   * STATE VARIABLES
   */

  const dispatch = useAppDispatch();

  /**
   * GET CART BY ID
   */
  const [
    getCartById,
    {
      data: cartData,
      isFetching: cartIsFetching,
      isError: cartIsError,
      isSuccess: cartIsSuccess,
    },
  ] = useLazyGetCartByIdQuery();

  useEffect(() => {
    if (cartIsSuccess) {
      dispatch(setCart(toCart(cartData)));
    }
  }, [cartData, cartIsSuccess, dispatch]);

  return {
    getCartById,
    cartData,
    cartIsFetching,
    cartIsError,
    cartIsSuccess,
  };
};

// FETCH CART PRODUCTS
export const useCartProducts = () => {

  /**
   * STATE VARIABLES
   */
  const { cart } = useAppSelector((state) => state.cart);

  const [products, setProducts] = useState<(Product & { quantity: number })[]>([]);
  const [fetchProduct] = useLazyGetProductByIdQuery();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const cartProducts = (cart && Array.isArray(cart?.products)) ? cart.products : [];
    if (!cart || !cartProducts.length) {
      setProducts([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    Promise.all(
      cartProducts.map(async (item) => {
        const result = await fetchProduct(item.productId).unwrap();
        return { ...result, quantity: item.quantity };
      })
    ).then((prods) => {
      if (isMounted) {
        setProducts(prods);
        setLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [cart, fetchProduct]);

  const cartTotal = products.reduce((sum, p) => sum + p.price * p.quantity, 0);

  return { products, loading, cartTotal, setProducts };
};

// UPDATE CART
export const useUpdateCart = () => {

  /**
   * STATE VARIABLES
   */
  const dispatch = useAppDispatch();
  const [updatedCart, setUpdatedCart] = useState<Cart | undefined>(undefined);

  /**
   * UPDATE CART
   */
  const [
    updateCart,
    {
      isLoading: updateCartIsLoading,
      isError: updateCartIsError,
      isSuccess: updateCartIsSuccess,
      error: updateCartError,
      reset: updateCartReset,
      data: updatedCartData,
    },
  ] = useUpdateCartMutation();

  useEffect(() => {
    if (updateCartIsError) {
      updateCartReset();
    } else if (updateCartIsSuccess) {
      setUpdatedCart(toCart(updatedCartData));
      dispatch(setCart(toCart(updatedCartData)));
    }
  }, [dispatch, updateCartIsError, updateCartIsSuccess, updateCartReset, updatedCartData]);

  return {
    updateCart,
    updateCartIsLoading,
    updateCartIsError,
    updateCartIsSuccess,
    updateCartError,
    updatedCart,
    setUpdatedCart,
    updateCartReset,
  };
};

// ADD PRODUCT TO CART
export const useAddProductToCart = () => {

  /**
   * STATE VARIABLES
   */
  const dispatch = useAppDispatch();

  /**
   * UPDATE CART
   */
  const [
    updateCart,
    {
      isLoading: updateCartIsLoading,
      isError: updateCartIsError,
      isSuccess: updateCartIsSuccess,
      error: updateCartError,
      reset: updateCartReset,
      data: updatedCartData,
    },
  ] = useUpdateCartMutation();

      // GET CART
      const { getCartById, cartIsFetching } = useGetCartById();

  const addProductToCart = useCallback(
    ({
      productId,
      quantity,
      cartId,
    }: {
      productId: number;
      quantity: number;
      cartId?: number;
    }) => {
      getCartById(cartId || 1).unwrap().then((data) => {
        updateCart({
          id: cartId || 1,
          data: {
            userId: data.userId,
            date: data.date,
            products: [...data.products, { productId, quantity }],
          },
        });
      });
    },
    [getCartById, updateCart]
  );

  useEffect(() => {
    if (updateCartIsSuccess) {
      dispatch(setCart(updatedCartData));
      updateCartReset();
    }
  }, [dispatch, updateCartIsSuccess, updateCartReset, updatedCartData]);

  return {
    addProductToCart,
    updateCart,
    updateCartIsLoading,
    updateCartIsError,
    updateCartIsSuccess,
    updateCartError,
    cartIsFetching,
  };
};
