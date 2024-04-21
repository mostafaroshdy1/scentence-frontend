import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiAdminService {
  constructor(private readonly http: HttpClient) {}
  private readonly url = 'http://localhost:3000/products/';

  getAllProducts() {
    return this.http.get(this.url);
  }

  getProductById(id: string) {
    return this.http.get(`${this.url}/${id}`);
  }

  createProduct(product: any) {
    return this.http.post(this.url, product).pipe(
      // catchError(this.handleError)
    );
  }

  updateProductById(id: string, product: any) {
    return this.http.put(this.url + '/' + id, product);
  }

  deleteProductById(id: number) {
    return this.http.delete(this.url + '/' + id);
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
