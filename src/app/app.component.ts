import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AllProductsComponent } from './Components/all-products/all-products.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AllProductsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
