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
import { CartService } from '../../Services/cart.service';
import { WishListService } from '../../Services/wishList.service';
import { CartAndWishListModule } from '../../../Modules/cart-and-wishlist.module';
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
    CartAndWishListModule,
    StarRatingComponent,
  ],
  providers: [ProductsService],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent {
  constructor(
    private apiService: ProductsService,
    private router: Router,
    private wishListService: WishListService,
    private cartService: CartService
  ) {
    CartAndWishListModule.initialize(cartService, wishListService);
  }
  productDetails: any;
  allProducts: any;
  result: any;
  mainImage = '';
  countValue = 0;
  style = '';
  isAdmin = false;
  currentComponent: string = 'description';
  wishList: any[] = [];
  isIncluded: boolean = false;
  productId: any;

  ngOnInit(): void {
    if (this.router.url.split('/')[2]) {
      this.productId = this.router.url.split('/')[2];
      this.getProductDetails(this.productId);
    }
    if (this.router.url.split('/')[3]) {
      this.productId = this.router.url.split('/')[3];
      this.getProductDetailsForAdmin(this.productId);
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

    this.wishListService.getWishList().subscribe({
      next: (data: any[]) => {
        this.wishList = data;

        if (this.wishList) {
          const productId = this.productDetails._id.toString();

          this.isIncluded = this.wishList
            .map((item) => item.productId)
            .includes(productId);
        }
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  // ngOnInit(): void {
  //   const segments = this.router.url.split('/');
  //   const productId = segments[2];
  //   const adminParam = segments[3];

  //   if (productId) {
  //     this.isAdmin = !!adminParam;
  //     if (this.isAdmin) {
  //       this.getProductDetailsForAdmin(productId);
  //     } else {
  //       this.getProductDetails(productId);
  //     }
  //   }
  //   this.getAllProducts();

  // }

  getAllProducts() {
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

  getProductDetails(productId: string) {
    this.apiService.getProductById(productId).subscribe({
      next: (data: any) => {
        this.productDetails = data;
        this.mainImage = this.productDetails.image[0];
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  getProductDetailsForAdmin(productId: string) {
    this.apiService.getProductById(productId).subscribe({
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

  addToCart(productId: any, qt: any) {
    CartAndWishListModule.addToCart(productId, qt);
  }

  addToWishList(productId: any) {
    CartAndWishListModule.addToWishList(productId);
  }

  removeFromWishList(productId: any) {
    CartAndWishListModule.removeFromWishList(productId, this.wishList);
  }
}
