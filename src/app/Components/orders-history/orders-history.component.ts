import { CommonModule, NgForOf } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrdersService } from '../../Services/orders.services';

@Component({
  selector: 'app-orders-history',
  standalone: true,
  imports: [RouterModule, HttpClientModule, CommonModule],
  providers: [OrdersService],
  templateUrl: './orders-history.component.html',
  styleUrl: './orders-history.component.css',
})
export class OrdersHistoryComponent {
  constructor(private orderService: OrdersService) {}
  Orders: any;
  date: any;
  time: any;
  ngOnInit() {
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
  trackById(index: number, order: any) {
    return order.id;
  }
}
