import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MessageSuccessComponent } from '../message-success/message-success.component';
import { finalize } from 'rxjs';
import { LogoutService } from '../Services/logout.service';
@Component({
	selector: 'app-login',
	standalone: true,
	imports: [ReactiveFormsModule, HttpClientModule, RouterModule, MessageSuccessComponent],
	providers: [AuthService],
	templateUrl: './login.component.html',
	styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
	constructor(
		private authService: AuthService,
		private router: Router,
		private logoutService: LogoutService
	) {}
	checkForm = new FormGroup(
		{
			email: new FormControl('', [Validators.email, Validators.required]),
			password: new FormControl('', [Validators.minLength(6), Validators.required]),
		},
		{ updateOn: 'change' },
	);

	message = {
		status: '',
		text: '',
	};

	ngOnInit(): void {
		const token = localStorage.getItem('token');
		if (token) {
			this.handleToken(token);
		}
	}

	private decodeToken(token: string): any {
		console.log('token ' + token);
		const decodedToken = JSON.parse(atob(token.split('.')[1]));
		console.log('decoded: ', decodedToken);
		return decodedToken;
	}

	checkData(e: Event) {
		e.preventDefault();
		const messageElement = document.querySelector('[data-message]');
    
		messageElement?.classList.remove('translate-x-[1500px]');
		if (this.checkForm.valid) {
			const { email, password } = this.checkForm.value;
			this.authService
				.login(email, password)
				.pipe(
					finalize(() => {
						setTimeout(() => {
							messageElement?.classList.add('translate-x-[1500px]');
						}, 2000);
					}),
				)
				.subscribe({
					next: (response) => {
						console.log('Login successful:', response);
						localStorage.setItem('token', `${response.token}`);
						const decodedToken = this.decodeToken(response.token);
						//           localStorage.setItem('role', decodedToken.role);
						localStorage.setItem('id', decodedToken.id);
						localStorage.setItem('email', decodedToken.email);
						this.logoutService.setLogout(true);
						//           if (decodedToken.role === 'admin') {
						//             this.router.navigate(['/admin']);
						//           } else {
						//             this.router.navigate(['/products']);
						//           }
						this.handleToken(response.token);
						this.message.status = 'success';
						this.message.text = 'Login Successed';
					},
					error: (error) => {
						console.error('Login failed:', error);
						this.message.status = 'fail';
						this.message.text = "The Email or password doesn't match";
					},
				});
		} else {
			console.log('Form is invalid');
		}
	}

	private handleToken(token: string): void {
		const decodedToken = this.decodeToken(token);
		if (decodedToken.role === 'user') {
			this.router.navigate(['/products']);
		} else {
			this.router.navigate(['/admin']);
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
