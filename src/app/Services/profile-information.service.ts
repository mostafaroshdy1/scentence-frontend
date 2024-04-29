import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class ProfileInformationService {
	constructor(private readonly http: HttpClient) {}
	//TODO: remove the default id value and token when merge
	ID = localStorage.getItem('id') || '6627f68b850586c6e27bfb9e';
	private readonly URL: string = `http://localhost:3000`;

	getProfileInformation() {
		return this.http.get(`${this.URL}/User/${this.ID}`);
	}

	updateEmail(email: string) {
		return this.http.put(`${this.URL}/User/email`, { email });
	}

	updatePassword(password: string) {
		return this.http.put(`${this.URL}/User/ResetPassword/${this.ID}`, { password });
	}

	updateProfileInformation(form: any) {
		return this.http.put(`${this.URL}/profile`, form);
	}
}
