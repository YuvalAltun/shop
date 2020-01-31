import { Action } from '@ngrx/store';
import { Order } from 'src/app/services/backend/backend.service';

export const PLACE_ORDER = '[Orders] Order';
export const ORDER_FAIL = '[Orders] Order Fail';
export const ORDER_SUCCESS = '[Orders] Order Success';

export class PlaceOrder implements Action {
    readonly type = PLACE_ORDER;
    constructor(public payload: any) {}
}

export class OrderFail implements Action {
    readonly type = ORDER_FAIL;
    constructor(public payload: any) {}
}

export class OrderSuccess implements Action {
    readonly type = ORDER_SUCCESS;
    constructor(public payload: Order) {}
}


export type OrderActions = PlaceOrder | OrderSuccess | OrderFail;
