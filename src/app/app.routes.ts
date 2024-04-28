import { Routes } from '@angular/router';
import { HomeComponent } from './home-components/home/home.component';
import { ProfileComponent } from './profile-components/profile/profile.component';
import { ProfileInformationComponent } from './profile-components/profile-information/profile-information.component';

export const routes: Routes = [
	{ path: '', component: HomeComponent },
	{
		path: 'profile',
		component: ProfileComponent,
		children: [{ path: 'email', component: ProfileInformationComponent }],
	},
	// TODO: add the error component
	// { path: '**', component: ErrorComponent },
];
