import { createSlice } from '@reduxjs/toolkit'
import { Product } from '@/core/domain/entities/product.entity';
import { ApiProduct } from '@/adapters/api/mappers/productMapper';

interface ProductState {
  productsList: Product[] & ApiProduct[];
  product?: Product & ApiProduct;
  selectedProduct?: Product & ApiProduct;
}

const initialState: ProductState = {
  productsList: [] as Product[] & ApiProduct[],
  product: undefined,
  selectedProduct: undefined,
}

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProductsList: (state, action) => {
      state.productsList = action.payload;
    },
    setProduct: (state, action) => {
      state.product = action.payload;
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    addToProductsList: (state, action) => {
      state.productsList.push(action.payload);
    },
    removeFromProductsList: (state, action) => {
      state.productsList = state.productsList.filter(
        (product) => product.id !== action.payload
      ) as Product[] & ApiProduct[];
    },
    
  },
});

export const {
  setProductsList,
  setProduct,
  setSelectedProduct,
  addToProductsList,
  removeFromProductsList,
} = productSlice.actions;

export default productSlice.reducer;
