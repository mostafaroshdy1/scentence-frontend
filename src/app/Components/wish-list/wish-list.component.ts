import { Component, ElementRef } from '@angular/core';
import { WishListService } from '../../Services/wishList.service';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../cart.service';

@Component({
  selector: 'app-wish-list',
  standalone: true,
  imports: [CurrencyPipe],
  providers: [WishListService],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.css',
})
export class WishListComponent {
  wishList: any;
  isHidden: boolean = true;
  constructor(
    private wishListService: WishListService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.wishListService.getWishList().subscribe({
      next: (data: any) => {
        this.wishList = data;
        if (!this.wishList) {
          this.isHidden = true;
        } else {
          this.isHidden = false;
        }
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  clearWishList() {
    this.wishList = [];
    this.wishListService.clearWishList().subscribe();
    this.isHidden = true;
    window.location.reload();
  }

  updateWishList(wishList: any) {
    this.wishListService.updateWishList(wishList).subscribe({
      next: (data: any) => {},
      error: (error: any) => {
        console.error('Error updating wishlist:', error);
      },
      complete: () => {
        window.location.reload();
      },
    });
  }

  deleteItem(id: string) {
    const newWishList = this.wishList.filter(
      (item: any) => item.productId != id
    );
    this.wishList = newWishList;
    if (this.wishList.length > 0) {
      this.updateWishList(this.wishList);
    } else {
      this.clearWishList();
    }
  }

  handleButtonClick(action: string, productId: string) {
    const quantityInput = document.getElementById(
      `quantityInput-${productId}`
    ) as HTMLInputElement;
    const maxQuantityMessage = document.getElementById(
      productId
    ) as HTMLElement;
    const currentValue = parseInt(quantityInput.value);
    const maxLimit = parseInt(quantityInput.max);

    if (action === 'decrement' && currentValue > 1) {
      quantityInput.value = (currentValue - 1).toString();
    } else if (action === 'increment' && currentValue < maxLimit) {
      quantityInput.value = (currentValue + 1).toString();
    }

    if (currentValue >= maxLimit) {
      maxQuantityMessage.classList.remove('d-none');
    } else {
      maxQuantityMessage.classList.add('d-none');
    }
  }

  AddToCart(productId: string) {
    const quantityInput = document.getElementById(
      `quantityInput-${productId}`
    ) as HTMLInputElement;
    const currentValue = parseInt(quantityInput.value);
    this.cartService.addToCart(productId, currentValue).subscribe({
      next: (data: any) => {
        this.deleteItem(productId);
      },
      error: (error: any) => {
        console.error('Error adding to cart:', error);
      },
    });
  }
}
