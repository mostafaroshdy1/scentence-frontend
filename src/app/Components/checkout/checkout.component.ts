import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NgModel,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { OrdersService } from '../../Services/orders.service';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CartService } from '../../Services/cart.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule],
  providers: [OrdersService, CartService],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent {
  formData: any;
  cart: any;
  promoData: any;
  invalidPromo: boolean = false;
  constructor(
    private orderService: OrdersService,
    private cartService: CartService,
    private router: Router
  ) {}
  ngOnInit() {
    this.cartService.getCart().subscribe({
      next: (data: any) => {
        this.cart = data;
        this.cart.total = this.cart.reduce(
          (acc: any, item: any) => acc + item.price * item.qty,
          0
        );
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
  regForm = new FormGroup({
    secondPhone: new FormControl('', Validators.pattern(/^\+?[0-9]+$/)),
    city: new FormControl('', Validators.required),
    Area: new FormControl('', Validators.required),
    street: new FormControl('', Validators.required),
    building: new FormControl('', Validators.required),
    floor: new FormControl('', Validators.required),
    apartment: new FormControl('', Validators.required),
    extra: new FormControl(''),
    paymentMethod: new FormControl('paymentMethod', Validators.required),
  });
  promoForm = new FormGroup({
    promoCode: new FormControl(''),
  });

  get secPhoneValid() {
    return (
      this.regForm.controls['secondPhone'].valid ||
      this.regForm.controls['secondPhone'].untouched
    );
  }
  get cityValid() {
    return (
      this.regForm.controls['city'].valid ||
      this.regForm.controls['city'].untouched
    );
  }
  get areaValid() {
    return (
      this.regForm.controls['Area'].valid ||
      this.regForm.controls['Area'].untouched
    );
  }
  get streetValid() {
    return (
      this.regForm.controls['street'].valid ||
      this.regForm.controls['street'].untouched
    );
  }
  get buildingValid() {
    return (
      this.regForm.controls['building'].valid ||
      this.regForm.controls['building'].untouched
    );
  }
  get floorValid() {
    return (
      this.regForm.controls['floor'].valid ||
      this.regForm.controls['floor'].untouched
    );
  }
  get apartmentValid() {
    return (
      this.regForm.controls['apartment'].valid ||
      this.regForm.controls['apartment'].untouched
    );
  }
  get paymentMethodValid() {
    return (
      this.regForm.controls['paymentMethod'].valid ||
      this.regForm.controls['paymentMethod'].untouched
    );
  }

  submitForm() {
    this.formData = this.regForm.value;
    //add total as property to formData
    this.formData.total = this.cart.total;
    console.log(this.formData);
    this.orderService.createOrder(this.formData).subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigate(['/orders', data.order._id]);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  makeDiscount() {
    this.promoData = this.promoForm.value;
    this.orderService.makeDiscount(this.promoData).subscribe({
      next: (data) => {
        this.cart.discount = this.cart.total * data.discount;
        this.cart.total = this.cart.total - this.cart.total * data.discount;
        this.invalidPromo = false;
      },
      error: (error) => {
        if (error.status == 400) {
          this.invalidPromo = true;
        }
      },
    });
  }
}
