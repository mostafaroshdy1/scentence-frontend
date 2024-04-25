import { Routes } from '@angular/router';
import { ShopComponent } from './Components/shop/shop.component';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { AdminDashboardComponent } from './Components/Admin/admin-dashboard/admin-dashboard.component';
import { AddProductComponent } from './Components/Admin/add-product/add-product.component';
import { AdminManageUsersComponent } from './Components/Admin/admin-manage-users/admin-manage-users.component';
import { DisplayUserDetailsComponent } from './Components/Admin/display-user-details/display-user-details.component';
import {
  AdminAuthGuard,
  AuthGuardService,
} from './Services/auth-guard.service';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
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
    canActivate: [AuthGuardService],
    children: [
      {
        path: '',
        component: AdminDashboardComponent,
      },
      {
        path: 'products',
        children: [
          { path: '', component: ShopComponent },
          { path: 'add', component: AddProductComponent },
          { path: 'edit/:id', component: AddProductComponent },
          { path: ':id', component: ProductDetailsComponent },
        ],
      },
      {
        path: 'users',
        children: [
          {
            path: '',
            canActivate: [AuthGuardService],
            component: AdminManageUsersComponent,
          },
          {
            path: ':id',
            canActivate: [AuthGuardService],
            component: DisplayUserDetailsComponent,
          },
        ],
      },
    ],
  },
];
