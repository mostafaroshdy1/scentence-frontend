import { Component } from '@angular/core';
import { SliderComponent } from '../slider/slider.component';
import { DiscountsComponent } from '../discounts/discounts.component';

@Component({
	selector: 'app-home',
	standalone: true,
	imports: [SliderComponent, DiscountsComponent],
	templateUrl: './home.component.html',
	styles: ``,
})
export class HomeComponent {}
