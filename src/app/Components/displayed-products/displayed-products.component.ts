import { Component } from '@angular/core';
import {
  ActivatedRoute,
  NavigationExtras,
  Router,
  RouterModule,
} from '@angular/router';
import { ProductsService } from '../../Services/products.service';
import { ProductFilterService } from '../../Services/products-filtration-search.service';
import { CommonModule } from '@angular/common';
import { OneProductComponent } from '../one-product/one-product.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-displayed-products',
  standalone: true,
  imports: [CommonModule, OneProductComponent, HttpClientModule, RouterModule],
  providers: [ProductsService],
  templateUrl: './displayed-products.component.html',
  styleUrl: './displayed-products.component.css',
})
export class DisplayedProductsComponent {
  results: any;
  products: any;
  pageSize: number = 9;
  currentPage: number = 1;
  totalPages: number = 0;
  totalProducts: number = 0;
  selectedSortOption: number = 0;
  searchedWord: string = '';
  selectedCategory: string = '';
  isAdmin = false;

  constructor(
    private productService: ProductsService,
    private router: Router,
    private route: ActivatedRoute,
    private productFilterService: ProductFilterService
  ) {
    if (router.url.split('/')[1] == 'admin') {
      this.isAdmin = true;
    }
  }

  ngOnInit(): void {
    this.currentPage = this.route.snapshot.queryParams['page'];
    this.selectedSortOption = this.route.snapshot.queryParams['sortBy'];
    this.searchedWord = this.route.snapshot.queryParams['search'];
    this.selectedCategory = this.route.snapshot.params['category'];
    this.productFilterService.filter$.subscribe({
      next: (data) => {
        this.selectedCategory = data;
        this.getProducts();
      },
      error: (err) => this.handleError(err),
    });
    this.productFilterService.search$.subscribe({
      next: (data) => {
        this.searchedWord = data;
        this.getProducts();
      },
      error: (err) => this.handleError(err),
    });
    this.getProducts();
  }

  getProducts(): void {
    this.productService
      .getAllProducts(
        this.currentPage,
        this.pageSize,
        this.selectedSortOption,
        this.searchedWord,
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

  goToProduct(event: Event, productId: any): void {
    const target = event.target as HTMLElement;
    if (
      !target.classList.contains('button') &&
      !target.classList.contains('icon')
    ) {
      if (!this.isAdmin) {
        this.router.navigate(['/products/', productId]);
      } else if (this.isAdmin) {
        this.router.navigate(['/admin/products/', productId]);
      }
    }
  }
}
