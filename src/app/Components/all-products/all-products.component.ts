import { Component } from '@angular/core';
import { ProductsService } from '../../Services/products.service';
import { NavigationExtras, Router, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { OneProductComponent } from '../one-product/one-product.component';
import { CommonModule, NgForOf } from '@angular/common';
import { BannerComponent } from '../banner/banner.component';
import { ActivatedRoute } from '@angular/router';

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
  results: any;
  products: any;
  displayedProducts: any[] = [];
  pageSize: number = 9;
  currentPage: number = 1;
  totalPages: number = 0;
  totalProducts: number = 0;
  selectedSortOption: number = 0;
  selectedCategory: string = '';

  constructor(
    private productService: ProductsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.currentPage = this.route.snapshot.queryParams['page'];
    this.selectedSortOption = this.route.snapshot.queryParams['sortBy'];
    this.selectedCategory = this.route.snapshot.params['category'];
    console.log(this.selectedCategory);
    this.getProducts();
  }

  getProducts(): void {
    this.productService
      .getAllProducts(
        this.currentPage,
        this.pageSize,
        this.selectedSortOption,
        this.selectedCategory
      )
      .subscribe({
        next: (data) => this.updateProductList(data),
        error: (err) => this.handleError(err),
      });
  }

  updateProductList(data: any): void {
    this.results = data;
    this.products = this.results.products;
    this.currentPage = this.results.currentPage;
    this.totalPages = this.results.totalPages;
    this.totalProducts = this.results.totalProducts;
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;

      const navigationExtras: NavigationExtras = {
        queryParams: { page: this.currentPage },
        queryParamsHandling: 'merge',
      };

      this.getProducts();
      this.router.navigate([], navigationExtras);
    }
  }

  filterByCategory(category: string, event: Event, page: number = 1): void {
    this.selectedCategory = category;
    this.currentPage = page;

    const checkbox = event.target as HTMLInputElement;
    const checkboxes = document.querySelectorAll(
      'input[type="checkbox"][name="category"]'
    );
    checkboxes.forEach((cb) => {
      if (cb !== checkbox) {
        (cb as HTMLInputElement).checked = false;
      }
    });

    const navigationExtras: NavigationExtras = {
      queryParams: { page: this.currentPage.toString() },
      queryParamsHandling: 'merge',
    };

    this.getProducts();
    this.router.navigate(
      ['/category', this.selectedCategory],
      navigationExtras
    );
  }

  onChangeSortOption(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.selectedSortOption = parseInt(selectedValue);

    const navigationExtras: NavigationExtras = {
      queryParams: { sortBy: this.selectedSortOption },
      queryParamsHandling: 'merge',
    };

    this.getProducts();
    this.router.navigate([], navigationExtras);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }

  handleError(error: any): void {
    console.log('Error:', error);
  }
}
