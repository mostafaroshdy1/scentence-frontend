import { ChangeDetectorRef, Component, Renderer2 } from '@angular/core';
import { ProductFilterService } from '../../Services/products-filtration-search.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ProductsService } from '../../Services/products.service';

@Component({
  selector: 'app-filter-search-bar',
  standalone: true,
  imports: [HttpClientModule],
  providers: [ProductsService],
  templateUrl: './filter-search-bar.component.html',
  styleUrl: './filter-search-bar.component.css',
})
export class FilterSearchBarComponent {
  categories: any[] = [];

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private productService: ProductsService,
    private productFilterService: ProductFilterService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const categoryParam = params.get('category');
      if (categoryParam) {
        const checkboxId = `${categoryParam}Checkbox`;
        const checkboxElement = this.renderer.selectRootElement(
          `#${checkboxId}`
        );
        if (checkboxElement) {
          checkboxElement.checked = true;
        }
      }
    });
    this.fetchCategoryProductCount();
  }

  fetchCategoryProductCount(): void {
    this.productService.getCategoryProductCounts().subscribe(
      (response) => {
        this.categories = response.categoryCounts;
        this.updateCategoryCountsInDOM();
      },
      (error) => {
        console.error('Error fetching category product counts:', error);
      }
    );
    const categoryCounters = document.querySelectorAll('.category-counter');
  }

  updateCategoryCountsInDOM() {
    this.categories.forEach((category) => {
      const categoryCounter = document.getElementById(
        `${category.category}-counter`
      );
      if (categoryCounter) {
        categoryCounter.textContent = category.count.toString();
      }
    });
    this.changeDetectorRef.detectChanges();
  }

  filterByCategory(category: string, event: Event): void {
    this.productFilterService.setFilter(category.toLowerCase());
    const checkbox = event.target as HTMLInputElement;
    const checkboxes = document.querySelectorAll(
      'input[type="checkbox"][name="category"]'
    );
    checkboxes.forEach((cb) => {
      if (cb !== checkbox) {
        (cb as HTMLInputElement).checked = false;
      }
    });

    const navigationExtras: NavigationExtras = { queryParams: {} };
    if (checkbox.checked) {
      const newUrl = `/products/category/${category}`;
      this.router.navigateByUrl(newUrl, navigationExtras);
    } else {
      this.productFilterService.clearFilter();
      this.router.navigateByUrl('/products', navigationExtras);
    }
    this.productFilterService.clearSearch();
  }

  searchForProduct(): void {
    const searchInput = document.querySelector(
      '.search-input'
    ) as HTMLInputElement;
    const searchValue = searchInput.value;
    this.productFilterService.setSearch(searchValue);

    const navigationExtras: NavigationExtras = {
      queryParams: { search: searchValue },
      queryParamsHandling: 'merge',
    };

    this.router.navigate([], navigationExtras);
  }
}
