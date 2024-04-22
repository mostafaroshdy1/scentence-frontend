import { Product } from './product.model';

export interface getAllProductsDto {
  currentPage: number;
  totalPages: number;
  totalProducts: number;
  products: Product[];
}
