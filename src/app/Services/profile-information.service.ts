import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class ProfileInformationService {
	constructor(private readonly http: HttpClient) {}
	//TODO: remove the default id value and token when merge
	ID = localStorage.getItem('id') || '6627f68b850586c6e27bfb9e';
	token =
		localStorage.getItem('token') ||
		'jwtbearetoken eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MjdmNjhiODUwNTg2YzZlMjdiZmI5ZSIsImVtYWlsIjoiYmVsYWwxMkBnbWFpbC5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTcxNDMwMzg5OCwiZXhwIjoxNzI5ODU1ODk4fQ.vJa7WcYl0KKQxu4oNejzem3DqufEMt_2d5OsOOg_RXA';
	private readonly URL: string = `http://localhost:3000`;

	getProfileInformation() {
		//TODO: remove the header when merge
		return this.http.get(`${this.URL}/User/${this.ID}`, {
			headers: {
				Authorization: this.token,
			},
		});
	}

	updateEmail(email: string) {
		//TODO: remove the header when merge
		return this.http.put(
			`${this.URL}/User/email`,
			{ email },
			{
				headers: {
					Authorization: this.token,
				},
			},
		);
	}

	updatePassword(password: string) {
		//TODO: remove the header when merge
		return this.http.put(
			`${this.URL}/User/ResetPassword/${this.ID}`,
			{ password },
			{
				headers: {
					Authorization: this.token,
				},
			},
		);
	}

	updateProfileInformation(
		fullName: string,
		username: string,
		birthDate: string,
		image: HTMLFormElement,
	) {
		//TODO: remove the header when merge
		return this.http.put(
			`${this.URL}/profile`,
			{ fullName, username, birthDate, image },
			{
				headers: {
					Authorization: this.token,
				},
			},
		);
	}
}
