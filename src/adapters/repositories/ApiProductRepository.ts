import { Product } from '../../domain/entities/product.entity';
import { IProductRepository } from '../../domain/repositories/IProductRepository';
import { toProduct } from '../api/mappers/productMapper';
import { API_ENDPOINTS, BASE_URL } from '../api/endpoints';

export class ApiProductRepository implements IProductRepository {
  async getAllProducts(): Promise<Product[]> {
    try {
      const response = await fetch(`${BASE_URL}${API_ENDPOINTS.PRODUCTS}`);
      const data = await response.json();
      return data.map(toProduct);
    } catch (error) {
      console.error('Error fetching all products:', error);
      throw error;
    }
  }

  async getProductById(id: number): Promise<Product | null> {
    try {
      const response = await fetch(`${BASE_URL}${API_ENDPOINTS.PRODUCT_BY_ID(id)}`);
      const data = await response.json();
      return toProduct(data);
    } catch (error) {
      console.error(`Error fetching product with ID ${id}:`, error);
      return null;
    }
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    try {
      const response = await fetch(`${BASE_URL}${API_ENDPOINTS.PRODUCTS_BY_CATEGORY(category)}`);
      const data = await response.json();
      return data.map(toProduct);
    } catch (error) {
      console.error(`Error fetching products for category ${category}:`, error);
      return [];
    }
  }

  async searchProducts(query: string): Promise<Product[]> {
    try {
      const allProducts = await this.getAllProducts();
      return allProducts.filter(product => 
        product.title.toLowerCase().includes(query.toLowerCase()) || 
        product.description.toLowerCase().includes(query.toLowerCase())
      );
    } catch (error) {
      console.error(`Error searching products with query "${query}":`, error);
      return [];
    }
  }
}
