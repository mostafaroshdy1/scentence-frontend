import { AfterViewInit, Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'app-slider',
	standalone: true,
	imports: [FontAwesomeModule],
	templateUrl: './slider.component.html',
	styleUrl: './slider.component.css',
})
export class SliderComponent implements AfterViewInit {
	icons = {
		arrowLeftIcon: faAngleLeft,
		arrowRightIcon: faAngleRight,
	};

	left!: HTMLElement | null;
	right!: HTMLElement | null;
	sliderContainer!: HTMLElement | null;
	sliderBtns!: NodeListOf<HTMLElement> | null;

	eleIndex: number = 0;

	imgs: string[] = [
		'https://odour-demo.myshopify.com/cdn/shop/files/03_slider-image.png?v=1614298669',
		'https://odour-demo.myshopify.com/cdn/shop/files/01_slider_image.png?v=1614298669',
		'https://odour-demo.myshopify.com/cdn/shop/files/02_slider_iamge.png?v=1614298669',
	];

	headers: string[] = ['Best Perfume', 'Fragrances', '20% Sell Off'];

	paragraphs: string[] = [
		'Adipisicing dolor corrupti ratione sunt atque. Qui corporis quam repellendus et perferendis',
		'Adipisicing dolor corrupti ratione sunt atque. Qui corporis quam repellendus et perferendis',
		'Adipisicing dolor corrupti ratione sunt atque. Qui corporis quam repellendus et perferendis',
	];

	constructor() {}
	ngAfterViewInit(): void {
		this.left = document?.querySelector('.left');
		this.right = document?.querySelector('.right');
		this.sliderContainer = document?.querySelector('.slider-container');
		this.sliderBtns = document?.querySelectorAll('.slider-btn');
	}

	changeComponent(status: string) {
		switch (status) {
			case 'increase': {
				this.eleIndex++;
				break;
			}
			case 'decrease': {
				this.eleIndex--;
				break;
			}
		}

		this.eleIndex = this.eleIndex < 0 ? this.imgs.length - 1 : this.eleIndex;
		this.eleIndex = this.eleIndex > this.imgs.length - 1 ? 0 : this.eleIndex;

		this.displayComponent();
	}

	displayBtns(status: string) {
		this.sliderBtns?.forEach((btn) => {
			switch (status) {
				case 'show': {
					btn.classList.remove('hidden-item');
					btn.classList.add('show-item');
					break;
				}
				case 'hide': {
					btn.classList.add('hidden-item');
					btn.classList.remove('show-item');
					break;
				}
			}
		});
	}

	displayComponent() {
		if (this.left && this.right) {
			this.left.classList.add('fade-in');
			this.right.classList.add('fade-in');
		}
		this.sliderContainer?.addEventListener('animationend', () => {
			if (this.left && this.right) {
				this.left.classList.remove('fade-in');
				this.right.classList.remove('fade-in');
			}
		});
	}
}
