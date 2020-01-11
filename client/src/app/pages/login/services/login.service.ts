import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { BackendService } from 'src/app/services/backend/backend.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
   loginData: LoginData = {
    id: null,
    email: null,
    password: null,
    passwordConfirmed: null,
    city: null,
    street: null,
    name: null,
    lastName: null
  };
  constructor(private _backendService: BackendService) { }
  setLoginData(values: Step1 | Step2) {
    Object.assign(this.loginData, values);
    console.log(this.loginData);
  }

  submit() {
    return this._backendService.signup(this.loginData);
  }
}

export interface Step1 {
  id: number;
  email: string;
  password: string;
  passwordConfirmed: string;
}

export interface Step2 {
  city: string;
  street: string;
  name: string;
  lastName: string;
}

export interface LoginData extends Step1, Step2 {

}


