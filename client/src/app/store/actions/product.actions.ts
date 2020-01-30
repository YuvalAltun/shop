import { Action } from '@ngrx/store';
import { Product } from 'src/app/services/backend/backend.service';

export const LOAD_PRODUCTS = '[Products] Load Products';
export const LOAD_PRODUCTS_FAIL = '[Products] Load Products Fail';
export const LOAD_PRODUCTS_SUCCESS = '[Products] Load Products Success';

export const ADD_PRODUCTS = '[Products] Add Products';
export const ADD_PRODUCTS_FAIL = '[Products] Add Products Fail';
export const ADD_PRODUCTS_SUCCESS = '[Products] Add Products Success';

export const EDIT_PRODUCTS = '[Products] Edit Products';
export const EDIT_PRODUCTS_SUCCESS = '[Products] Edit Products Success';

export class LoadProducts implements Action {
    readonly type = LOAD_PRODUCTS;
    constructor(public payload: any) {}
}

export class LoadProductsFail implements Action {
    readonly type = LOAD_PRODUCTS_FAIL;
    constructor(public payload: any) {}
}

export class LoadProductsSuccess implements Action {
    readonly type = LOAD_PRODUCTS_SUCCESS;
    constructor(public payload: Product[]) {}
}

export class AddProducts implements Action {
    readonly type = ADD_PRODUCTS;
    constructor(public payload: Product) {}
}

export class AddProductsFail implements Action {
    readonly type = ADD_PRODUCTS_FAIL;
    constructor(public payload: any) {}
}

export class AddProductsSuccess implements Action {
    readonly type = ADD_PRODUCTS_SUCCESS;
    constructor(public payload: Product) {}
}

export class EditProducts implements Action {
    readonly type = EDIT_PRODUCTS;
    constructor(public payload: Product) {}
}

export class EditProductsSuccess implements Action {
    readonly type = EDIT_PRODUCTS_SUCCESS;
    constructor(public payload: Product) {}
}

export type ProductsActions = LoadProducts | LoadProductsFail | LoadProductsSuccess
 | AddProducts | AddProductsFail | AddProductsSuccess | EditProducts | EditProductsSuccess;
