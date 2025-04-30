import { Product } from '../entities/product.entity';
import { Cart } from '../entities/cart.entity';

export interface ICartRepository {
  getCart(): Promise<Cart>;
  addToCart(product: Product, quantity: number): Promise<Cart>;
  removeFromCart(productId: number): Promise<Cart>;
  updateQuantity(productId: number, quantity: number): Promise<Cart>;
  clearCart(): Promise<void>;
}
