import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LogoutService {
  private logoutSubject: BehaviorSubject<any> = new BehaviorSubject<any>(false);

  public logout$: Observable<any> = this.logoutSubject.asObservable();

  setLogout(logout: any) {
    this.logoutSubject.next(logout);
  }
}
