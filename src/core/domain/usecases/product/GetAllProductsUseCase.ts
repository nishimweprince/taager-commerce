import { Product } from '../../entities/product.entity';
import { IProductRepository } from '../../repositories/product.repository';

export interface GetAllProductsUseCaseResponse {
  products: Product[];
}

export class GetAllProductsUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute(): Promise<Product[]> {
    try {
      const products = await this.productRepository.getAllProducts();
      return products;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }
}
