import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiProductsService {
  constructor(private http: HttpClient) {}

  url = 'http://localhost:3000/products';

  getProductById(id: string) {
    return this.http.get(`${this.url}/${id}`);
  }
}
