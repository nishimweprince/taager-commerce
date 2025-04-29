import { BaseEntity } from './base.entity';
import { Product } from './product.entity';

export interface Cart extends BaseEntity {
  userId: number;
  products: Product[];
}