import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators,ValidatorFn ,AbstractControl} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { HttpClientModule } from '@angular/common/http';
import {CommonModule} from '@angular/common'

@Component({
	selector: 'app-signup',
	imports: [ReactiveFormsModule,HttpClientModule,CommonModule],
	standalone: true,
	providers:[AuthService],
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
	constructor(private authService: AuthService, private router: Router) {}

	checkForm = new FormGroup(
		{
			email: new FormControl('', [Validators.email, Validators.required]),
			username: new FormControl('', [Validators.required,this.usernameValidator()]),
			password: new FormControl('', [Validators.minLength(6), Validators.required]),
			gender: new FormControl('', Validators.required)
		},
		{ updateOn: 'change' },
	);

	usernameValidator(): ValidatorFn {
		return (control: AbstractControl): { [key: string]: any } | null => {
		  const usernamePattern = /^[a-zA-Z0-9]+$/; // Regular expression to match letters and numbers only
		  const isValid = usernamePattern.test(control.value);
		  return isValid ? null : { 'invalidUsername': { value: control.value } };
		};
	  }
	checkData(e: Event) {
		e.preventDefault();

		if (this.checkForm.valid) {
			this.authService.signup(this.checkForm.value).subscribe(
				(response) => {
					console.log('Signup successful:', response);
					this.authService.setToken(response.token);
				},
				(error) => {
					console.error('Signup failed:', error);
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

	get usernameChanged(): boolean {
		const username = this.checkForm.controls.username;
		return username.dirty && username.touched;
	}

	get passwordChanged(): boolean {
		const password = this.checkForm.controls.password;
		return password.dirty && password.touched;
	}

	get genderChanged(): boolean {
		const gender = this.checkForm.controls.gender;
		return gender.dirty && gender.touched;
	}

	get emailValid(): boolean {
		return this.checkForm.controls.email.valid;
	}

	get usernameValid(): boolean {
		return this.checkForm.controls.username.valid;
	}

	get passwordValid(): boolean {
		return this.checkForm.controls.password.valid;
	}

	get genderValid(): boolean {
		return this.checkForm.controls.gender.valid;
	}
}
