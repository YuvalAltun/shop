import { Order } from 'src/app/services/backend/backend.service';
import * as fromOrders from '../actions/order.actions';

export interface OrderState {
    data: Order;
    loaded: boolean;
    loading: boolean;
}

export const initialOrdersState: OrderState = {
    data: null,
    loaded: false,
    loading: false,
};

export const getOrder = (state: OrderState) => state.data;
export const getOrderLoaded = (state: OrderState) => state.loaded;
export const getOrderLoading = (state: OrderState) => state.loading;


export function orderReducer(
    state: OrderState = initialOrdersState,
    action: fromOrders.OrderActions
): OrderState {
    switch (action.type) {
        case fromOrders.ORDER_SUCCESS: {
            return {
                ...state,
                data: action.payload,

            };
        }

        default: {
            return {...state};
        }
    }
    return state;
}
