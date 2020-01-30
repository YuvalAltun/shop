import { User } from 'src/app/services/backend/backend.service';
import * as fromActions from './../actions/auth.actions';

export const initialAuthState: AuthState = {
    isAuthenticated: false,
    user: null,
    errorMessage: null,
    inProcess: false
};

export interface AuthState {
    // is a user authenticated?
    isAuthenticated: boolean;
    // if authenticated, there should be a user object
    user: User | null;
    // error message
    errorMessage: string | null;
    // is waiting for result
    inProcess: boolean;
}

export function authReducer(
    state: AuthState = initialAuthState,
    action: fromActions.AuthActions
): AuthState {
    switch (action.type) {
        case fromActions.LOGIN: {
            return {
                ...state,
                errorMessage: null,
                inProcess: true
            };
        }
        case fromActions.LOGOUT: {
            return {
                ...state,
                errorMessage: null,
                user: null,
                isAuthenticated: false
            };
        }
        case fromActions.SIGNUP: {
            return {
                ...state,
                errorMessage: null,
                inProcess: true
            };
        }
        case fromActions.LOGIN_FAIL: {
            return {
                ...state,
                errorMessage: action.payload.message,
                inProcess: false
            };
        }
        case fromActions.SIGNUP_FAIL: {
            return {
                ...state,
                errorMessage: action.payload.message,
                inProcess: false
            };
        }
        case fromActions.SIGNUP_SUCCESS: {
            return {
                ...state,
                errorMessage: null,
                inProcess: false
            };
        }
        case fromActions.LOGIN_SUCCESS: {
            return {
                ...state,
                errorMessage: null,
                inProcess: false,
                user: action.payload,
                isAuthenticated: true
            };
        }
        default:
            return state;
    }
}

export const getIsAuthenticated = (state: AuthState) => state.isAuthenticated;
export const getUser = (state: AuthState) => state.user;
export const getErrorMessage = (state: AuthState) => state.errorMessage;
export const getInProcess = (state: AuthState) => state.inProcess;
