import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { faCircleXmark, faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar-links',
  standalone: true,
  imports: [RouterModule, FontAwesomeModule],
  templateUrl: './navbar-links.component.html',
  styleUrl: './navbar-links.component.css',
})
export class NavbarLinksComponent {
  links: any[] = [
    { name: 'home', link: '/' },
    { name: 'shop', link: '/shop' },
    { name: 'product', link: '/products' },
    { name: 'Wish list', link: '/wishlist' },
    { name: 'about us', link: '/about-us' },
    { name: 'contact', link: '/contactus' },
  ];

  closeIcon = faCircleXmark;
  barsIcon = faBars;

  navDisplay = 'hidden-display';

  changeNav() {
    this.navDisplay =
      this.navDisplay === 'hidden-display' ? 'show-display' : 'hidden-display';
  }
}
