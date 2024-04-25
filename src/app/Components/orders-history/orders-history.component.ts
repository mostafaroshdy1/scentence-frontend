import { CommonModule, NgForOf } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { OrdersService } from '../../Services/orders.services';
import { CartService } from '../../cart.service';

@Component({
  selector: 'app-orders-history',
  standalone: true,
  imports: [RouterModule, HttpClientModule, CommonModule],
  providers: [OrdersService, CartService],
  templateUrl: './orders-history.component.html',
  styleUrl: './orders-history.component.css',
})
export class OrdersHistoryComponent implements OnInit {
  Orders: any;
  date: any;
  time: any;

  constructor(
    private orderService: OrdersService,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.orderService.getUserOrders().subscribe({
      next: (data) => {
        this.Orders = data;
        for (let i = 0; i < this.Orders.length; i++) {
          this.date = new Date(this.Orders[i].createdAt).toLocaleDateString();
          this.time = new Date(this.Orders[i].createdAt).toLocaleTimeString();
          this.Orders[i].createdAt = this.date + ' ' + this.time;
        }
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  cancelOrder(id: any) {
    this.orderService.cancelOrder(id).subscribe({
      next: (data) => {
        this.loadOrders();
        this.router.navigate(['/orders']);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  reOrder(id: any) {
    this.orderService.reOrder(id).subscribe({
      next: (data) => {
        console.log(data);
        this.cartService.getCart().subscribe({
          next: () => {
            this.router.navigate(['/cart']);
          },
          error: (error) => {
            console.error(error);
          },
        });
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  trackById(index: number, order: any) {
    return order.id;
  }
}
