import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiAdminService {
  constructor(private readonly http: HttpClient) {}
  private readonly url = 'http://localhost:3000/products/';
  private readonly users_Url = 'http://localhost:3000/user/';

  private getTokenHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = JSON.parse(atob(token.split(' ')[1]));
      if (decodedToken && decodedToken.role === 'admin') {
        console.log('User is admin');
        localStorage.setItem('role', 'admin');
      } else {
        console.log('User is not admin.');
      }
      return new HttpHeaders({
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      });
    } else {
      console.log('Token not found.');
      return new HttpHeaders({
        'Content-Type': 'application/json',
      });
    }
  }

  getAllProducts() {
    return this.http.get(this.url);
  }

  getProductById(id: string) {
    return this.http.get(`${this.url}/${id}`);
  }

  createProduct(product: any) {
    return this.http
      .post(this.url, product)
      .pipe
      // catchError(this.handleError)
      ();
  }

  updateProductById(id: string, product: any) {
    return this.http.put(this.url + '/' + id, product);
  }

  deleteProductById(id: number) {
    return this.http.delete(this.url + '/' + id);
  }

  countNumberOfProducts() {
    return this.http.get(this.url + 'count');
  }

  getAllUsers() {
    // return this.http.get(this.users_Url);
    return this.http.get(this.users_Url, { headers: this.getTokenHeaders() });
  }

  getUserById(id: string) {
    // return this.http.get(this.users_Url + id);
    return this.http.get(this.users_Url + id, {
      headers: this.getTokenHeaders(),
    });
  }

  deleteUserById(id: number) {
    // return this.http.delete(this.users_Url + id );
    return this.http.delete(this.users_Url + id, {
      headers: this.getTokenHeaders(),
    });
  }

  countUsers() {
    return this.http.get(this.users_Url + 'count');
  }

  // private handleError(error: HttpErrorResponse) {
  //   if (error.error instanceof ErrorEvent) {
  //     console.error('An error occurred:', error.error.message);
  //   } else {
  //     console.error(
  //       `Backend returned code ${error.status}, ` +
  //       `body was:`, error.error);
  //   }
  //   return throwError('Something bad happened; please try again later.');
  // }
}
