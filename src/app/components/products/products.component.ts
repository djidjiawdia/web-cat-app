import { Component, OnInit } from '@angular/core';
import { catchError, map, Observable, of, startWith } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { AppDataState, DataStateEnum } from 'src/app/state/product.state';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products$: Observable<AppDataState<Product[]>> | null = null;
  readonly State = DataStateEnum;

  constructor(private _productsService: ProductsService) { }

  ngOnInit(): void {
  }

  onGetAllProducts() {
    this.products$ = this._productsService.getAllProducts().pipe(
      map(data => ({ state: DataStateEnum.LOADED, data })),
      startWith({ state: DataStateEnum.LOADING }),
      catchError(error => of({ state: DataStateEnum.ERROR, error: error.message }))
    );
  }
  onGetSelectedProducts() {
    this.products$ = this._productsService.getSelectedProducts().pipe(
      map(data => ({ state: DataStateEnum.LOADED, data })),
      startWith({ state: DataStateEnum.LOADING }),
      catchError(error => of({ state: DataStateEnum.ERROR, error: error.message }))
    );
  }

  onGetAvailableProducts() {
    this.products$ = this._productsService.getAvailableProducts().pipe(
      map(data => ({ state: DataStateEnum.LOADED, data })),
      startWith({ state: DataStateEnum.LOADING }),
      catchError(error => of({ state: DataStateEnum.ERROR, error: error.message }))
    );
  }

  onSearch(dataForm: any) {
    this.products$ = this._productsService.searchProducts(dataForm.keyword).pipe(
      map(data => ({ state: DataStateEnum.LOADED, data })),
      startWith({ state: DataStateEnum.LOADING }),
      catchError(error => of({ state: DataStateEnum.ERROR, error: error.message }))
    );
  }

  onSelect(p: Product) {
    this._productsService.select(p).subscribe(data => {
      p.selected = data.selected;
    });
  }

  onDelete(p: Product) {
    this._productsService.deleteProduct(p).subscribe(() => {
      this.onGetAllProducts();
    });
  }
}
