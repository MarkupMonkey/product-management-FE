import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { IProduct } from '../services/product.type';
import { Observable } from 'rxjs';
import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.scss']
})
export class AddEditProductComponent implements OnInit {
  fileName: string = '';
  productForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private productService: ProductService,
    private _dialogRef: MatDialogRef<AddEditProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService) {

    this.productForm = this._fb.group({
      name: '',
      description: '',
      price: '',
      category: '',
      photos: ['', '', ''],
    })
  }
  ngOnInit(): void {
    this.productForm.patchValue(this.data)
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
