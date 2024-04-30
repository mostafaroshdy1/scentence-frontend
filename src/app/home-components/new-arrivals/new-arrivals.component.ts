import { Component } from '@angular/core';
import { HeaderParagraphComponent } from '../header-paragraph/header-paragraph.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductsService } from '../../Services/products.service';
import { HttpClientModule } from '@angular/common/http';
import { OneProductComponent } from '../../Components/one-product/one-product.component';

@Component({
	selector: 'app-new-arrivals',
	standalone: true,
	imports: [HeaderParagraphComponent, HttpClientModule, RouterModule, OneProductComponent],
	providers: [ProductsService],
	templateUrl: './new-arrivals.component.html',
	styleUrl: './new-arrivals.component.css',
})
export class NewArrivalsComponent {
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
		header: 'New Arrivals',
		paragraph:
			'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical',
	};

	goToProduct(event: Event, productId: any): void {
		const target = event.target as HTMLElement;
		if (!target.classList.contains('button') && !target.classList.contains('icon')) {
			this.router.navigate(['/products/', productId]);
		}
	}
}
