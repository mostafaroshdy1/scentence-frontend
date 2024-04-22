import { Component, OnInit } from '@angular/core';
import { BannerComponent } from '../banner/banner.component';
import { FilterSearchBarComponent } from '../filter-search-bar/filter-search-bar.component';
import { DisplayedProductsComponent } from '../displayed-products/displayed-products.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [
    BannerComponent,
    DisplayedProductsComponent,
    FilterSearchBarComponent,
    CommonModule,
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
})
export class ShopComponent implements OnInit {
  filterModalVisible = false;

  ngOnInit(): void {
    const closeFilterModal = document.querySelector('.close') as HTMLElement;
    window.addEventListener('click', (event) => {
      if (event.target === closeFilterModal) {
        this.closeFilterModal();
      }
    });
  }

  toggleFilterModal(): void {
    this.filterModalVisible = !this.filterModalVisible;
  }

  closeFilterModal(): void {
    this.filterModalVisible = false;
  }
}
