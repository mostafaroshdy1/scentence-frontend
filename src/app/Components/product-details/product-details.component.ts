import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { BannerComponent } from '../banner/banner.component';
import { CommonModule } from '@angular/common';
import { DescriptionForProductComponent } from '../about-product-details/description-for-product/description-for-product.component';
import { ReviewsComponent } from '../about-product-details/reviews/reviews.component';
import { ShippingPolicyComponent } from '../about-product-details/shipping-policy/shipping-policy.component';
import { OneProductComponent } from '../one-product/one-product.component';
import { ApiProductsService } from '../../Services/api-products.service';
import { ProductsService } from '../../Services/products.service';
import { StarRatingComponent } from '../star-rating/star-rating.component';

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
    StarRatingComponent,
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
  isAdmin = false;
  currentComponent: string = 'description';
  ngOnInit(): void {
    if (this.router.url.split('/')[2]) {
      this.getProductDetails();
    }
    if (this.router.url.split('/')[3]) {
      this.getProductDetailsForAdmin();
      this.isAdmin = true;
    }

    this.apiService.getAllProducts().subscribe({
      next: (data: any) => {
        this.allProducts = data.products;
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

  getProductDetails() {
    this.apiService.getProductById(this.router.url.split('/')[2]).subscribe({
      next: (data: any) => {
        this.productDetails = data;
        this.mainImage = this.productDetails.image[0];
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  getProductDetailsForAdmin() {
    this.apiService.getProductById(this.router.url.split('/')[3]).subscribe({
      next: (data: any) => {
        this.productDetails = data;
        this.mainImage = this.productDetails.image[0];
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
  deleteProduct(product: any) {
    this.apiService.deleteProductById(product._id).subscribe({
      next: (data) => {
        console.log(data);
      },
      complete: () => {
        this.router.navigate(['/admin/products/']);
      },
    });
  }
}
