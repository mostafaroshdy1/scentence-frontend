import { Routes } from '@angular/router';
import { OrderDetailsComponent } from './Components/order-details/order-details.component';

export const routes: Routes = [
    { path: 'orders/:id', component: OrderDetailsComponent },
];
