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
	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		// throw new Error('Method not implemented.');
		// TODO: take the token from the local storage
		// const token: any = localStorage.getItem('token');
		const headers = new HttpHeaders({
			Authorization:
				'jwtbearetoken eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MjY0NjQ4YTJlMTg2MmI3ZWY2OWVhZiIsImVtYWlsIjoiYmVsYWwxMkBnbWFpbC5jb20iLCJpYXQiOjE3MTM3ODQzOTQsImV4cCI6MTcyOTMzNjM5NH0.kbQk8yKEcj66Y5ey30snfJB7fnBI3UOkZhOtVC9iBDQ',
			// token
		});
		req = req.clone({ headers: headers });
		return next.handle(req);
	}
}
