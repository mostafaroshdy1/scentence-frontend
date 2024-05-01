import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { faCircleXmark, faBars } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-navbar-links',
  standalone: true,
  imports: [RouterModule, FontAwesomeModule,CommonModule],
  templateUrl: './navbar-links.component.html',
  styleUrl: './navbar-links.component.css',
})
export class NavbarLinksComponent {
  constructor(private route: ActivatedRoute,private router:Router) {}
  clicked = false;
  links: any[] = [
    { name: 'home', link: '/' },
    { name: 'profile', link: '/profile/info'},
    { name: 'products', link: '/products' },
    { name: 'Wish list', link: '/wishlist' },
    { name: 'about us', link: '/aboutus' },
    { name: 'contact us', link: '/contactus' },
  ];

  closeIcon = faCircleXmark;
  barsIcon = faBars;

  navDisplay = 'hidden-display';

  changeNav() {
    this.navDisplay =
      this.navDisplay === 'hidden-display' ? 'show-display' : 'hidden-display';
  }
  changeProfile(){
    if(!this.clicked){
      this.router.navigate([this.links[1].link]);
    }
    this.clicked=true;
  }
  unchangeProfile(){
    this.clicked=false;
  }

}
