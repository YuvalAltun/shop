import { Action } from '@ngrx/store';
import { Cart, Item } from 'src/app/services/backend/backend.service';

export const LOAD_CART = '[Carts] Load Cart';
export const LOAD_CART_FAIL = '[Carts] Load Cart Fail';
export const LOAD_CART_SUCCESS = '[Carts] Load Cart Success';

export const ADD_CART = '[Carts] Add Cart';
export const ADD_CART_FAIL = '[Carts] Add Cart Fail';
export const ADD_CART_SUCCESS = '[Carts] Add Cart Success';

export const EDIT_CART_ITEM = '[Carts] Edit Cart Item';
export const EDIT_CART_ITEM_FAIL = '[Carts] Edit Cart Item Fail';
export const EDIT_CART_ITEM_SUCCESS = '[Carts] Edit Cart Item Success';

export const ADD_CART_ITEM = '[Carts] Add Cart Item';
export const ADD_CART_ITEM_FAIL = '[Carts] Add Cart Item Fail';
export const ADD_CART_ITEM_SUCCESS = '[Carts] Add Cart Item Success';

export const REMOVE_CART_ITEM = '[Carts] Remove Cart Item';
export const REMOVE_CART_ITEM_FAIL = '[Carts] Remove Cart Item Fail';
export const REMOVE_CART_ITEM_SUCCESS = '[Carts] Remove Cart Item Success';


export class LoadCart implements Action {
    readonly type = LOAD_CART;
}

export class LoadCartFail implements Action {
    readonly type = LOAD_CART_FAIL;
    constructor(public payload: any) {}
}

export class LoadCartSuccess implements Action {
    readonly type = LOAD_CART_SUCCESS;
    constructor(public payload: Cart) {}
}

export class AddCart implements Action {
    readonly type = ADD_CART;
}

export class AddCartFail implements Action {
    readonly type = ADD_CART_FAIL;
    constructor(public payload: any) {}
}

export class AddCartSuccess implements Action {
    readonly type = ADD_CART_SUCCESS;
    constructor(public payload: Cart) {}
}

export class EditCartItem implements Action {
    readonly type = EDIT_CART_ITEM;
    constructor(public payload: any) {}
}

export class EditCartItemFail implements Action {
    readonly type = EDIT_CART_ITEM_FAIL;
    constructor(public payload: any) {}
}

export class EditCartItemSuccess implements Action {
    readonly type = EDIT_CART_ITEM_SUCCESS;
    constructor(public payload: {id: number, amount: number}) {}
}

export class AddCartItem implements Action {
    readonly type = ADD_CART_ITEM;
    constructor(public payload: Item) {}
}

export class AddCartItemFail implements Action {
    readonly type = ADD_CART_ITEM_FAIL;
    constructor(public payload: any) {}
}

export class AddCartItemSuccess implements Action {
    readonly type = ADD_CART_ITEM_SUCCESS;
    constructor(public payload: Item) {}
}

export class RemoveCartItem implements Action {
    readonly type = REMOVE_CART_ITEM;
    constructor(public payload: number) {}
}

export class RemoveCartItemFail implements Action {
    readonly type = REMOVE_CART_ITEM_FAIL;
    constructor(public payload: any) {}
}

export class RemoveCartItemSuccess implements Action {
    readonly type = REMOVE_CART_ITEM_SUCCESS;
    constructor(public payload: number) {}
}



export type CartActions = LoadCart | LoadCartFail | LoadCartSuccess
                           | AddCart | AddCartFail | AddCartSuccess
                           | EditCartItem | EditCartItemFail | EditCartItemSuccess
                           | AddCartItem | AddCartItemFail | AddCartItemSuccess
                           | RemoveCartItem | RemoveCartItemFail | RemoveCartItemSuccess;
