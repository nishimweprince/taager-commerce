import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cart } from '@/core/domain/entities/cart.entity';

interface CartState {
  cartsList: Cart[];
  cart?: Cart;
  selectedCart?: Cart;
  deleteCartModal: boolean;
}

const initialState: CartState = {
  cartsList: [],
  cart: undefined,
  selectedCart: undefined,
  deleteCartModal: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Cart>) => {
      state.cartsList.unshift(action.payload);
    },

    removeFromCartsList: (state, action: PayloadAction<number>) => {
      state.cartsList = state.cartsList.filter(
        (cart) => cart.id !== action.payload
      );
    },

    clearCart: (state) => {
      state.cartsList = [];
    },

    setCartsList: (state, action: PayloadAction<Cart[]>) => {
      state.cartsList = action.payload;
    },

    setDeleteCartModal: (state, action: PayloadAction<boolean>) => {
      state.deleteCartModal = action.payload;
    },

    setSelectedCart: (state, action: PayloadAction<Cart | undefined>) => {
      state.selectedCart = action.payload;
    },

    setCart: (state, action: PayloadAction<Cart | undefined>) => {
      state.cart = action.payload;
    },
  },
});

export const {
  addToCart,
  removeFromCartsList,
  clearCart,
  setCartsList,
  setDeleteCartModal,
  setSelectedCart,
  setCart,
} = cartSlice.actions;

export default cartSlice.reducer;
