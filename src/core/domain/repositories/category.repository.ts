export interface ICategoryRepository {
  getAllCategories(): Promise<string[]>;
}
