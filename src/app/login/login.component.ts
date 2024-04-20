import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [ReactiveFormsModule],
	templateUrl: './login.component.html',
	styleUrl: './login.component.css',
})
export class LoginComponent {
	constructor(private router: Router) {}

	checkForm = new FormGroup(
		{
			email: new FormControl('', [Validators.email, Validators.required]),
			password: new FormControl('', [Validators.minLength(6), Validators.required]),
		},
		{ updateOn: 'change' },
	);

	checkData(e: Event) {
		e.preventDefault();
		console.log(
			this.checkForm.controls.email.dirty,
			this.checkForm.controls.email.touched,
			this.checkForm.controls.password,
		);

		if (this.emailValid && this.passwordValid) {
			console.log('Valid data');
			// this.router.navigate(['/']);
		} else {
			console.log('Invalid data');
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
