import { Component } from '@angular/core';
import { ApiProductsService } from '../Services/api-products.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { BannerComponent } from '../banner/banner.component';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    HttpClientModule,
    BannerComponent
  ],
  providers:[
    ApiProductsService
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  constructor(private apiService: ApiProductsService , private router:Router) {}
  productDetails: any;
  ngOnInit(): void {
    this.apiService
      .getProductById(this.router.url.split('/')[2])
      .subscribe((data: any) => {
        this.productDetails = data;
      });
  }


}
