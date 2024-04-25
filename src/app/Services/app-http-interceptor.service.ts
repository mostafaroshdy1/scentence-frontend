import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppHttpInterceptorService implements HttpInterceptor {
  constructor() {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // throw new Error('Method not implemented.');
    // TODO: take the token from the local storage
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `jwtbearetoken ${token}`,
      // token
    });
    req = req.clone({ headers: headers });
    return next.handle(req);
  }
}
