import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as orderActions from '../actions/order.actions';
import * as cartActions from '../actions/cart.actions';
import { BackendService } from '../../services/backend/backend.service';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { createAction } from '@ngrx/store';


@Injectable()
export class OrderEffects {

  constructor(
    private actions$: Actions,
    private _backendService: BackendService,
  ) {}



  @Effect()
  $placeOrder = this.actions$.pipe(
    ofType<orderActions.PlaceOrder>(orderActions.PLACE_ORDER),
    switchMap((action) => {
          return this._backendService.addOrder(action.payload).pipe(
              switchMap((data => [
                new cartActions.DeleteCart(),
                new orderActions.OrderSuccess(data)
              ])),
              catchError(error => of(new orderActions.OrderFail(error)))
          );
      })
  );

}
