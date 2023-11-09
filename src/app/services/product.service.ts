import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './product.type';
import { environment } from 'src/environments/environment.dev';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  URL = environment.apiUrl
  constructor(private _http: HttpClient) { }

  getProductList(): Observable<any> {
    return this._http.get(`${ this.URL }/product`)
  }

  addProduct(data: Product): Observable<any> {
    return this._http.post(`${ this.URL }/product`, data)
  }

  updateProduct(data: Product, id: number): Observable<any> {
    return this._http.patch(`${ this.URL }/product/${ id }`, {
      ...data,
      id
    })
  }

  deleteProduct(id: number): Observable<any> {
    return this._http.delete(`${ this.URL }/product/${ id }`)
  }
}
