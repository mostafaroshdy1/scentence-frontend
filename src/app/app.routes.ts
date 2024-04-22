import { Routes } from '@angular/router';
import { HomeComponent } from './home-components/home/home.component';

export const routes: Routes = [
	{ path: '', component: HomeComponent },
	// TODO: add the error component
	// { path: '**', component: ErrorComponent },
];
