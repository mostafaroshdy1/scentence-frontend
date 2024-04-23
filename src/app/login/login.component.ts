import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [ReactiveFormsModule,HttpClientModule],
	providers:[AuthService],
	templateUrl: './login.component.html',
	styleUrl: './login.component.css',
})

export class LoginComponent {
	constructor(private authService: AuthService, private router: Router) {}
	checkForm = new FormGroup(
		{
			email: new FormControl('', [Validators.email, Validators.required]),
			password: new FormControl('', [Validators.minLength(6), Validators.required]),
		},
		{ updateOn: 'change' },
	);

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

		if(this.checkForm.valid){
			const  {email,password} = this.checkForm.value;
			this.authService.login(email, password).subscribe(
				(response) => {
				  console.log('Login successful:', response);
				  this.authService.setToken(response.token);
				//   this.router.navigate(['/dashboard']);
				},
				(error) => {
				  console.error('Login failed:', error);
				}
			  );
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
