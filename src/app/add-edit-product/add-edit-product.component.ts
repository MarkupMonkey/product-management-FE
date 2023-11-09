import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import { Product, ProductForm } from '../services/product.type';

export type ProductModal = {
  mode: 'create' | 'update';
}

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.scss']
})
export class AddEditProductComponent implements OnInit {
  fileName: string = '';
  productForm!: FormGroup;
  @Input('mode')
  mode: 'create' | 'update' = 'create';

  constructor(
    private _fb: FormBuilder,
    private productService: ProductService,
    private _dialogRef: MatDialogRef<AddEditProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService) {

      this.productForm = new FormGroup<ProductForm>({
        id: new FormControl(),
        name: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
        description: new FormControl('', [Validators.required, Validators.maxLength(255)]),
        price: new FormControl( '', [Validators.required, Validators.pattern("^[0-9]*$")]),
        category: new FormControl('', [Validators.required]),
        photos: new FormControl(['', ''], )
      });

  }
  ngOnInit(): void {
    // this.productForm.patchValue(this.data);

  }
  get name() {
    return this.productForm.get('name');
  }
  get description() {
    return this.productForm.get('description');
  }
  get price() {
    return this.productForm.get('price');
  }
  get category() {
    return this.productForm.get('category');
  }

  get photos(){
    return this.productForm.get('photos')
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
      if (this.data) {
        return this.productService.updateProduct(this.productForm.value, this.data.id).subscribe({
          next: () => {
            // alert('Product successfully updated!');
            this._coreService.openSnackBar('Product detail successfully updated!')
            this._dialogRef.close(true);
          },
          error: (err) => {
            console.error(err)
          },
        })
      } else {
        console.log(this.productForm.value)
        return this.productService.addProduct(this.productForm.value).subscribe({
          next: () => {
            alert('Product added successfully');
            this._coreService.openSnackBar('Product added successfully!')
            this._dialogRef.close(true);
          },
          error: (err) => {
            console.error(err)
          },
        })

      }
    }

  }
}
