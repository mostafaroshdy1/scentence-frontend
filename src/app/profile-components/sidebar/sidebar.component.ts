import { Component, Input, OnInit } from '@angular/core';
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
	activeClass: string = 'bg-[#4d5257]';
	@Input() userInfo!: any;

	sidebarItems = [
		{ name: 'Email & Passwords', routerLink: '/profile/email', active: true },
		{ name: 'Information', routerLink: '/profile/info' },
		{ name: 'Orders', routerLink: '/profile/orders' },
	];

	changeActiveClass(e: Event) {
		e.stopPropagation();
		const sidebarLinks: NodeListOf<HTMLElement> =
			document.querySelectorAll('[data-sidebar-links] li');
		sidebarLinks.forEach((link) => {
			link.classList.remove(this.activeClass);
		});
		const targetElement = e.currentTarget as HTMLElement;
		targetElement.classList.add(this.activeClass);
	}
}
