import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { BannerComponent } from '../banner/banner.component';
import { CommonModule } from '@angular/common';
import { DescriptionForProductComponent } from '../about-product-details/description-for-product/description-for-product.component';
import { ReviewsComponent } from '../about-product-details/reviews/reviews.component';
import { ShippingPolicyComponent } from '../about-product-details/shipping-policy/shipping-policy.component';
import { OneProductComponent } from '../one-product/one-product.component';
import { ProductsService } from '../../Services/products.service';

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
    OneProductComponent,
  ],
  providers: [ProductsService],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent {
  constructor(private apiService: ProductsService, private router: Router) {}
  productDetails: any;
  allProducts: any;
  result: any;
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

    this.apiService.getAllProducts().subscribe({
      next: (data: any) => {
        this.result = data;
        this.allProducts = this.result.products;
      },
      error: (error: any) => {
        console.log(error);
      },
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
