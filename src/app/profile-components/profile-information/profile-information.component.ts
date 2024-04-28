import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
	selector: 'app-profile-information',
	standalone: true,
	imports: [ReactiveFormsModule],
	templateUrl: './profile-information.component.html',
	styleUrl: './profile-information.component.css',
})
export class ProfileInformationComponent {
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

		if (this.checkForm.valid) {
			const { email, password } = this.checkForm.value;
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
