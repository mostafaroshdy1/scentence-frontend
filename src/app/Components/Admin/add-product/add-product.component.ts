import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiAdminService } from '../../../Services/api-admin.service';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule],
  providers: [ApiAdminService],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent implements OnInit {
  isEdit = false;
  loading = false;
  error: any;
  constructor(
    private router: Router,
    private apiService: ApiAdminService
  ) {}

  ngOnInit(): void {
    if (this.router.url.split('/')[3] === 'edit') {
      this.apiService.getProductById(this.router.url.split('/')[4]).subscribe({
        next: (data: any) => {
          console.log(data);
          this.productForm.patchValue({
            title: data.title,
            description: data.description,
            price: data.price,
            category: data.category,
            stock: data.stock,
          });
        },
        error: (err: HttpErrorResponse) => {
          console.error('Error', err.message);
          this.error = err.message;
          console.log(this.error);
          this.loading = false;
        },
      });
      this.isEdit = true;
    } else {
      this.isEdit = false;
    }
  }

  productForm=new FormGroup({
    title: new FormControl("",Validators.required),
    description: new FormControl("",Validators.required),
    price: new FormControl("",Validators.required),
    category: new FormControl(null,Validators.required),
    stock: new FormControl("",Validators.required),
    images: new FormControl(null,Validators.required)
  });


  addImage(event: any) {
    const files = event.target.files;
    if(files?.length < 4 || files?.length > 4  ){
      this.error="Please Enter 4 Images";
      return;
    }

    if (files?.length > 0) {
      this.productForm.patchValue({
        images: files,
      });
    }
  }

  editProduct() {
    if (this.productForm.invalid) {
      this.error = 'Please fill in all required fields.';
      this.loading = false;
      return;
    }
    this.loading = true;
    const formData = new FormData();
    const formValue: any = this.productForm.value;
    console.log(formValue);
    Object.keys(formValue).forEach((key) => {
      if (key === 'images') {
        const images = formValue[key];
        if (images?.length) {
          for (const image of images) {
            formData.append('image', image);
          }
        }
      } else {
        formData.append(key, formValue[key]);
      }
    });

    this.apiService
      .updateProductById(this.router.url.split('/')[4], formData)
      .subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (err: HttpErrorResponse) => {
          this.error = this.getErrorMessage(err);
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
          this.router.navigate(['/admin']);
        },
      });
  }

  addProduct() {
    if (this.productForm.invalid) {
      this.error = 'Please fill in all required fields.';
      this.loading = false;
      return;
    }

    this.loading = true;
    const formData = new FormData();
    const formValue: any = this.productForm.value;
    console.log(formValue);
    Object.keys(formValue).forEach((key) => {
      if (key === 'images') {
        const images = formValue[key];
        for (const image of images) {
          formData.append('image', image);
        }
      } else {
        formData.append(key, formValue[key]);
      }
    });

    this.apiService.createProduct(formData).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        this.error = this.getErrorMessage(err);
        console.log(this.error);

        this.loading = false;
      },
      complete: () => {
        this.loading = false;
        this.router.navigate(['/admin']);
      },
    });
  }

  private getErrorMessage(error: HttpErrorResponse): string {
    let errorMessage = 'An error occurred';
    if ( error.error?.errors?.length > 0) {
      errorMessage = error.error.errors.map((e: any) => e.msg).join('<br>');
    }
    return errorMessage;
  }
}
