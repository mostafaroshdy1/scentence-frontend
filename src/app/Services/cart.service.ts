import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient, private router: Router) {}

  private url = `${environment.apiUrl}/cart`;

  addToCart(productId: string, qty: number): Observable<any> {
    return this.http.post<any>(`${this.url}`, { productId, qty });
  }
  getCart() {
    return this.http.get(this.url);
  }
  clearCart() {
    const jwtToken = localStorage.getItem('token');
    if (!jwtToken) {
      this.router.navigate(['/login']);
      // throw new Error('invalid Token');
    }
    return this.http.delete(this.url);
  }
  updateCart(cart: any) {
    const jwtToken = localStorage.getItem('token');
    if (!jwtToken) {
      this.router.navigate(['/login']);
      // throw new Error('invalid Token');
    }
    return this.http.put(this.url, cart);
  }
}
