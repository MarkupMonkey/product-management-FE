import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from './product.type';
import { environment } from 'src/environments/environment.dev';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  URL = environment.apiUrl
  constructor(private _http: HttpClient) { }

  getProductList() {
    return this._http.get(`${ this.URL }/product`)
  }

  addProduct(data: IProduct) {
    return this._http.post(`${ this.URL }/product`, data)
  }
}
