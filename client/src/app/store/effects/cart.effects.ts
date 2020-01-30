import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as cartActions from '../actions/cart.actions';
import { BackendService } from '../../services/backend/backend.service';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';


@Injectable()
export class CartEffects {

  constructor(
    private actions$: Actions,
    private _backendService: BackendService,
  ) {}

  // effects go here
  @Effect()
  $loadCart = this.actions$.pipe(
    ofType<cartActions.LoadCart>(cartActions.LOAD_CART),
    switchMap((action) => {
          return this._backendService.getActiveCart().pipe(
              map((data => new cartActions.LoadCartSuccess(data))),
              catchError(error => of(new cartActions.LoadCartFail(error)))
          );
      })
  );

  @Effect()
  $addCart = this.actions$.pipe(
    ofType<cartActions.AddCart>(cartActions.ADD_CART),
    switchMap((action) => {
          return this._backendService.openCart().pipe(
              map((data => new cartActions.AddCartSuccess(data))),
              catchError(error => of(new cartActions.AddCartFail(error)))
          );
      })
  );

  @Effect()
  $editCartItem = this.actions$.pipe(
    ofType<cartActions.EditCartItem>(cartActions.EDIT_CART_ITEM),
    switchMap((action) => {
          return this._backendService.editItem(action.payload).pipe(
              map((data => new cartActions.EditCartItemSuccess(data))),
              catchError(error => of(new cartActions.EditCartItemFail(error)))
          );
      })
  );

  @Effect()
  $addItem = this.actions$.pipe(
    ofType<cartActions.AddCartItem>(cartActions.ADD_CART_ITEM),
    switchMap((action) => {
          return this._backendService.addItem(action.payload).pipe(
              map((data => new cartActions.AddCartItemSuccess(data))),
              catchError(error => of(new cartActions.AddCartItemFail(error)))
          );
      })
  );

  @Effect()
  $removeItem = this.actions$.pipe(
    ofType<cartActions.RemoveCartItem>(cartActions.REMOVE_CART_ITEM),
    switchMap((action) => {
          return this._backendService.deleteItem({id: action.payload}).pipe(
              map((data => new cartActions.RemoveCartItemSuccess(data))),
              catchError(error => of(new cartActions.RemoveCartItemFail(error)))
          );
      })
  );
}
