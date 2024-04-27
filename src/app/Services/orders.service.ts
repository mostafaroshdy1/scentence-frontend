import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private readonly http: HttpClient, private router: Router) {}

  private readonly URL_DB = `${environment.apiUrl}/orders`;

  getUserOrders() {
    return this.http.get(this.URL_DB);
  }
  getOrderDetails(id: any) {
    return this.http.get<any>(`${this.URL_DB}/${id}`);
  }
  cancelOrder(id: any) {
    return this.http.put<any>(`${this.URL_DB}/cancel/${id}`, {});
  }
  createOrder(formData: any) {
    const requestData = {
      apartment: formData.apartment,
      floor: formData.floor,
      building: formData.building,
      street: formData.street,
      Area: formData.Area,
      city: formData.city,
      secondPhone: formData.secondPhone,
      paymentMethod: formData.paymentMethod,
      extra: formData.extra,
      total: formData.total,
    };
    return this.http.post<any>(this.URL_DB, requestData);
  }
  reOrder(id: any) {
    return this.http.post<any>(`${this.URL_DB}/reOrder/${id}`, {});
  }
  makeDiscount(promoData: any) {
    return this.http.post<any>(`${this.URL_DB}/discount`, promoData);
  }
  updateOrderStatus(id: any, status: any) {
    return this.http.put<any>(`${this.URL_DB}/${id}`, { status });
  }
}
