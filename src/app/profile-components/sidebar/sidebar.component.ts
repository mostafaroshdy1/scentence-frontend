import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition, faUserMd } from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'app-sidebar',
	standalone: true,
	imports: [FontAwesomeModule, RouterModule],
	templateUrl: './sidebar.component.html',
	styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
	email: IconDefinition = faUserMd;

	sidebarItems = [
		{ name: 'Email & Passwords', routerLink: '/profile/email' },
		{ name: 'Information', routerLink: '/profile/info' },
		{ name: 'Orders', routerLink: '/profile/orders' },
	];
}
