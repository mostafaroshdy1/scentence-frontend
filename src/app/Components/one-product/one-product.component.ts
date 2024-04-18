import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-one-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './one-product.component.html',
  styleUrl: './one-product.component.css',
})
export class OneProductComponent {
  @Input() product: any;
}
