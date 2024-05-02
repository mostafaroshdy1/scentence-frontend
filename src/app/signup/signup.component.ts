import { Component } from '@angular/core';
import {
	FormGroup,
	FormControl,
	ReactiveFormsModule,
	Validators,
	ValidatorFn,
	AbstractControl,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs';
import { MessageSuccessComponent } from '../message-success/message-success.component';

@Component({
	selector: 'app-signup',
	imports: [ReactiveFormsModule, HttpClientModule, CommonModule, MessageSuccessComponent, RouterModule],
	standalone: true,
	providers: [AuthService],
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
	constructor(
		private authService: AuthService,
		private router: Router,
	) {}

	message = {
		status: '',
		text: '',
	};

	checkForm = new FormGroup(
		{
			email: new FormControl('', [Validators.email, Validators.required]),
			username: new FormControl('', [Validators.required, this.usernameValidator()]),
			password: new FormControl('', [Validators.minLength(6), Validators.required]),
			gender: new FormControl('', Validators.required),
		},
		{ updateOn: 'change' },
	);

	usernameValidator(): ValidatorFn {
		return (control: AbstractControl): { [key: string]: any } | null => {
			const usernamePattern = /^[a-zA-Z0-9]+$/; // Regular expression to match letters and numbers only
			const isValid = usernamePattern.test(control.value);
			return isValid ? null : { invalidUsername: { value: control.value } };
		};
	}
	checkData(e: Event) {
		e.preventDefault();
		const messageElement = document.querySelector('[data-message]');
		messageElement?.classList.remove('translate-x-[1500px]');
		if (this.checkForm.valid) {
			this.authService
				.signup(this.checkForm.value)
				.pipe(
					finalize(() => {
						setTimeout(() => {
							messageElement?.classList.add('translate-x-[1500px]');
						}, 2000);
					}),
				)
				.subscribe(
					(response) => {
						console.log('Signup successful:', response);
						this.router.navigate(['/login']);
						this.message.status = 'success';
						this.message.text = 'Signup Successed';
					},
					(error) => {
						console.error('Signup failed:', error);
						this.message.status = 'fail';
						this.message.text = 'There is an error while signup';
					},
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
