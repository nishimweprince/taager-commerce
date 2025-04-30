import { Product } from '../../entities/product.entity';
import { IProductRepository } from '../../repositories/product.repository';

export class SearchProductsUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute(query: string): Promise<Product[]> {
    try {
      const products = await this.productRepository.searchProducts(query);
      return products;
    } catch (error) {
      console.error(`Error searching products with query "${query}":`, error);
      throw error;
    }
  }
}
