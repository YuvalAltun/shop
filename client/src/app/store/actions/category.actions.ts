import { Action } from '@ngrx/store';
import { Category } from 'src/app/services/backend/backend.service';

export const LOAD_CATEGORIES = '[Categories] Load Categories';
export const LOAD_CATEGORIES_FAIL = '[Categories] Load Categories Fail';
export const LOAD_CATEGORIES_SUCCESS = '[Categories] Load Categories Success';

export const ADD_CATEGORIES = '[Categories] Add Categories';
export const ADD_CATEGORIES_FAIL = '[Categories] Add Categories Fail';
export const ADD_CATEGORIES_SUCCESS = '[Categories] Add Categories Success';

export class LoadCategories implements Action {
    readonly type = LOAD_CATEGORIES;
}

export class LoadCategoriesFail implements Action {
    readonly type = LOAD_CATEGORIES_FAIL;
    constructor(public payload: any) {}
}

export class LoadCategoriesSuccess implements Action {
    readonly type = LOAD_CATEGORIES_SUCCESS;
    constructor(public payload: Category[]) {}
}

export class AddCategories implements Action {
    readonly type = ADD_CATEGORIES;
    constructor(public payload: string) {}
}

export class AddCategoriesFail implements Action {
    readonly type = ADD_CATEGORIES_FAIL;
    constructor(public payload: any) {}
}

export class AddCategoriesSuccess implements Action {
    readonly type = ADD_CATEGORIES_SUCCESS;
    constructor(public payload: Category) {}
}

export type CategoriesActions = LoadCategories | LoadCategoriesFail | LoadCategoriesSuccess
 | AddCategories | AddCategoriesFail | AddCategoriesSuccess;
