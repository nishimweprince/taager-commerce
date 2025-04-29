import { ApiProductRepository } from '../../adapters/repositories/ApiProductRepository';
import { GetAllProductsUseCase } from '../../domain/usecases/product/GetAllProductsUseCase';
import { GetProductByIdUseCase } from '../../domain/usecases/product/GetProductByIdUseCase';
import { GetProductsByCategoryUseCase } from '../../domain/usecases/product/GetProductsByCategoryUseCase';
import { SearchProductsUseCase } from '../../domain/usecases/product/SearchProductsUseCase';

const productRepository = new ApiProductRepository();

export const createGetAllProductsUseCase = (): GetAllProductsUseCase => {
  return new GetAllProductsUseCase(productRepository);
};

export const createGetProductByIdUseCase = (): GetProductByIdUseCase => {
  return new GetProductByIdUseCase(productRepository);
};

export const createGetProductsByCategoryUseCase =
  (): GetProductsByCategoryUseCase => {
    return new GetProductsByCategoryUseCase(productRepository);
  };

export const createSearchProductsUseCase = (): SearchProductsUseCase => {
  return new SearchProductsUseCase(productRepository);
};
