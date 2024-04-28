import { Component, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ApiAdminService } from '../../Services/api-admin.service';
import { HttpClientModule } from '@angular/common/http';
import { StarRatingComponent } from '../star-rating/star-rating.component';

@Component({
  selector: 'app-one-product',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule, StarRatingComponent],
  providers: [ApiAdminService],
  templateUrl: './one-product.component.html',
  styleUrl: './one-product.component.css',
})
export class OneProductComponent {
  @Input() product: any;
  isAdmin = false;

  constructor(private router: Router, private apiService: ApiAdminService) {
    if (this.router.url.split('/')[1] == 'admin') {
      this.isAdmin = true;
    }
  }

  deleteProduct(product: any) {
    this.apiService.deleteProductById(product._id).subscribe({
      next: (data) => {
        console.log(data);
      },
      complete: () => {
        this.router.navigate(['/admin/products/']);
      },
    });
  }
}
