import { CommonModule, NgForOf } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { OrdersService } from '../../Services/orders.services';

@Component({
  selector: 'app-orders-history',
  standalone: true,
  imports: [RouterModule, HttpClientModule, CommonModule],
  providers: [OrdersService],
  templateUrl: './orders-history.component.html',
  styleUrl: './orders-history.component.css',
})
export class OrdersHistoryComponent implements OnInit {
  Orders: any;
  date: any;
  time: any;

  constructor(private orderService: OrdersService, private router: Router) {}

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

  trackById(index: number, order: any) {
    return order.id;
  }
}
