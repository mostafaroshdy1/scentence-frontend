import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-image-zoomin',
	standalone: true,
	imports: [],
	templateUrl: './image-zoomin.component.html',
	styleUrl: './image-zoomin.component.css',
})
export class ImageZoominComponent {
	@Input() img!: string;
}
