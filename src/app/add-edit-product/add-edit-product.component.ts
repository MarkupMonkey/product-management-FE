import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { IProduct } from '../services/product.type';
import { Observable } from 'rxjs';
import { Dialog, DialogRef } from '@angular/cdk/dialog';
@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.scss']
})
export class AddEditProductComponent {
  fileName: string = '';
  productForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private productService: ProductService,
    private _dialogRef: DialogRef<AddEditProductComponent>
  ) {
    this.productForm = this._fb.group({
      name: '',
      description: '',
      price: '',
      category: '',
      photos: ['', '', ''],
    })
  }

  onFileSelected(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.fileName = fileInput.files[0].name;
    }
  }

  onFormSubmit() {
    if (this.productForm.valid) {
      console.log(this.productForm.value)
      return this.productService.addProduct(this.productForm.value).subscribe({
        next: () => {
          alert('Product added successfully');
          this._dialogRef.close();
        },
        error: (err) => {
          console.error(err)
        },
      })
    }

  }
}
