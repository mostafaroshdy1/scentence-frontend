import { Routes } from '@angular/router';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { DescriptionForProductComponent } from './Components/about-product-details/description-for-product/description-for-product.component';
import { ReviewsComponent } from './Components/about-product-details/reviews/reviews.component';
import { ShippingPolicyComponent } from './Components/about-product-details/shipping-policy/shipping-policy.component';

export const routes: Routes = [
  {path:'products',children:[
    {path:':id',component:ProductDetailsComponent}
  ]},
];
