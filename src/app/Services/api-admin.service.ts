import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, shareReplay } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiAdminService {
  constructor(private readonly http: HttpClient) {}
  private readonly url = `${environment.apiUrl}/products/`;
  private readonly users_Url = `${environment.apiUrl}/user/`;
  private readonly orders_Url = `${environment.apiUrl}/orders/`;

  // private getTokenHeaders(): HttpHeaders {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     const tokenParts = token.split(' ');
  //     if (tokenParts.length === 2 && tokenParts[0] === 'Bearer') {
  //       const decodedToken = JSON.parse(atob(tokenParts[1]));
  //       return new HttpHeaders({
  //         Authorization: `Bearer ${tokenParts[1]}`,
  //         'Content-Type': 'application/json',
  //       });
  //     } else {
  //       console.log('Invalid token format.');
  //       return new HttpHeaders({
  //         'Content-Type': 'application/json',
  //       });
  //     }
  //   } else {
  //     console.log('Token not found.');
  //     return new HttpHeaders({
  //       'Content-Type': 'application/json',
  //     });
  //   }
  // }

  getAllProducts() {
    return this.http.get(this.url);
  }
  
  countAllProducts() {
    return this.http.get(this.url+'/count');
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
    return this.http.get(this.users_Url);
  }

  getUserById(id: string) {
    return this.http.get(this.users_Url + id);
  }

  deleteUserById(id: number) {
    return this.http.delete(this.users_Url + id);
  }

  countUsers() {
    return this.http.get(this.users_Url + 'count').pipe(
      catchError((error) => {
        console.log('user count error :', error);
        return throwError('Error occurred while fetching user count');
      }),
    );
  }
  getAllOrders() {
    return this.http.get<any>(`${this.orders_Url}/allOrders`);
  }

  countOrders(){
    return this.http.get(this.orders_Url + 'count');
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
