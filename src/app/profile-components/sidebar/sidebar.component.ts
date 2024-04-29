import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
	selector: 'app-sidebar',
	standalone: true,
	imports: [FontAwesomeModule, RouterModule],
	templateUrl: './sidebar.component.html',
	styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {
	constructor(private route: ActivatedRoute) {}
	routeLink?: string;
	sidebarItems!: any;
	ngOnInit(): void {
		this.routeLink = this.route.snapshot.firstChild?.url.join('/');
		this.sidebarItems = [
			{
				name: 'Email & Passwords',
				routerLink: '/profile/email',
				active: this.routeLink === 'email',
			},
			{ name: 'Information', routerLink: '/profile/info', active: this.routeLink === 'info' },
			{ name: 'Orders', routerLink: '/profile/orders', active: this.routeLink === 'orders' },
		];
	}

	activeClass: string = 'bg-[#4d5257]';
	@Input() userInfo!: any;

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
