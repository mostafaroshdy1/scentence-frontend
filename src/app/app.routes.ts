import { Routes } from '@angular/router';

import { AllProductsComponent } from './Components/all-products/all-products.component';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { AdminDashboardComponent } from './Components/Admin/admin-dashboard/admin-dashboard.component';
import { AddProductComponent } from './Components/Admin/add-product/add-product.component';

export const routes: Routes = [
  {
    path: 'products',
    children: [
      { path: '', component: AllProductsComponent },
      { path: ':id', component: ProductDetailsComponent },
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
            component: AllProductsComponent,
          },
          {
            path: 'add',
            component: AddProductComponent,
          },
          { path: 'edit/:id', component: AddProductComponent },
        ],
      },
    ],
  },
];
