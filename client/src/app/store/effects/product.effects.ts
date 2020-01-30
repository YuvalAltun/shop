import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as productActions from '../actions/product.actions';
import { BackendService } from '../../services/backend/backend.service';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';


@Injectable()
export class ProductEffects {

  constructor(
    private actions$: Actions,
    private _backendService: BackendService,
  ) {}

  // effects go here
  @Effect()
  $loadProducts = this.actions$.pipe(
    ofType<productActions.LoadProducts>(productActions.LOAD_PRODUCTS),
    switchMap((action) => {
          return this._backendService.getProducts(action.payload).pipe(
              map((data => new productActions.LoadProductsSuccess(data))),
              catchError(error => of(new productActions.LoadProductsFail(error)))
          );
      })
  );

  @Effect()
  $addProduct = this.actions$.pipe(
    ofType<productActions.AddProducts>(productActions.ADD_PRODUCTS),
    switchMap((action) => {
          return this._backendService.addProduct(action.payload).pipe(
              map((data => new productActions.AddProductsSuccess(data))),
              catchError(error => of(new productActions.AddProductsFail(error)))
          );
      })
  );

  @Effect()
  $editProduct = this.actions$.pipe(
    ofType<productActions.EditProducts>(productActions.EDIT_PRODUCTS),
    switchMap((action) => {
          return this._backendService.editProduct(action.payload).pipe(
              map((data => new productActions.EditProductsSuccess(data))),
              catchError(error => of(new productActions.AddProductsFail(error)))
          );
      })
  );
}
