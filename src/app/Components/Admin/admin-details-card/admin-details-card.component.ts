import { HttpClientModule } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ApiAdminService } from '../../../Services/api-admin.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-details-card',
  standalone: true,
  imports: [HttpClientModule, RouterLink],
  providers: [ApiAdminService],
  templateUrl: './admin-details-card.component.html',
  styleUrl: './admin-details-card.component.css',
})
export class AdminDetailsCardComponent {
  @Input() title!: string;
  @Input() link!: string;
  @Input() total!: number;

  constructor(private apiService: ApiAdminService, private router: Router) {}
}
