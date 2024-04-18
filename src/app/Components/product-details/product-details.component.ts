import { Component } from '@angular/core';
import { ApiProductsService } from '../../Services/api-products.service';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { BannerComponent } from '../banner/banner.component';
import { CommonModule } from '@angular/common';
import { DescriptionForProductComponent } from '../about-product-details/description-for-product/description-for-product.component';
import { ReviewsComponent } from '../about-product-details/reviews/reviews.component';
import { ShippingPolicyComponent } from '../about-product-details/shipping-policy/shipping-policy.component';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    HttpClientModule,
    BannerComponent,
    CommonModule,
    RouterModule,
    DescriptionForProductComponent,
    ReviewsComponent,
    ShippingPolicyComponent,
  ],
  providers: [ApiProductsService],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent {
  constructor(private apiService: ApiProductsService, private router: Router) {}
  productDetails: any;
  mainImage = '';
  countValue = 0;
  style = '';
  currentComponent: string = 'description';
  ngOnInit(): void {
    this.apiService
      .getProductById(this.router.url.split('/')[2])
      .subscribe((data: any) => {
        this.productDetails = data;
        this.mainImage = this.productDetails.image[3];
      });
  }

  filterImages(images: string[]): string[] {
    return images.filter((image, index) => index !== 4);
  }

  decrement() {
    if (this.countValue > 0) {
      this.countValue--;
    }
  }

  increment() {
    this.countValue++;
  }

  showDescription() {
    this.currentComponent = 'description';
  }

  showReviews() {
    this.currentComponent = 'reviews';
  }

  showShippingPolicy() {
    this.currentComponent = 'shipping-policy';
  }
}
