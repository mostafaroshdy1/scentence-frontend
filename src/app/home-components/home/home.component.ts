import { Component } from '@angular/core';
import { SliderComponent } from '../slider/slider.component';
import { DiscountsComponent } from '../discounts/discounts.component';
import { AllProductsComponent } from '../all-products/all-products.component';
import { ImageZoominComponent } from '../../image-zoomin/image-zoomin.component';
import { NewArrivalsComponent } from '../new-arrivals/new-arrivals.component';
import { ScrollUpArrowComponent } from '../scroll-up-arrow/scroll-up-arrow.component';

@Component({
	selector: 'app-home',
	standalone: true,
	imports: [
		SliderComponent,
		DiscountsComponent,
		AllProductsComponent,
		ImageZoominComponent,
		NewArrivalsComponent,
		ScrollUpArrowComponent,
	],
	templateUrl: './home.component.html',
	styles: ``,
})
export class HomeComponent {}
