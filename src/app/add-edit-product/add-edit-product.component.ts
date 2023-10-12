import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.scss']
})
export class AddEditProductComponent {
  fileName: string = '';
  productForm: FormGroup;

  constructor(private _fb: FormBuilder) {
    this.productForm = this._fb.group({
      name: '',
      description: '',
      price: '',
      category: '',
      photos: ['', '', ''],
    })
  }

  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.fileName = fileInput.files[0].name;
    }
  }

  onFormSubmit() {
    if (this.productForm.valid) {
      console.log(this.productForm.value)
    }
  }
}
