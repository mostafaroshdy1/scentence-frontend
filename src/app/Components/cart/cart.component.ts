import { Component, Renderer2, ElementRef } from '@angular/core';
import { CartService } from '../../Services/cart.service';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [HttpClientModule, RouterModule, CommonModule],
  providers: [CartService],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  cart: any;
  total: number = 0;
  isHidden: boolean = true;
  constructor(
    private cartService: CartService,
    private el: ElementRef,
    private router: Router
  ) {}
  ngOnInit() {
    const jwtToken = localStorage.getItem('token');
    if (!jwtToken) {
      this.router.navigate(['/login']);
    }
    this.cartService.getCart().subscribe({
      next: (data: any) => {
        this.cart = data;
        this.total = this.cart.reduce((acc: number, item: any) => {
          return acc + item.price * item.qty;
        }, 0);
        if (!this.cart || this.cart.length === 0) {
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
  clearCart() {
    this.cart = [];
    this.cartService.clearCart().subscribe(); // no need to handle response
    this.isHidden = true;
  }
  updateCart(cart: any, id: string) {
    this.cartService.updateCart(cart).subscribe(
      (response: any) => {
        this.cart = response.filter((item: any) => item.qty > 0);
        this.total = this.cart.reduce((acc: number, item: any) => {
          return acc + item.price * item.qty;
        }, 0);
        const el = this.el.nativeElement.getElementsByClassName(`${id}`);
        el[0].classList.remove('d-block');
        el[0].classList.add('d-none');
        if (this.cart.length === 0) {
          this.isHidden = true;
        }
      },
      (err: any) => {
        const el = this.el.nativeElement.getElementsByClassName(`${id}`);
        el[0].classList.add('d-block');
        el[0].classList.remove('d-none');
        const item = this.cart.find((item: any) => item.productId == id);
        item.qty = item.stock;
      }
    );
  }
  reduceQty(id: string) {
    const newCart = deepCopy(this.cart);
    const item = newCart.find((item: any) => item.productId == id);
    item.qty > 1 ? item.qty-- : null;
    this.updateCart(newCart, id);
  }
  increaseQty(id: string) {
    const newCart = deepCopy(this.cart);
    const item = newCart.find((item: any) => item.productId == id);

    item.qty++;
    console.log(item);

    this.updateCart(newCart, id);
  }
  deleteItem(id: string) {
    console.log(id);
    const newCart = this.cart.filter((item: any) => item.productId != id);
    this.updateCart(newCart, id);
  }
}

function deepCopy(arr: any) {
  return JSON.parse(JSON.stringify(arr));
}
