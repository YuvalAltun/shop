import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as categoryActions from '../actions/category.actions';
import { BackendService } from '../../services/backend/backend.service';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';


@Injectable()
export class CategoryEffects {

  constructor(
    private actions$: Actions,
    private _backendService: BackendService,
    private router: Router,
  ) {}

  // effects go here
  @Effect()
  $loadCategories = this.actions$.pipe(
    ofType<categoryActions.LoadCategories>(categoryActions.LOAD_CATEGORIES),
    switchMap((action) => {
          return this._backendService.getCategories().pipe(
              map((data => new categoryActions.LoadCategoriesSuccess(data))),
              catchError(error => of(new categoryActions.LoadCategoriesFail(error)))
          );
      })
  );

  @Effect()
  $addCategory = this.actions$.pipe(
    ofType<categoryActions.AddCategories>(categoryActions.ADD_CATEGORIES),
    switchMap((action) => {
          return this._backendService.addCategory(action.payload).pipe(
              map((data => new categoryActions.AddCategoriesSuccess(data))),
              catchError(error => of(new categoryActions.AddCategoriesFail(error)))
          );
      })
  );
}
