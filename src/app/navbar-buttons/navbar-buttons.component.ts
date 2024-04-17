import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
	faBagShopping,
	faGear,
	faMagnifyingGlass,
	faCircleXmark,
} from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'app-navbar-buttons',
	standalone: true,
	imports: [FontAwesomeModule],
	templateUrl: './navbar-buttons.component.html',
	styleUrl: './navbar-buttons.component.css',
})
export class NavbarButtonsComponent {
	showForm: string = 'hidden-item';

	icons = {
		search: faMagnifyingGlass,
		cart: faBagShopping,
		settings: faGear,
		icon: faMagnifyingGlass,
	};

	changeIcon(e: Event) {
		this.icons.icon = this.icons.icon === faMagnifyingGlass ? faCircleXmark : faMagnifyingGlass;
		this.showForm = this.showForm === 'hidden-item' ? 'show-item' : 'hidden-item';
	}
}
