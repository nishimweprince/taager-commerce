import { Product } from '../../entities/product.entity';
import { IProductRepository } from '../../repositories/product.repository';

export class GetProductByIdUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute(productId: number): Promise<Product | null> {
    try {
      const product = await this.productRepository.getProductById(productId);
      return product;
    } catch (error) {
      console.error(`Error fetching product with ID ${productId}:`, error);
      throw error;
    }
  }
} 