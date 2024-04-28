import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiProductsService {
  constructor(private http: HttpClient) {}

  url = `${environment.apiUrl}/products`;

  getProductById(id: string) {
    return this.http.get(`${this.url}/${id}`);
  }
}
