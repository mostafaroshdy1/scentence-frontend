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
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
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
  error: any;
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
        {
          next: (response) => {
            console.log('Signup successful:', response);
						this.router.navigate(['/login']);
						this.message.status = 'success';
						this.message.text = 'Signup Successed';
          },
          error: (err: HttpErrorResponse) => {
            this.message.status = 'fail';
            console.error('Signup failed:', err);
            // this.message.text = 'There is an error while signup';
            if (err.status === 400 && err.error?.message) {
              this.error = err.error.message;
            } else {
              this.error = this.getErrorMessage(err);
            }
            console.log(this.error);
            console.log("STATUS",this.message.status);
          },
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

  private getErrorMessage(error: HttpErrorResponse): string {
    let errorMessage = 'An error occurred';
    if (error.error?.errors?.length > 0) {
      errorMessage = error.error.errors.map((e: any) => e.msg).join('<br>');
    }
    return errorMessage;
  }
}
