import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ContactusService } from '../Services/contactus.service';
import { MessageSuccessComponent } from '../message-success/message-success.component';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [MessageSuccessComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css'],
})
export class ContactUsComponent {
  contactForm: FormGroup;
  message: any = {};

  constructor(
    private fb: FormBuilder,
    private contactUsService: ContactusService
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }

  submitForm() {
    if (this.contactForm.valid) {
      this.contactUsService
        .sendContactMessage(this.contactForm.value)
        .subscribe(
          (response) => {
            console.log('Message sent successfully:', response);
            this.message = {
              status: 'success',
              text: 'Your message has been sent successfully.',
            };
            this.contactForm.reset();
          },
          (error) => {
            console.error('Error sending message:', error);
            this.message = {
              status: 'error',
              text: 'There was an error while sending your message. Please try again later.',
            };
          }
        );
    }
  }

  get name() {
    return this.contactForm.get('name');
  }

  get email() {
    return this.contactForm.get('email');
  }

  get messageControl() {
    return this.contactForm.get('message');
  }

  get nameInvalid() {
    return this.name?.invalid && this.name.touched;
  }

  get emailInvalid() {
    return this.email?.invalid && this.email.touched;
  }

  get messageInvalid() {
    return this.messageControl?.invalid && this.messageControl.touched;
  }
}
