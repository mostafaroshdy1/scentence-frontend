import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar-components/navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ShopComponent } from './Components/shop/shop.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CartComponent } from './Components/cart/cart.component';
import { CheckoutComponent } from './Components/checkout/checkout.component';
import { OrdersHistoryComponent } from './Components/orders-history/orders-history.component';
import { OrderDetailsComponent } from './Components/order-details/order-details.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './home-components/footer/footer.component';
import { ContactUsComponent } from './contactus/contactus.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CheckoutComponent,
    OrdersHistoryComponent,
    OrderDetailsComponent,
    CommonModule,
    CartComponent,
    NavbarComponent,
    LoginComponent,
    SignupComponent,
    ShopComponent,
    FooterComponent,
    ContactUsComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  shouldShowNavbar: boolean = true;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.shouldShowNavbar = !event.url.startsWith('/admin');
      }
    });
  }
}
