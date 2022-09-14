import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({providedIn: 'root'})
export class ProductsService {
  constructor(private _httpClient: HttpClient) { }

  getAllProducts(): Observable<Product[]> {
    let host = environment.host;
    return this._httpClient.get<Product[]>(`${host}/products`);
  }

  getSelectedProducts(): Observable<Product[]> {
    let host = environment.host;
    return this._httpClient.get<Product[]>(`${host}/products?selected=true`);
  }

  getAvailableProducts(): Observable<Product[]> {
    let host = environment.host;
    return this._httpClient.get<Product[]>(`${host}/products?available=true`);
  }

  searchProducts(keyword: string): Observable<Product[]> {
    let host = environment.host;
    return this._httpClient.get<Product[]>(`${host}/products?name_like=${keyword}`);
  }

  select(produit: Product): Observable<Product> {
    let host = environment.host;
    produit.selected = !produit.selected;
    return this._httpClient.put<Product>(`${host}/products/${produit.id}`, produit);
  }

  deleteProduct(produit: Product): Observable<void> {
    let host = environment.host;
    produit.selected = !produit.selected;
    return this._httpClient.delete<void>(`${host}/products/${produit.id}`);
  }

}
