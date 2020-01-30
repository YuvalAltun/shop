import { Category } from 'src/app/services/backend/backend.service';
import * as fromCategories from '../actions/category.actions';

export interface CategoryState {
    data: Category[];
    loaded: boolean;
    loading: boolean;
    addInProgress: boolean;
}

export const initialCategoriesState: CategoryState = {
    data: [],
    loaded: false,
    loading: false,
    addInProgress: false,
};

export const getCategories = (state: CategoryState) => state.data;
export const getCategoriesLoaded = (state: CategoryState) => state.loaded;
export const getCategoriesLoading = (state: CategoryState) => state.loading;
export const getAddInProgress = (state: CategoryState) => state.addInProgress;

export function categoryReducer(
    state: CategoryState = initialCategoriesState,
    action: fromCategories.CategoriesActions
): CategoryState {
    switch (action.type) {
        case fromCategories.LOAD_CATEGORIES: {
            return {
                ...state,
                loading: true
            };
        }
        case fromCategories.LOAD_CATEGORIES_FAIL: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }
        case fromCategories.LOAD_CATEGORIES_SUCCESS: {
            return {
                ...state,
                data: action.payload,
                loading: false,
                loaded: true
            };
        }
        case fromCategories.ADD_CATEGORIES: {
            return {
                ...state,
                addInProgress: true
            };
        }
        case fromCategories.ADD_CATEGORIES_SUCCESS: {
            return {
                ...state,
                data: [...state.data, action.payload],
                addInProgress: false
            };
        }
        case fromCategories.ADD_CATEGORIES_FAIL: {
            return {
                ...state,
                addInProgress: false
            };
        }
    }
    return state;
}
