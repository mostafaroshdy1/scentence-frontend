import { Component, OnInit } from '@angular/core';
import { HeaderParagraphComponent } from '../header-paragraph/header-paragraph.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductsService } from '../../Services/products.service';
import { HttpClientModule } from '@angular/common/http';
import { OneProductComponent } from '../../Components/one-product/one-product.component';

@Component({
	selector: 'app-all-products',
	standalone: true,
	imports: [HeaderParagraphComponent, HttpClientModule, RouterModule, OneProductComponent],
	providers: [ProductsService],
	templateUrl: './all-products.component.html',
	styleUrl: './all-products.component.css',
})
export class AllProductsComponent implements OnInit {
	constructor(
		private productService: ProductsService,
		private router: Router,
	) {}

	products: any;
	ngOnInit(): void {
		this.productService.getAllProducts(1).subscribe({
			next: (data) => {
				this.products = data.products;
				console.log(this.products);
			},
			error: (err) => console.log(err),
		});
	}

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

	goToProduct(event: Event, productId: any): void {
		const target = event.target as HTMLElement;
		if (!target.classList.contains('button') && !target.classList.contains('icon')) {
			this.router.navigate(['/products/', productId]);
		}
	}
}
