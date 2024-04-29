import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfileInformationService {
  constructor(private readonly http: HttpClient) {}
  ID = localStorage.getItem('id');
  private readonly URL: string = environment.apiUrl;

  getProfileInformation() {
    return this.http.get(`${this.URL}/User/${this.ID}`);
  }

  updateEmail(email: string) {
    return this.http.put(`${this.URL}/User/email`, { email });
  }

  updatePassword(password: string) {
    return this.http.put(`${this.URL}/User/ResetPassword/${this.ID}`, {
      password,
    });
  }

  updateProfileInformation(form: any) {
    return this.http.put(`${this.URL}/profile`, form);
  }
}
