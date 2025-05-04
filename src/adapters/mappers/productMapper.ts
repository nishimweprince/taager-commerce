import { Product } from '../../../core/domain/entities/product.entity';

export interface ApiProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export const toProduct = (apiProduct: ApiProduct): Product => ({
  id: apiProduct.id,
  title: apiProduct.title,
  price: apiProduct.price,
  description: apiProduct.description,
  category: apiProduct.category,
  image: apiProduct.image,
  rating: {
    rate: apiProduct?.rating?.rate || 0,
    count: apiProduct?.rating?.count || 0,
  },
});

export const toApiProduct = (product: Product): ApiProduct => ({
  id: product.id,
  title: product.title,
  price: product.price,
  description: product.description,
  category: product.category,
  image: product.image,
  rating: {
    rate: product?.rating?.rate || 0,
    count: product?.rating?.count || 0,
  },
});
