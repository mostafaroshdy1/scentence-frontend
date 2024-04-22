import { Component } from '@angular/core';
import { ProductsService } from '../../Services/products.service';
import { Router, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { OneProductComponent } from '../one-product/one-product.component';
import { CommonModule, NgForOf } from '@angular/common';
import { BannerComponent } from '../banner/banner.component';

@Component({
  selector: 'app-all-products',
  standalone: true,
  imports: [
    RouterModule,
    HttpClientModule,
    OneProductComponent,
    CommonModule,
    BannerComponent,
  ],
  providers: [ProductsService],
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.css',
})
export class AllProductsComponent {
  p: any;
  isAdmin=false;
  constructor(private productService: ProductsService ,private router:Router) {
    if(router.url.split('/')[1]=='admin'){
      this.isAdmin=true;
    }
  }
  Products: any;
  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next: (data:any) => {
        this.Products = data['products'];
      },
      error: (err) => {
        console.log('Error Happened!');
      },
    });
  }
  trackById(index: number, product: any) {
    return product.id;
  }
}
