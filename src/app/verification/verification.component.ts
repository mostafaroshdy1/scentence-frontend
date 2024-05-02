import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css'],
})
export class VerificationComponent implements OnInit {
  verificationMessage!: string;
  verificationStatus!: string;
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.verificationStatus = params['status'];
      console.log(this.verificationStatus);

      if (this.verificationStatus === 'verified') {
        this.verificationMessage = 'Email verified successfully.';
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 5000);
      } else {
        this.verificationMessage = 'Invalid verification link.';
      }
    });
  }
}
