import { Component, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationExtras, Router, RouterModule } from '@angular/router';
import { ApiAdminService } from '../../Services/api-admin.service';
import { HttpClientModule } from '@angular/common/http';
import { CartService } from '../../Services/cart.service';
import { WishListService } from '../../Services/wishList.service';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { cartCountService } from '../../Services/cart-count.service';
import { CartAndWishListService } from '../../Services/cart-and-wishlist.service';

@Component({
  selector: 'app-one-product',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule, StarRatingComponent],
  providers: [ApiAdminService],
  templateUrl: './one-product.component.html',
  styleUrl: './one-product.component.css',
})
export class OneProductComponent {
  @Input() product: any;
  isAdmin = false;
  wishList: any[] = [];
  isIncluded: boolean = false;
  constructor(
    private router: Router,
    private apiService: ApiAdminService,
    private cartService: CartService,
    private wishListService: WishListService,
    private cartCountService: cartCountService,
    private cartAndWishlistService: CartAndWishListService
  ) {
    if (this.router.url.split('/')[1] == 'admin') {
      this.isAdmin = true;
    }
  }

  ngOnInit(): void {
    this.wishListService.getWishList().subscribe({
      next: (data: any[]) => {
        this.wishList = data;

        if (this.wishList) {
          const productId = this.product._id.toString();

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
    this.cartAndWishlistService.addToCart(productId, qt);
  }

  addToWishList(productId: any) {
    this.cartAndWishlistService.addToWishList(productId);
    this.isIncluded = true;
  }

  removeFromWishList(productId: any) {
    this.cartAndWishlistService.removeFromWishList(productId);
    this.isIncluded = false;
  }
}
