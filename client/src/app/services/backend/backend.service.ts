import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  backendurl = environment.BACKENDURL;
  constructor(
    private _httpClient: HttpClient,
    private toastrService: ToastrService,
    private router: Router,
  ) { }


  signup(data: SignupData): Observable<any> {
    const url = `${this.backendurl}/auth/signup`;
    return this._httpClient.post(url, data).pipe(
      map(value => {
        this.toastrService.success('You registered successfuly');
        this.router.navigate(['/']);
      }),
      catchError(error => {
        this.toastrService.error('register failed ' + error.message);
        return throwError(error);
      })

    );
  }

  isLogedIn(): Observable<any> {
    const url = `${this.backendurl}/auth/isLogedIn`;
    return this._httpClient.get(url);
  }

  isAdmin(): Observable<any> {
    const url = `${this.backendurl}/auth/isAdmin`;
    return this._httpClient.get(url);
  }

  login(data: { email: string, password: string }): Observable<User> {
    const url = `${this.backendurl}/auth/login`;
    return this._httpClient.post<{ user: User, token: string }>(url, data).pipe(
      map(result => {
        this.toastrService.success('login success ');
        localStorage.setItem('token', result.token);
        if (_.get(result, 'user.type') === 'admin') {
          this.router.navigate(['/admin']);
        }
        return result.user;
      }),
      catchError(error => {
        this.toastrService.error('login failed ' + error.message);
        return throwError(error);
      })
    );
  }

  // ================ products ===================
  getProducts(params): Observable<Product[]> {
    const url = `${this.backendurl}/products/getProducts`;
    return this._httpClient.get<Product[]>(url, {params});
  }

  getProductsByName(name: string): Observable<Product[]> {
    const url = `${this.backendurl}/products/getProducts`;
    return this._httpClient.get<Product[]>(url, { params: { name } });
  }

  addProduct(product: Product): Observable<Product> {
    const url = `${this.backendurl}/products/addProduct`;
    return this._httpClient.post<Product>(url, product).pipe(
      catchError(error => {
        this.toastrService.error('Adding product failed ' + error.message);
        return throwError(error);
      })

    );
  }

  editProduct(product: Product): Observable<Product> {
    const url = `${this.backendurl}/products/modifyProduct`;
    return this._httpClient.post<Product>(url, product).pipe(
      catchError(error => {
        this.toastrService.error('Edit product failed ' + error.message);
        return throwError(error);
      })

    );
  }

  // ================ Categories ===================
  getCategories(): Observable<Category[]> {
    const url = `${this.backendurl}/categories/getCategories`;
    return this._httpClient.get<Category[]>(url);
  }


  addCategory(name: string): Observable<Category> {
    const url = `${this.backendurl}/categories/addCategory`;
    return this._httpClient.post<Category>(url, {name}).pipe(
      catchError(error => {
        this.toastrService.error('Adding category failed ' + error.message);
        return throwError(error);
      })

    );
  }

    // ================ cart ===================
    getActiveCart(): Observable<Cart> {
      const url = `${this.backendurl}/carts/getActiveCart`;
      return this._httpClient.get<Cart>(url);
    }

    openCart(): Observable<Cart> {
      const url = `${this.backendurl}/carts/openCart`;
      return this._httpClient.post<Cart>(url, {}).pipe(
        catchError(error => {
          this.toastrService.error('open cart failed ' + error.message);
          return throwError(error);
        })
      );
    }

    addItem(data: Item): Observable<Item> {
      const url = `${this.backendurl}/carts/addItem`;
      return this._httpClient.post<Item>(url, data).pipe(
        catchError(error => {
          this.toastrService.error('add item failed ' + error.message);
          return throwError(error);
        })
      );
    }

    editItem(data: {id: number, amount: number}): Observable<any> {
      const url = `${this.backendurl}/carts/editItem`;
      return this._httpClient.post<any>(url, data).pipe(
        catchError(error => {
          this.toastrService.error('edit item failed ' + error.message);
          return throwError(error);
        })
      );
    }

    deleteItem(data: {id: number}): Observable<any> {
      const url = `${this.backendurl}/carts/deleteItem`;
      return this._httpClient.post<any>(url, data).pipe(
        catchError(error => {
          this.toastrService.error('delete item failed ' + error.message);
          return throwError(error);
        })
      );
    }

    deleteAllItems(data: {id: number}): Observable<any> {
      const url = `${this.backendurl}/carts/deleteAllItems`;
      return this._httpClient.post<any>(url, data).pipe(
        catchError(error => {
          this.toastrService.error('delete items failed ' + error.message);
          return throwError(error);
        })
      );
    }

    getOrders(): Observable<any> {
      const url = `${this.backendurl}/getOrders`;
      return this._httpClient.get<any>(url).pipe(
        catchError(error => {
          this.toastrService.error('get orders failed ' + error.message);
          return throwError(error);
        })
      );
    }

    getOrderById(id: number): Observable<any> {
      const url = `${this.backendurl}/getOrderById`;
      return this._httpClient.get<any>(url).pipe(
        catchError(error => {
          this.toastrService.error('get order failed failed ' + error.message);
          return throwError(error);
        })
      );
    }

    addOrder(data: {deliveryDate: string, city: string, street: string, creditCard: number}): Observable<any> {
      const url = `${this.backendurl}/orders/addOrder`;
      return this._httpClient.post<any>(url, data).pipe(
        map( orderId => {
          this.router.navigate(['/order-view']);
          return orderId;
        }),
        catchError(error => {
          this.toastrService.error('add  order failed ' + error.message);
          return throwError(error);
        })
      );
    }





  getToken(): string {
    return localStorage.getItem('token');
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(`failed: ${error.message}`);
      return of(result as T);
    };
  }
}

export interface SignupData {
  name: string;
  sureName: string;
  email: string;
  password: string;
  city: string;
  street: string;
  id: number;
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
  creationDate: Date;
  totalPrice: number;

}
export interface Item {
  id?: number;
  products_id?: number;
  productName?: string;
  amount: number;
  price?: number;
  totalPrice?: number;
}
export interface Order {
  id: number;
  cart: Cart;
}

export interface Category {
  id: number;
  name: string;
}

export interface Product {
  id?: number;
  name: string;
  price: number;
  image: string;
  categories_id?: number;
  categoryName?: string;
}
