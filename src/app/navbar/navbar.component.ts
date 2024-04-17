import { Component } from '@angular/core';
import { LogoComponent } from '../logo/logo.component';
import { NavbarButtonsComponent } from '../navbar-buttons/navbar-buttons.component';
import { NavbarLinksComponent } from '../navbar-links/navbar-links.component';

@Component({
	selector: 'app-navbar',
	standalone: true,
	imports: [LogoComponent, NavbarButtonsComponent, NavbarLinksComponent],
	templateUrl: './navbar.component.html',
	styleUrl: './navbar.component.css',
})
export class NavbarComponent {}
