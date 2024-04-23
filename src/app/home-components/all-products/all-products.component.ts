import { Component } from '@angular/core';

@Component({
	selector: 'app-all-products',
	standalone: true,
	imports: [],
	templateUrl: './all-products.component.html',
	styleUrl: './all-products.component.css',
})
export class AllProductsComponent {
	changeProduct(e: Event, type: string) {
		const productBtns: NodeListOf<HTMLElement> | null =
			document.querySelectorAll('.filter-btns > button');
		productBtns.forEach((btn: HTMLElement) => {
			btn.classList.remove('active');
		});

		const currentElement = e.target as HTMLElement;
		currentElement.classList.add('active');
	}
}
