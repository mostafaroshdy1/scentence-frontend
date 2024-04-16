import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
   
  regForm=new FormGroup({
    name: new FormControl ('', Validators.required),
    email:new FormControl ('', [Validators.required, Validators.email]),
    phone: new FormControl ('', [Validators.required, Validators.pattern(/^\+?[0-9]+$/)]),
    secPhone: new FormControl ('', Validators.pattern(/^\+?[0-9]+$/)),
    city: new FormControl ('', Validators.required),
    area: new FormControl ('', Validators.required),
    street: new FormControl ('', Validators.required),
    building: new FormControl ('', Validators.required),
    floor: new FormControl ('', Validators.required),
    apartment: new FormControl ('', Validators.required),
    extra: new FormControl (''),
    flexRadioDefault: new FormControl ('flexRadioDefault1', Validators.required)
  });

  get nameValid(){
    return this.regForm.controls['name'].valid || this.regForm.controls['name'].untouched;
  }
  get emailValid(){
    return this.regForm.controls['email'].valid || this.regForm.controls['email'].untouched;
  }
  get phoneValid(){
    return this.regForm.controls['phone'].valid || this.regForm.controls['phone'].untouched;
  }
  get secPhoneValid(){
    return this.regForm.controls['secPhone'].valid || this.regForm.controls['secPhone'].untouched;
  }
  get cityValid(){
    return this.regForm.controls['city'].valid || this.regForm.controls['city'].untouched;
  }
  get areaValid(){
    return this.regForm.controls['area'].valid || this.regForm.controls['area'].untouched;
  }
  get streetValid(){
    return this.regForm.controls['street'].valid || this.regForm.controls['street'].untouched;
  }
  get buildingValid(){
    return this.regForm.controls['building'].valid || this.regForm.controls['building'].untouched;
  }
  get floorValid(){
    return this.regForm.controls['floor'].valid || this.regForm.controls['floor'].untouched;
  }
  get apartmentValid(){
    return this.regForm.controls['apartment'].valid || this.regForm.controls['apartment'].untouched;
  }
  get paymentMethodValid(){
    return this.regForm.controls['flexRadioDefault'].valid || this.regForm.controls['flexRadioDefault'].untouched;
  }

  submitForm(){
    // console.log(this.regForm.value);
  }


}
