import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditProductComponent } from './add-edit-product/add-edit-product.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'product-management-FE';

  constructor(private _dialog: MatDialog) { }


  openAddEditProductForm() {
    this._dialog.open(AddEditProductComponent);
  }
}
