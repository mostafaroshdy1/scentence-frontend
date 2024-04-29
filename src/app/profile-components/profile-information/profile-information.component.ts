import { HttpClientModule } from '@angular/common/http';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {
	AbstractControl,
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	ValidatorFn,
	Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileInformationService } from '../../Services/profile-information.service';
import * as jwtDecode from 'jwt-decode';

@Component({
	selector: 'app-profile-information',
	standalone: true,
	imports: [ReactiveFormsModule, HttpClientModule],
	providers: [ProfileInformationService],
	templateUrl: './profile-information.component.html',
	styleUrl: './profile-information.component.css',
})
export class ProfileInformationComponent implements OnInit {
	constructor(
		private router: Router,
		private profileInfoService: ProfileInformationService,
	) {}

	userInfo!: any;
	ngOnInit(): void {
		this.profileInfoService.getProfileInformation().subscribe({
			next: (data) => {
				this.userInfo = data;
				this.userInfo = this.userInfo.User;
				console.log(this.userInfo);

				const email = this.userInfo?.email ? this.userInfo.email : '';
				this.checkForm.controls.email.setValue(email);
			},
		});
	}

	checkForm = new FormGroup(
		{
			email: new FormControl('', [Validators.email, Validators.required]),
			password: new FormControl('', [Validators.minLength(6)]),
			confirmPassword: new FormControl('', [Validators.minLength(6)]),
		},
		{ updateOn: 'change', validators: passwordMatchValidator('password', 'confirmPassword') },
	);

	checkData(e: Event) {
		e.preventDefault();
		console.log(this.checkForm.errors, this.checkForm.valid);

		if (this.checkForm.valid) {
			const { email, password } = this.checkForm.value;
			if (this.userInfo.email !== email && email) {
				this.profileInfoService.updateEmail(email).subscribe({
					next: (data: any) => {
						console.log(data);
						localStorage.setItem('token', `Bearer ${data.token}`);
						const { id, email, role } = jwtDecode.jwtDecode<any>(data.token);
						console.log(id, email, role);
						localStorage.setItem('id', id);
						localStorage.setItem('email', email);
						localStorage.setItem('role', role);
					},
					error: (err) => {
						console.log(err);
					},
				});
			}

			if (password) {
				this.profileInfoService.updatePassword(password).subscribe();
			}
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

export function passwordMatchValidator(controlName: string, matchingControlName: string): any {
	return (formGroup: FormGroup): { [key: string]: any } | null => {
		const control = formGroup.controls[controlName];
		const matchingControl = formGroup.controls[matchingControlName];

		// Return null if controls haven't been initialized yet
		if (!control || !matchingControl) {
			return null;
		}

		// Return null if validation passes
		if (matchingControl.errors && !matchingControl.errors['passwordMismatch']) {
			return null;
		}

		// Set error if passwords don't match
		if (control.value !== matchingControl.value) {
			matchingControl.setErrors({ passwordMismatch: true });
			return { passwordMismatch: true };
		} else {
			matchingControl.setErrors(null);
			return null;
		}
	};
}
