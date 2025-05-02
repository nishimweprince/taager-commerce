import { createSlice } from '@reduxjs/toolkit'
import { Product } from '@/core/domain/entities/product.entity';
import { ApiProduct } from '@/adapters/api/mappers/productMapper';

interface ProductState {
  productsList: Product[] & ApiProduct[];
  product?: Product & ApiProduct;
  selectedProduct?: Product & ApiProduct;
  deleteProductModal: boolean;
  createProductModal: boolean;
  updateProductModal: boolean;
}

const initialState: ProductState = {
  productsList: [] as Product[] & ApiProduct[],
  product: undefined,
  selectedProduct: undefined,
  deleteProductModal: false,
  createProductModal: false,
  updateProductModal: false,
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
      state.productsList.unshift(action.payload);
    },
    removeFromProductsList: (state, action) => {
      state.productsList = state.productsList.filter(
        (product) => product.id !== action.payload
      ) as Product[] & ApiProduct[];
    },
    setDeleteProductModal: (state, action) => {
      state.deleteProductModal = action.payload;
    },
    setCreateProductModal: (state, action) => {
      state.createProductModal = action.payload;
    },
    setUpdateProductModal: (state, action) => {
      state.updateProductModal = action.payload;
    },
    setUpdateProduct: (state, action) => {
      state.productsList = state.productsList.map((product) =>
        product.id === action.payload.id ? action.payload : product
      );
    },
  },
});

export const {
  setProductsList,
  setProduct,
  setSelectedProduct,
  addToProductsList,
  removeFromProductsList,
  setDeleteProductModal,
  setCreateProductModal,
  setUpdateProductModal,
  setUpdateProduct,
} = productSlice.actions;

export default productSlice.reducer;
