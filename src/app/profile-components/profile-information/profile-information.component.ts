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
import { MessageSuccessComponent } from '../../message-success/message-success.component';

@Component({
	selector: 'app-profile-information',
	standalone: true,
	imports: [ReactiveFormsModule, HttpClientModule, MessageSuccessComponent],
	providers: [ProfileInformationService],
	templateUrl: './profile-information.component.html',
	styleUrl: './profile-information.component.css',
})
export class ProfileInformationComponent implements OnInit {
	constructor(
		private router: Router,
		private profileInfoService: ProfileInformationService,
	) {}
	message = {
		status: '',
		text: '',
	};
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
		const messageElement = document.querySelector('[data-message]');
		messageElement?.classList.remove('translate-x-[1500px]');

		if (this.checkForm.valid) {
			const { email, password } = this.checkForm.value;
			if (this.userInfo.email !== email && email) {
				this.profileInfoService.updateEmail(email).subscribe({
					next: (data: any) => {
						localStorage.setItem('token', `${data.token}`);
						const { id, email, role } = jwtDecode.jwtDecode<any>(data.token);
						localStorage.setItem('id', id);
						localStorage.setItem('email', email);
						localStorage.setItem('role', role);
						this.message.status = 'success';
						this.message.text = 'Email Updated Successfully';
					},
					error: (err) => {
						console.log(err);
						this.message.status = 'fail';
						this.message.text = 'error in updating user email';
					},
					complete: () => {
						setTimeout(() => {
							messageElement?.classList.add('translate-x-[1500px]');
						}, 2000);
					},
				});
			}

			if (password) {
				this.profileInfoService.updatePassword(password).subscribe({
					next: (data: any) => {
						this.message.status = 'success';
						this.message.text = 'Password Updated Successfully';
					},
					error: (err) => {
						console.log(err);
						this.message.status = 'fail';
						this.message.text = 'error in updating user password';
					},
					complete: () => {
						setTimeout(() => {
							messageElement?.classList.add('translate-x-[1500px]');
						}, 2000);
					},
				});
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
