import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ProfileInformationService {
  constructor(private readonly http: HttpClient,private router:Router) {}
  ID = localStorage.getItem('id');
  private readonly URL: string = environment.apiUrl;

  getProfileInformation() {
    const jwtToken = localStorage.getItem('token');
    if (!jwtToken) {
      this.router.navigate(['/login']);
    }
    return this.http.get(`${this.URL}/User/${this.ID}`);
  }

  updateEmail(email: string) {
    const jwtToken = localStorage.getItem('token');
    if (!jwtToken) {
      this.router.navigate(['/login']);
    }
    return this.http.put(`${this.URL}/User/email`, { email });
  }

  updatePassword(password: string) {
    const jwtToken = localStorage.getItem('token');
    if (!jwtToken) {
      this.router.navigate(['/login']);
    }
    return this.http.put(`${this.URL}/User/ResetPassword/${this.ID}`, {
      password,
    });
  }

  updateProfileInformation(form: any) {
    const jwtToken = localStorage.getItem('token');
    if (!jwtToken) {
      this.router.navigate(['/login']);
    }
    return this.http.put(`${this.URL}/profile`, form);
  }
}
