import { Product } from 'src/app/services/backend/backend.service';
import * as fromProducts from '../actions/product.actions';

export interface ProductState {
    data: Product[];
    loaded: boolean;
    loading: boolean;
    addInProgress: boolean;
}

export const initialProductsState: ProductState = {
    data: [],
    loaded: false,
    loading: false,
    addInProgress: false,
};

export const getProducts = (state: ProductState) => state.data;
export const getProductsLoaded = (state: ProductState) => state.loaded;
export const getProductsLoading = (state: ProductState) => state.loading;
export const getAddInProgress = (state: ProductState) => state.addInProgress;

export function productReducer(
    state: ProductState = initialProductsState,
    action: fromProducts.ProductsActions
): ProductState {
    switch (action.type) {
        case fromProducts.LOAD_PRODUCTS: {
            return {
                ...state,
                loading: true
            };
        }
        case fromProducts.LOAD_PRODUCTS_FAIL: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }
        case fromProducts.LOAD_PRODUCTS_SUCCESS: {
            return {
                ...state,
                data: action.payload,
                loading: false,
                loaded: true
            };
        }
        case fromProducts.ADD_PRODUCTS: {
            return {
                ...state,
                addInProgress: true
            };
        }
        case fromProducts.ADD_PRODUCTS_SUCCESS: {
            return {
                ...state,
                data: [...state.data, action.payload],
                addInProgress: false
            };
        }

        case fromProducts.ADD_PRODUCTS_SUCCESS: {
            return {
                ...state,
                data: [...state.data.filter( x => x.id !== action.payload.id), action.payload],
                addInProgress: false
            };
        }
        case fromProducts.EDIT_PRODUCTS_SUCCESS: {
            return {
                ...state,
                data: [...state.data.filter( x => x.id !== action.payload.id), action.payload],
                addInProgress: false
            };
        }
        case fromProducts.ADD_PRODUCTS_FAIL: {
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
