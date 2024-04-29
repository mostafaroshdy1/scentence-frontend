import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-header-paragraph',
	standalone: true,
	imports: [],
	templateUrl: './header-paragraph.component.html',
	styleUrl: './header-paragraph.component.css',
})
export class HeaderParagraphComponent {
	@Input() text!: { header: string; paragraph: string };
}
