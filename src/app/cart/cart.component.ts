import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [HttpClientModule, RouterModule],
  providers: [CartService],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  cart: any;
  constructor(private cartService: CartService) {}
  ngOnInit() {
    this.cartService.getCart().subscribe({
      next: (data: any) => {
        this.cart = data;
        console.log(this.cart);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
  clearCart() {
    this.cart = [];
    this.cartService.clearCart().subscribe(); // no need to handle response
  }
  updateCart() {
    this.cartService.updateCart(this.cart).subscribe();
    this.cart = this.cart.filter((item: any) => item.qty > 0);
  }
  reduceQty(id: string) {
    const item = this.cart.find((item: any) => item.productId == id);
    item.qty ? item.qty-- : null;
    // console.log(id,this.cart);
  }
  increaseQty(id: string) {
    const item = this.cart.find((item: any) => item.productId == id);
    item.qty++;
  }
  deleteItem(id: string) {
    this.cart = this.cart.filter((item: any) => item.productId != id);
  }
}
