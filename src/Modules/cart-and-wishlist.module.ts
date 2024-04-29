import { NgModule } from '@angular/core';
import { CartService } from '../app/Services/cart.service';
import { WishListService } from '../app/Services/wishList.service';

@NgModule({
  declarations: [],
  imports: [],
  providers: [CartService, WishListService],
})
export class CartAndWishListModule {
  private static _cartService: CartService;
  private static _wishListService: WishListService;

  public static initialize(
    cartService: CartService,
    wishListService: WishListService
  ) {
    this._cartService = cartService;
    this._wishListService = wishListService;
  }

  public static get cartService(): CartService {
    return this._cartService;
  }

  public static get wishListService(): WishListService {
    return this._wishListService;
  }

  static addToCart(productId: any, qt: any) {
    this.cartService.addToCart(productId, qt).subscribe();
    window.location.reload();
  }

  static addToWishList(productId: any) {
    this.wishListService.addToWishList(productId).subscribe(() => {});
    window.location.reload();
  }

  static removeFromWishList(productId: any, wishList: any[]) {
    const newWishList = wishList.filter((item) => item.productId !== productId);
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
    window.location.reload();
  }
}
