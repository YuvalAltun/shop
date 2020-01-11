import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
backendurl = environment.BACKENDURL;
  constructor(private _httpClient: HttpClient) { }


  signup(data: any) {
    const url = `${this.backendurl}/auth/signup`;
    return this._httpClient.post(url, data);
  }

  login(data: any) {
    const url = `${this.backendurl}/auth/login`;
    return this._httpClient.post(url, data);
  }
}


export interface User {
  id: number;
  firstName: string;
  surname: string;
  email: string;
}
export interface Cart {
  id: number;
  items: Item[];
  totalPrice: number;

}
export interface Item {
  id: number;
  productId: number;
  productName: string;
  amount: number;
  totalPrice: number;
}
export interface Order {
  id: number;
  cart: Cart;
}