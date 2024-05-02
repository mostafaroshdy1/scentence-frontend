import { Component, OnInit } from '@angular/core';
import { AddIconComponent } from '../add-icon/add-icon.component';
import { Router, RouterModule } from '@angular/router';
import { ApiAdminService } from '../../../Services/api-admin.service';
import { HttpClientModule } from '@angular/common/http';
import { LineChartComponent } from '../line-chart/line-chart.component';
import { AdminDetailsCardComponent } from '../admin-details-card/admin-details-card.component';
import { SidebarComponent } from '../../../profile-components/sidebar/sidebar.component';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar.component';
import { AdminNavbarComponent } from '../admin-navbar/admin-navbar.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    AddIconComponent,
    RouterModule,
    HttpClientModule,
    LineChartComponent,
    AdminDetailsCardComponent,
    AdminSidebarComponent,
    AdminNavbarComponent
  ],
  providers: [ApiAdminService],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
})
export class AdminDashboardComponent implements OnInit {
  constructor(private apiService: ApiAdminService, private router: Router) {}
  productsCount = 0;
  usersCount = 0;
  ordersCount = 0;

  ngOnInit(): void {
    this.apiService.countAllProducts().subscribe({
      next: (data: any) => {
        console.log("data from count prod: ",data.count);
        this.productsCount=data.count;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
    this.apiService.getAllOrders().subscribe({
      next: (data: any) => {
        for (const order of data) {
          this.ordersCount += 1;
        }
      },
      error: (error: any) => {
        console.log(error);
      },
    });

    this.apiService.countUsers().subscribe({
      next: (data: any) => {
        console.log(data.count[0].users);
        this.usersCount=data.count[0].users;
        // console.log(this.usersCount);
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
}
