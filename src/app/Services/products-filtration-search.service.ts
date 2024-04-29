import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductFilterService {
  private filterSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private searchSubject: BehaviorSubject<any> = new BehaviorSubject<any>('');

  public filter$: Observable<any> = this.filterSubject.asObservable();
  public search$: Observable<any> = this.searchSubject.asObservable();

  setFilter(filter: any) {
    this.filterSubject.next(filter);
  }

  setSearch(search: any) {
    this.searchSubject.next(search);
  }

  clearFilter() {
    this.filterSubject.next(null);
  }

  clearSearch() {
    this.searchSubject.next('');
  }
}
