import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar-components/navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent} from './signup/signup.component';
import { ShopComponent } from './Components/shop/shop.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CartComponent } from './Components/cart/cart.component';
import { CheckoutComponent } from './Components/checkout/checkout.component';
import { OrdersHistoryComponent } from './Components/orders-history/orders-history.component';
import { OrderDetailsComponent } from './Components/order-details/order-details.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CheckoutComponent,
    OrdersHistoryComponent,
    OrderDetailsComponent,
    CartComponent,NavbarComponent, LoginComponent,SignupComponent, ShopComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  shouldShowNavbar: boolean = true;

  constructor(private router: Router) {
    if(this.router.url.split('/')[1] === 'admin'){
      this.shouldShowNavbar = false;
    }
    else{
      this.shouldShowNavbar = true;
    }
  }
}


