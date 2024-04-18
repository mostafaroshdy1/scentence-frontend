import { Routes } from '@angular/router';

import { AllProductsComponent } from './Components/all-products/all-products.component';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';


export const routes: Routes = [
  
  {
    path: 'products',
    children: [
  { path: ':id', component: ProductDetailsComponent },
      { path: '', component: AllProductsComponent }],
  },

];
