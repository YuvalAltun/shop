import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as authActions from './../actions/auth.actions';
import { BackendService } from './../../services/backend/backend.service';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private _backendService: BackendService 
  ) {}

  // effects go here
  @Effect()
  $signup = this.actions$.pipe(
    ofType<authActions.AuthActions>(authActions.SIGNUP),
    switchMap((action) => {
          return this._backendService.signup(action.payload).pipe(
              map((data => new authActions.SignupSuccess(data))),
              catchError(error => of(new authActions.SignupFail(error)))
          );
      })
  );

  @Effect()
  $login = this.actions$.pipe(
    ofType<authActions.AuthActions>(authActions.LOGIN),
    switchMap((action) => {
          return this._backendService.login(action.payload).pipe(
              map((data => {
                return new authActions.LoginSuccess(data);
              })
                ),
              catchError(error => of(new authActions.LoginFail(error)))
          );
      })
  );


}
