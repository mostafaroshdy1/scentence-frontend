import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class cartCountService {
  private cartSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  public cartItems$: Observable<any> = this.cartSubject.asObservable();

  setCartItems(cartItems: any) {
    this.cartSubject.next(cartItems);
  }

  clearCartItems() {
    this.cartSubject.next([]);
  }
}
