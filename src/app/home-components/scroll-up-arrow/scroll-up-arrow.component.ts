import { Component, HostListener } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'app-scroll-up-arrow',
	standalone: true,
	imports: [FontAwesomeModule],
	templateUrl: './scroll-up-arrow.component.html',
	styleUrl: './scroll-up-arrow.component.css',
})
export class ScrollUpArrowComponent {
	arrowUp = faArrowUp;

	display = 'hide';

	@HostListener('window:scroll') displayArrow() {
		console.log('scroll');

		const scrollPosition = window.scrollY;
		const threshold = 100;
		const arrowUpElement = document.querySelector('.arrow-up');

		if (scrollPosition > threshold) {
			arrowUpElement?.classList.remove('hide');
			arrowUpElement?.classList.add('show');
		} else {
			arrowUpElement?.classList.remove('show');
			arrowUpElement?.classList.add('hide');
		}
	}

	scrollUp() {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	}
}
