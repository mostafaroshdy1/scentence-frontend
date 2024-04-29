import { CommonModule, NgForOf } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { OrdersService } from '../../Services/orders.service';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [RouterModule, HttpClientModule, CommonModule],
  providers: [OrdersService],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css',
})
export class OrderDetailsComponent {
  orderStatuses: string[] = ['pending', 'accepted', 'on way', 'delivered'];
  currentStatusIndex: number = 0;
  getCurrentStatusIndex(status: string): number {
    return this.orderStatuses.indexOf(status);
  }
  constructor(
    private orderService: OrdersService,
    private route: ActivatedRoute
  ) {}
  order: any;
  date: any;
  time: any;
  discount:any;
  ngOnInit() {
    console.log(this.route);
    this.orderService
      .getOrderDetails(this.route.snapshot.paramMap.get('id'))
      .subscribe({
        next: (data) => {
          this.order = data;
          this.date = new Date(this.order.order.createdAt).toLocaleDateString();
          this.time = new Date(this.order.order.createdAt).toLocaleTimeString();
          this.order.order.createdAt = this.date + ' ' + this.time;
          this.currentStatusIndex = this.getCurrentStatusIndex(
            this.order.order.status
          );
          this.discount=(((this.order.order.total-30)/(1-this.order.order.discount)))*this.order.order.discount;
          console.log(this.order.order.status);
          console.log(this.order.products);
        },
        error: (error) => {
          console.error(error);
        },
      });
  }
}
