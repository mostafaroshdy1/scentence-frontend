import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private readonly http: HttpClient) {}

  private readonly URL_DB = 'http://localhost:3000/products';

  getAllProducts() {
    return this.http.get(this.URL_DB);
  }
  getProductById(id: number) {
    return this.http.get(this.URL_DB + '/' + id);
  }
  createProduct(product: any) {
    return this.http.post(this.URL_DB, product);
  }
  updateProductById(id: number, product: any) {
    return this.http.put(this.URL_DB + '/' + id, product);
  }
  deleteProductById(id: number) {
    return this.http.delete(this.URL_DB + '/' + id);
  }
  searchProduct() {
    return this.http.get(this.URL_DB);
  }
}
