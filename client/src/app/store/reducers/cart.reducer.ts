import { Cart, Item } from 'src/app/services/backend/backend.service';
import * as fromCart from '../actions/cart.actions';

export interface CartState {
    data: Cart;
    loaded: boolean;
    loading: boolean;
    addInProgress: boolean;
}

export const initialCartState: CartState = {
    data: null,
    loaded: false,
    loading: false,
    addInProgress: false,
};

export const getCart = (state: CartState) => state.data;
export const getCartLoaded = (state: CartState) => state.loaded;
export const getCartLoading = (state: CartState) => state.loading;
export const getAddInProgress = (state: CartState) => state.addInProgress;

export function cartReducer(
    state: CartState = initialCartState,
    action: fromCart.CartActions
): CartState {
    switch (action.type) {
        case fromCart.LOAD_CART: {
            return {
                ...state,
                loading: true
            };
        }
        case fromCart.LOAD_CART_FAIL: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }
        case fromCart.LOAD_CART_SUCCESS: {
            return {
                ...state,
                data: action.payload,
                loading: false,
                loaded: true
            };
        }
        case fromCart.ADD_CART: {
            return {
                ...state,
                loading: true
            };
        }
        case fromCart.ADD_CART_FAIL: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }
        case fromCart.ADD_CART_SUCCESS: {
            return {
                ...state,
                data: action.payload,
                loading: false,
                loaded: true
            };
        }
        case fromCart.ADD_CART_ITEM: {
            return {
                ...state,
                addInProgress: true
            };
        }
        case fromCart.ADD_CART_ITEM_SUCCESS: {
            return {
                ...state,
                data: {...state.data, items: [...state.data.items, action.payload]},
                addInProgress: false
            };
        }

        case fromCart.ADD_CART_ITEM_FAIL: {
            return {
                ...state,
                addInProgress: false
            };
        }
        case fromCart.EDIT_CART_ITEM: {
            return {
                ...state,
                addInProgress: true
            };
        }
        case fromCart.EDIT_CART_ITEM_SUCCESS: {
            return {
                ...state,
                data: {...state.data, items: state.data.items.map( x => x.id === action.payload.id ?
                    {...x, amount: action.payload.amount} : x)},
                addInProgress: false
            };
        }

        case fromCart.EDIT_CART_ITEM_FAIL: {
            return {
                ...state,
                addInProgress: false
            };
        }
        case fromCart.REMOVE_CART_ITEM: {
            return {
                ...state,
                addInProgress: true
            };
        }
        case fromCart.REMOVE_CART_ITEM_SUCCESS: {
            return {
                ...state,
                data: {...state.data, items: state.data.items.filter( x => x.id !== action.payload)},
                addInProgress: false
            };
        }

        case fromCart.REMOVE_CART_ITEM_FAIL: {
            return {
                ...state,
                addInProgress: false
            };
        }
        default: {
            return {...state};
        }
    }
    return state;
}
