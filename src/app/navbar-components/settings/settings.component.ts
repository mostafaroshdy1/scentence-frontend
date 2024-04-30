import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LogoutService } from '../../Services/logout.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  @Input() showForm: any;
  @Input() loggedIn: any;
  @Output() showFormChange = new EventEmitter<string>();
  constructor(private router: Router, private logoutService: LogoutService) {
    this.showForm = 'hidden-item';
  }
  ngOnInit(): void {
    this.logoutService.logout$.subscribe((logout) => {
      this.loggedIn = logout;
    });
  }
  hideMenu() {
    this.showForm = 'hidden-item';
    this.emitShowForm();
  }
  logout() {
    localStorage.clear();
    this.loggedIn = false;
    this.router.navigate(['/login']);
    this.showForm = 'hidden-item';
    this.emitShowForm();
    this.logoutService.setLogout(false);
  }
  private emitShowForm() {
    this.showFormChange.emit(this.showForm);
  }
}
