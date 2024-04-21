import { CommonModule, NgForOf } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { OrdersService } from '../../Services/orders.services';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [RouterModule, HttpClientModule, CommonModule],
  providers: [OrdersService],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css',
})
export class OrderDetailsComponent {
  constructor(
    private orderService: OrdersService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  order: any;
  date: any;
  time: any;
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
          console.log(this.order.products);
        },
        error: (error) => {
          console.error(error);
        },
      });
  }
}
