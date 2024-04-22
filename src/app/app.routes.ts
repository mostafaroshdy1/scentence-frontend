import { Routes } from '@angular/router';
import { ShopComponent } from './Components/shop/shop.component';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { DisplayedProductsComponent } from './Components/displayed-products/displayed-products.component';

export const routes: Routes = [
  {
    path: 'products',
    children: [
      { path: '', component: ShopComponent },
      { path: ':id', component: ProductDetailsComponent },
      { path: 'category/:category', component: ShopComponent },
    ],
  },
];
