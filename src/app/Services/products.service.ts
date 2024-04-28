import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { getAllProductsDto } from '../Models/get-all-products.dto';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private readonly http: HttpClient) {}

  private readonly URL_DB = 'http://localhost:3000/products';

  getAllProducts(
    page: number = 1,
    limit: number = 9,
    sortBy: number = 0,
    searchedWord: string = '',
    category: string = ''
  ): Observable<getAllProductsDto> {
    const paramsPage = page;
    const paramsLimit = limit;
    const paramsSortBy = sortBy;
    const paramsSearchedWord = searchedWord;

    const params = new HttpParams()
      .set('page', paramsPage)
      .set('limit', paramsLimit)
      .set('sortBy', paramsSortBy)
      .set('search', paramsSearchedWord);

    if (category) {
      return this.http.get<getAllProductsDto>(
        `${this.URL_DB}/category/${category}`,
        {
          params,
        }
      );
    }

    return this.http.get<getAllProductsDto>(this.URL_DB, { params });
  }
  getProductById(id: string) {
    return this.http.get(`${this.URL_DB}/${id}`);
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
  getCategoryProductCounts(): Observable<any> {
    return this.http.get<any>(this.URL_DB + '/categoryCount');
  }
}
