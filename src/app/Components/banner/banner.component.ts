import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiProductsService } from '../Services/api-products.service';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [HttpClientModule, RouterModule, CommonModule, RouterLink],
  providers: [ApiProductsService],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css',
})
export class BannerComponent implements OnInit {
  productTitle!: string;
  constructor(private apiService: ApiProductsService, private router: Router) {}

  ngOnInit(): void {
    this.apiService
      .getProductById(this.router.url.split('/')[2])
      .subscribe((data: any) => {
        this.productTitle = data.title;
      });
  }
}
