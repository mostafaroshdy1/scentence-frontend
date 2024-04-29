import { Component } from '@angular/core';
import { ImageZoominComponent } from '../../image-zoomin/image-zoomin.component';

@Component({
	selector: 'app-discounts',
	standalone: true,
	imports: [ImageZoominComponent],
	templateUrl: './discounts.component.html',
	styleUrl: './discounts.component.css',
})
export class DiscountsComponent {
	imgs: string[] = [
		'https://odour-demo.myshopify.com/cdn/shop/files/banner_01.png?v=1614298736',
		'https://odour-demo.myshopify.com/cdn/shop/files/banner_02.png?v=1614298733',
		'https://odour-demo.myshopify.com/cdn/shop/files/banner_03.png?v=1614298738',
	];
}
