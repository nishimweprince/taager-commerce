import { BaseEntity } from './base.entity';

export interface Cart extends BaseEntity {
  userId: number;
  products: {
    productId: number;
    quantity: number;
  }[];
  date: string;
}