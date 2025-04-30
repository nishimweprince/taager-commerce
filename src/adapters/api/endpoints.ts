export const API_ENDPOINTS = {
  PRODUCTS: '/products',
  CATEGORIES: '/products/categories',
  PRODUCT_BY_ID: (id: number) => `/products/${id}`,
  PRODUCTS_BY_CATEGORY: (category: string) => `/products/category/${category}`,
  CART: '/carts',
  USER_CART: (userId: number) => `/carts/user/${userId}`,
  AUTH: '/auth',
  USERS: '/users',
};

export const BASE_URL = 'https://fakestoreapi.com';
