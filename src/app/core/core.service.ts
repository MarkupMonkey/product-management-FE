import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddEditProductComponent } from '../add-edit-product/add-edit-product.component';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  durationInSeconds = 5;
  constructor(private _snackBar: MatSnackBar) { }
  openSnackBar(message: string, action: string = 'ok') {
    this._snackBar.open(message, action, {
      duration: 1000,
      verticalPosition: 'top'
    });
  }
}
