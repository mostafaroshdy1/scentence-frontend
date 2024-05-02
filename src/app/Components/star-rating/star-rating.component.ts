import { Component, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProductsService } from '../../Services/products.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [CommonModule],
  providers: [ProductsService],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.css',
})
export class StarRatingComponent {
  @Input() productId: any;
  prodRating: any;
  @Input() set: any;
  @Input() show: any;

  constructor(private productService: ProductsService) {}
  ngOnInit() {
    this.getRating();
    if (this.set == true) {
      this.productService.getProductById(this.productId).subscribe({
        next: (data: any) => {
          const token = localStorage.getItem('token');
          if (token) {
            try {
              const decodedToken = JSON.parse(atob(token.split('.')[1]));
              if (decodedToken && decodedToken.id) {
                if (data.totalRating.user.includes(decodedToken.id)) {
                  this.show = true;
                  this.set = false;
                }
              }
            } catch (e) {
              console.error('Error decoding token:', e);
            }
          }
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    }
  }

  rate(rating: any) {
    this.productService.addRating(this.productId, rating).subscribe({
      next: (data: any) => {
        this.show = true;
        this.set = false;
        this.getRating();
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
  getRating() {
    this.productService.getProductRating(this.productId).subscribe({
      next: (data: any) => {
        this.prodRating = data.rating;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
  highlightStars(star: number) {
    const stars = document.querySelectorAll('.fa-star');
    stars.forEach((element, index) => {
      if (index < star) {
        element.classList.add('active');
      }
    });
  }

  resetStars() {
    const stars = document.querySelectorAll('.fa-star');
    stars.forEach((element) => {
      element.classList.remove('active');
    });
  }
  getStarRatingWidth(): number {
    const totalStars = 5;
    return (this.prodRating / totalStars) * 100;
  }
}
