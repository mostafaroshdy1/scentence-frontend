import { Injectable } from '@angular/core';
import { CartService } from '../Services/cart.service';
import { WishListService } from '../Services/wishList.service';
import { cartCountService } from '../Services/cart-count.service';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartAndWishListService {
  wishList: any[] = [];
  constructor(
    private cartService: CartService,
    private wishListService: WishListService,
    private cartCountService: cartCountService
  ) {}

  addToCart(productId: any, qt: any) {
    this.cartService
      .addToCart(productId, qt)
      .pipe(take(1))
      .subscribe({
        next: (data) => {
          console.log('data:', data);
          this.cartCountService.setCartItems(data);
        },
        error: (error) => {
          console.error('Error adding to cart:', error);
        },
      });
  }

  addToWishList(productId: any) {
    this.wishListService
      .addToWishList(productId)
      .pipe(take(1))
      .subscribe((data) => {
        this.wishList = data;
      });
  }

  removeFromWishList(productId: any) {
    const newWishList = this.wishList.filter(
      (item) => item.productId !== productId
    );
    if (newWishList.length > 0) {
      this.wishListService.updateWishList(newWishList).subscribe({
        next: (data: any) => {},
        error: (error: any) => {
          console.error('Error updating wishlist:', error);
        },
      });
    } else {
      this.wishListService.clearWishList().subscribe();
    }
  }
}
