import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-message-success',
	standalone: true,
	imports: [],
	templateUrl: './message-success.component.html',
	styleUrl: './message-success.component.css',
})
export class MessageSuccessComponent {
	@Input() message!: any;
  @Input() error!:any;

  constructor() {
    console.log(this.message);
    console.log(this.error);
  }

}
