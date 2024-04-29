import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { ProfileInformationService } from '../../Services/profile-information.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
	selector: 'app-profile',
	standalone: true,
	imports: [SidebarComponent, RouterModule, HttpClientModule],
	providers: [ProfileInformationService],
	templateUrl: './profile.component.html',
	styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
	constructor(private profileInfoService: ProfileInformationService) {}
	userInfo!: any;
	ngOnInit(): void {
		this.profileInfoService.getProfileInformation().subscribe({
			next: (data) => {
				this.userInfo = data;
				this.userInfo = this.userInfo.User;
			},
		});
	}
}
