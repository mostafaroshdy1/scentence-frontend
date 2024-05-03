import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ContactusService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  sendContactMessage(data: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/contact-us-email`, data);
  }
}
