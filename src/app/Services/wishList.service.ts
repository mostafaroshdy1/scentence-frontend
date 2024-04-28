import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WishListService {
  constructor(private http: HttpClient, private router: Router) {}

  private url = `${environment.apiUrl}/wishlist`;

  addToWishList(productId: string): Observable<any> {
    return this.http.post<any>(`${this.url}`, { productId });
  }
  getWishList(): Observable<any> {
    const jwtToken = localStorage.getItem('token');
    if (!jwtToken) {
      this.router.navigate(['/login']);
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${jwtToken}`,
    });
    return this.http.get(this.url, { headers: headers });
  }
  clearWishList() {
    return this.http.delete(this.url);
  }
  updateWishList(wishList: any) {
    return this.http.put(this.url, wishList);
  }
}
