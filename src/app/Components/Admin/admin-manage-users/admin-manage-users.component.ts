import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiAdminService } from '../../../Services/api-admin.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar.component';
import { AdminNavbarComponent } from '../admin-navbar/admin-navbar.component';

@Component({
  selector: 'app-admin-manage-users',
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    RouterLink,
    AdminManageUsersComponent,
    AdminSidebarComponent,
    AdminNavbarComponent
  ],
  providers: [ApiAdminService],
  templateUrl: './admin-manage-users.component.html',
  styleUrl: './admin-manage-users.component.css',
})
export class AdminManageUsersComponent implements OnInit {
  users: any[] = [];
  constructor(private router: Router, private apiService: ApiAdminService) {}
  ngOnInit(): void {
    this.apiService.getAllUsers().subscribe({
      next: (data: any) => {
        this.users = data.Users;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  deleteUser(id: any) {
    this.apiService.deleteUserById(id).subscribe({
      next: (data: any) => {
        console.log(data);
        this.router.navigate(['/admin']);
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
}
