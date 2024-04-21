import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private readonly http: HttpClient) {}

  private readonly URL_DB = 'http://localhost:3000/orders';

  getUserOrders() {
    const token=localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(this.URL_DB, { headers });
  }
  getOrderDetails(id:any) {
    const token=localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.URL_DB}/${id}`, { headers });
  }
  
}

