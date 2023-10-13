import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditProductComponent } from './add-edit-product/add-edit-product.component';
import { ProductService } from './services/product.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IProduct } from './services/product.type';
import { CoreService } from './core/core.service';

export interface UserData {
  id: number;
  name: string;
  description: string;
  price: string;
  category: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'product-management-FE';

  displayedColumns: string[] = ['id', 'name', 'description', 'price', 'category', 'action'];
  dataSource!: MatTableDataSource<IProduct>

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _productService: ProductService,
    private _coreService: CoreService
  ) { }

  ngOnInit(): void {
    this.getProductList()
  }


  openAddEditProductForm() {
    const dialogRef = this._dialog.open(AddEditProductComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        val ?? this.getProductList()
      }
    })
  }

  getProductList() {
    this._productService.getProductList().subscribe({
      next: (res: any) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
      ,
      error: (err) => {
        console.log(err)
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteProduct(id: number) {
    this._productService.deleteProduct(id).subscribe({
      next: () => {
        // alert('Product successfully deleted!');
        this._coreService.openSnackBar('Product successfully deleted!', '')
        this.getProductList();
      },
      error: (err) => {
        console.error(err)
      }
    })
  }


  openEditForm(data: any) {
    this._dialog.open(AddEditProductComponent, {
      data,
    })
  }
}
