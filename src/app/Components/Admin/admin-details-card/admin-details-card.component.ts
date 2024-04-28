import { HttpClientModule } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ApiAdminService } from '../../../Services/api-admin.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-details-card',
  standalone: true,
  imports: [HttpClientModule, RouterLink],
  providers: [ApiAdminService],
  templateUrl: './admin-details-card.component.html',
  styleUrl: './admin-details-card.component.css',
})
export class AdminDetailsCardComponent implements OnInit {
  @Input() title!: string;
  @Input() link!: string;
  @Input() total!: number;

  constructor(private apiService: ApiAdminService, private router: Router) {}
  productsCount = 0;
  usersCount = 0;
  ngOnInit(): void {
    this.apiService.getAllProducts().subscribe({
      next: (data: any) => {
        for (const prod of data.products) {
          this.productsCount += 1;
        }
      },
      error: (error: any) => {
        console.log(error);
      },
    });

    // this.apiService.countUsers().subscribe({
    //   next: (data: any) => {
    //     this.usersCount = data.count;
    //   },
    //   error: (error: any) => {
    //     console.log(error);
    //   },
    // });

    if (this.title === 'Products') {
      this.productsCount = this.total;
    } else if (this.title === 'Users') {
      this.usersCount = this.total;
    }
    // else for orders
  }
}
