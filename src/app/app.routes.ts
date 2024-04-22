import { Routes } from '@angular/router';
import { ShopComponent } from './Components/shop/shop.component';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { AdminDashboardComponent } from './Components/Admin/admin-dashboard/admin-dashboard.component';
import { AddProductComponent } from './Components/Admin/add-product/add-product.component';

export const routes: Routes = [
  {
    path: 'products',
    children: [
      { path: '', component: ShopComponent },
      { path: ':id', component: ProductDetailsComponent },
      { path: 'category/:category', component: ShopComponent },
    ],
  },
  {
    path: 'admin',
    children: [
      {
        path: '',
        component: AdminDashboardComponent,
      },
      {
        path: 'products',
        children: [
          {
            path: '',
            component: ShopComponent,
          },
          {
            path: 'add',
            component: AddProductComponent,
          },
          { path: 'edit/:id', component: AddProductComponent },
          { path: ':id', component: ProductDetailsComponent },
        ],
      },
    ],
  },
];
