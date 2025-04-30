import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cart } from '@/core/domain/entities/cart.entity';

interface CartState {
  itemsList: Cart[];
  item?: Cart;
  selectedItem?: Cart;
}

const initialState: CartState = {
  itemsList: [],
  item: undefined,
  selectedItem: undefined,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Cart>) => {
      state.itemsList.unshift(action.payload);
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      state.itemsList = state.itemsList.filter(
        (item) => item.id !== action.payload
      );
    },

    clearCart: (state) => {
      state.itemsList = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
