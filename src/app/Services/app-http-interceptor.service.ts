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
	token =
		localStorage.getItem('token') ||
		'jwtbearetoken eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MjdmNjhiODUwNTg2YzZlMjdiZmI5ZSIsImVtYWlsIjoiYmVsYWwxMkBnbWFpbC5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTcxNDMwMzg5OCwiZXhwIjoxNzI5ODU1ODk4fQ.vJa7WcYl0KKQxu4oNejzem3DqufEMt_2d5OsOOg_RXA';

	constructor() {}
	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		// throw new Error('Method not implemented.');
		// TODO: take the token from the local storage
		// const token: any = localStorage.getItem('token');
		const headers = new HttpHeaders({
			Authorization: this.token,
			// token
		});
		req = req.clone({ headers: headers });
		return next.handle(req);
	}
}
