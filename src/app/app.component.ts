import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CheckoutComponent } from './Components/checkout/checkout.component';
import { OrdersHistoryComponent } from './Components/orders-history/orders-history.component';
import { OrderDetailsComponent } from './Components/order-details/order-details.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CheckoutComponent,OrdersHistoryComponent,OrderDetailsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ecommerce';
}
