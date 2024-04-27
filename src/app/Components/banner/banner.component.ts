import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../Services/products.service';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [HttpClientModule, RouterModule, CommonModule, RouterLink],
  providers: [ProductsService],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css',
})
export class BannerComponent implements OnInit {
  productTitle!: string;
  checkRoute = this.router.url.split('/')[2];
  checkRouteWithCategory = this.router.url.split('/')[2] == 'category';
  showAdminHome = false;
  data!: string;
  constructor(private apiService: ProductsService, private router: Router) {}

  ngOnInit(): void {
    if (this.checkRouteWithCategory) {
      this.data = this.router.url.split('/')[1];
    } else if (this.checkRoute) {
      if (this.router.url.split('/')[1] == 'admin') {
        this.data = 'Admin Dashboard';
        this.showAdminHome = true;
      } else {
        this.apiService
          .getProductById(this.router.url.split('/')[2])
          .subscribe((data: any) => {
            this.productTitle = data['title'];
            console.log(data['title']);
          });
      }
    } else {
      if (this.router.url.includes('?')) {
        this.data = this.router.url.split('/')[1].split('?')[0];
      } else {
        this.data = this.router.url.split('/')[1];
      }
    }
  }
}
