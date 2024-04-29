import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
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
	selector: 'app-profile-information-info',
	standalone: true,
	imports: [ReactiveFormsModule, HttpClientModule],
	providers: [ProfileInformationService],
	templateUrl: './profile-information-info.component.html',
	styleUrl: './profile-information-info.component.css',
})
export class ProfileInformationInfoComponent implements OnInit {
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
				const fullName = this.userInfo?.fullName ? this.userInfo.fullName : '';
				const username = this.userInfo?.username ? this.userInfo.username : '';
				let birthDate = this.userInfo?.birthDate ? this.userInfo.birthDate : '';
				birthDate = new Date(birthDate).toISOString().split('T')[0];

				this.checkForm.controls.fullName.setValue(fullName);
				this.checkForm.controls.username.setValue(username);
				this.checkForm.controls.birthDate.setValue(birthDate);
			},
		});
	}
	checkForm = new FormGroup(
		{
			fullName: new FormControl('', [Validators.minLength(3)]),
			username: new FormControl('', [Validators.minLength(3)]),
			birthDate: new FormControl(''),
			photo: new FormControl(''),
		},
		{ updateOn: 'change' },
	);

	checkData(e: Event) {
		e.preventDefault();
		if (this.checkForm.valid) {
			const { fullName, username, birthDate } = this.checkForm.value;
			let photo = document.querySelector('[data-photo]') as HTMLFormElement;
			photo = photo['files'][0];
			console.log(fullName, username, birthDate, photo);

			if (fullName && username && birthDate) {
				this.profileInfoService
					.updateProfileInformation(fullName, username, birthDate, photo)
					.subscribe({
						next: (data: any) => {
							console.log(data);
						},
						error: (err) => {
							console.log(err);
						},
					});
			}
		}
	}

	get fullNameChanged(): boolean {
		const fullName = this.checkForm.controls.fullName;
		return fullName.dirty && fullName.touched;
	}

	get usernameChanged(): boolean {
		const username = this.checkForm.controls.username;
		return username.dirty && username.touched;
	}

	get fullNameValid(): boolean {
		return this.checkForm.controls.fullName.valid;
	}
	get usernameValid(): boolean {
		return this.checkForm.controls.username.valid;
	}
}
