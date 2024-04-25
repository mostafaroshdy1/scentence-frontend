import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}
  checkForm = new FormGroup(
    {
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [
        Validators.minLength(6),
        Validators.required,
      ]),
    },
    { updateOn: 'change' }
  );

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.decodeToken(token);
      localStorage.setItem('role', decodedToken.role);
      if (decodedToken.role === 'admin') {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/products']);
      }
    }
  }
  private decodeToken(token: string): any {
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    return decodedToken;
  }

  checkData(e: Event) {
    e.preventDefault();

    // console.log(
    // 	this.checkForm.controls.email.dirty,
    // 	this.checkForm.controls.email.touched,
    // 	this.checkForm.controls.password,
    // );

    // if (this.emailValid && this.passwordValid) {
    // 	console.log('Valid data');
    // 	// this.router.navigate(['/']);
    // } else {
    // 	console.log('Invalid data');
    // }

    if (this.checkForm.valid) {
      const { email, password } = this.checkForm.value;
      this.authService.login(email, password).subscribe({
        next: (response) => {
          console.log('Login successful:', response);
          localStorage.setItem('token', response.token);
          const decodedToken = this.decodeToken(response.token);
          localStorage.setItem('role', decodedToken.role);
          if (decodedToken.role === 'admin') {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/products']);
          }
        },
        error: (error) => {
          console.error('Login failed:', error);
        },
      });
    } else {
      console.log('Form is invalid');
    }
  }

  get emailChanged(): boolean {
    const email = this.checkForm.controls.email;
    return email.dirty && email.touched;
  }

  get passwordChanged(): boolean {
    const password = this.checkForm.controls.password;
    return password.dirty && password.touched;
  }

  get emailValid(): boolean {
    return this.checkForm.controls.email.valid;
  }
  get passwordValid(): boolean {
    return this.checkForm.controls.password.valid;
  }
}
