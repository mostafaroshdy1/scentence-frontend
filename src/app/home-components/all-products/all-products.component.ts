import { Component } from '@angular/core';
import { HeaderParagraphComponent } from '../header-paragraph/header-paragraph.component';

@Component({
	selector: 'app-all-products',
	standalone: true,
	imports: [HeaderParagraphComponent],
	templateUrl: './all-products.component.html',
	styleUrl: './all-products.component.css',
})
export class AllProductsComponent {
	text: { header: string; paragraph: string } = {
		header: 'All Products',
		paragraph:
			'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical',
	};

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
