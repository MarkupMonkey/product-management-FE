import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditProductComponent } from './add-edit-product/add-edit-product.component';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'product-management-FE';

  constructor(
    private _dialog: MatDialog,
    private _productService: ProductService
  ) { }

  ngOnInit(): void {
    this.getProductList
  }


  openAddEditProductForm() {
    this._dialog.open(AddEditProductComponent);
  }

  getProductList() {
    this._productService.getProductList().subscribe({
      next: (res) => {

      }
      ,
      error: (err) => {
        console.log(err)
      }
    })
  }
}
