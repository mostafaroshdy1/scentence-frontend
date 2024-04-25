import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiAdminService } from '../../../Services/api-admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-display-user-details',
  standalone: true,
  imports: [HttpClientModule],
  providers: [ApiAdminService],
  templateUrl: './display-user-details.component.html',
  styleUrl: './display-user-details.component.css',
})
export class DisplayUserDetailsComponent implements OnInit {
  user: any;
  constructor(private router: Router, private apiService: ApiAdminService) {}

  ngOnInit(): void {
    this.apiService.getUserById(this.router.url.split('/')[3]).subscribe({
      next: (data: any) => {
        this.user = data.User;
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
  goBackToDashboard() {
    this.router.navigate(['/admin']);
  }
}
