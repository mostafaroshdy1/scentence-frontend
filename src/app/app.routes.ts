import { Routes } from '@angular/router';
import { OrderDetailsComponent } from './Components/order-details/order-details.component';
import { OrdersHistoryComponent } from './Components/orders-history/orders-history.component';
import { CartComponent } from './cart/cart.component';

export const routes: Routes = [
  { path: 'orders', component: OrdersHistoryComponent },
  { path: 'orders/:id', component: OrderDetailsComponent },
  { path: 'cart', component: CartComponent },
];
