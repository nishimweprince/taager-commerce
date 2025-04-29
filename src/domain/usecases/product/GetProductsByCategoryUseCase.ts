import { Product } from '../../entities/product.entity';
import { IProductRepository } from '../../repositories/product.repository';

export class GetProductsByCategoryUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute(category: string): Promise<Product[]> {
    try {
      const products = await this.productRepository.getProductsByCategory(category);
      return products;
    } catch (error) {
      console.error(`Error fetching products for category ${category}:`, error);
      throw error;
    }
  }
}
