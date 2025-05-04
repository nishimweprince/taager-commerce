import { Cart } from '@/core/domain/entities/cart.entity';
import { BaseEntity } from '@/core/domain/entities/base.entity';

export interface ApiCart extends BaseEntity {
  userId: number;
  products: {
    productId: number;
    quantity: number;
  }[];
  date: string;
}

export const toCart = (apiCart: ApiCart): Cart => {
  return {
    id: apiCart.id,
    userId: apiCart.userId,
    products: apiCart.products,
    date: apiCart.date,
  };
};

export const toApiCart = (cart: Cart): ApiCart => {
  return {
    id: cart.id,
    userId: cart.userId,
    products: cart.products,
    date: cart.date,
  };
};
