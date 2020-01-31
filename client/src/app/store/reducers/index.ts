import { ActionReducerMap, createSelector, MetaReducer } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as fromProducts from './products.reducer';
import * as fromAuth from './auth.reducer';
import * as fromCategories from './categories.reducer';
import * as fromCart from './cart.reducer';
import * as fromOrder from './order.reducer';



export interface State {
  products: fromProducts.ProductState;
  auth: fromAuth.AuthState;
  categories: fromCategories.CategoryState;
  cart: fromCart.CartState;
  order: fromOrder.OrderState;
}

export const reducers: ActionReducerMap<State> = {
  products: fromProducts.productReducer,
  auth: fromAuth.authReducer,
  categories: fromCategories.categoryReducer,
  cart: fromCart.cartReducer,
  order: fromOrder.orderReducer
};

export const getAuthState = (state: State) => state.auth;
export const getProductState = (state: State) => state.products;
export const getCategoriesState = (state: State) => state.categories;
export const getCartState = (state: State) => state.cart;
export const getOrderState = (state: State) => state.order;

export const getUser = createSelector(getAuthState, fromAuth.getUser);
export const getAuthInProcess = createSelector(getAuthState, fromAuth.getInProcess);
export const getAuthError = createSelector(getAuthState, fromAuth.getErrorMessage);
export const getIsAuthenticated = createSelector(getAuthState, fromAuth.getIsAuthenticated);

export const getCategoriesIsLoaded = createSelector(getCategoriesState, fromCategories.getCategoriesLoaded);
export const getCategoriesIsLoading = createSelector(getCategoriesState, fromCategories.getCategoriesLoading);
export const getCategories = createSelector(getCategoriesState, fromCategories.getCategories);
export const getCategoriesAddInProgress = createSelector(getCategoriesState, fromCategories.getAddInProgress);

export const getProductsIsLoaded = createSelector(getProductState, fromProducts.getProductsLoaded);
export const getProductsIsLoading = createSelector(getProductState, fromProducts.getProductsLoading);
export const getProducts = createSelector(getProductState, fromProducts.getProducts);
export const getProductsAddInProgress = createSelector(getProductState, fromProducts.getAddInProgress);

export const getCartIsLoaded = createSelector(getCartState, fromCart.getCartLoaded);
export const getCartIsLoading = createSelector(getCartState, fromCart.getCartLoading);
export const getCart = createSelector(getCartState, fromCart.getCart);
export const getCartAddInProgress = createSelector(getCartState, fromCart.getAddInProgress);
export const getlastCart = createSelector(getCartState, fromCart.getlastCart);

export const getOrderLoaded = createSelector(getOrderState, fromOrder.getOrderLoaded);
export const getOrderIsLoading = createSelector(getOrderState, fromOrder.getOrderLoading);
export const getOrder = createSelector(getOrderState, fromOrder.getOrder);



export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
