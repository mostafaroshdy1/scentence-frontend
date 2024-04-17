import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
	selector: 'app-navbar-links',
	standalone: true,
	imports: [RouterModule],
	templateUrl: './navbar-links.component.html',
	styleUrl: './navbar-links.component.css',
})
export class NavbarLinksComponent {
	links: any[] = [
		{ name: 'home', link: '/' },
		{ name: 'shop', link: '/shop' },
		{ name: 'product', link: '/product' },
		{ name: 'blog', link: '/blog' },
		{ name: 'about us', link: '/about-us' },
		{ name: 'contact', link: '/contact' },
	];
}
