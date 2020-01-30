import { Action } from '@ngrx/store';
import { User, SignupData } from 'src/app/services/backend/backend.service';

export const LOGIN = '[Auth] Login';
export const LOGIN_FAIL = '[Auth] Login Fail';
export const LOGIN_SUCCESS = '[Auth] Login Success';
export const LOGOUT = '[Auth] Lougout';

export const SIGNUP = '[Auth] Signup';
export const SIGNUP_FAIL = '[Auth] Signup Fail';
export const SIGNUP_SUCCESS = '[Auth] Signup Success';



export class Login implements Action {
    readonly type = LOGIN;
    constructor(public payload: {email: string, password: string}) {}
}

export class Logout implements Action {
    readonly type = LOGOUT;
    constructor(public payload: any) {}
}

export class Signup implements Action {
    readonly type = SIGNUP;
    constructor(public payload: SignupData) {}
}

export class LoginFail implements Action {
    readonly type = LOGIN_FAIL;
    constructor(public payload: any) {}
}

export class LoginSuccess implements Action {
    readonly type = LOGIN_SUCCESS;
    constructor(public payload: User) {}
}

export class SignupFail implements Action {
    readonly type = SIGNUP_FAIL;
    constructor(public payload: any) {}
}

export class SignupSuccess implements Action {
    readonly type = SIGNUP_SUCCESS;
    constructor(public payload: any) {}
}

export type AuthActions = Signup | SignupFail | SignupSuccess | Login | LoginFail | LoginSuccess | Logout;
