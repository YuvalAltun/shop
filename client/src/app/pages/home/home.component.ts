import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from './../../store';
import * as fromActions from './../../store/actions';
import { Subject, Observable } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Cart, Product } from 'src/app/services/backend/backend.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private unsubscribe: Subject<void> = new Subject();
  isAuthenticated$: Observable<boolean>;
  cart$: Observable<Cart>;
  products$: Observable<Product[]>;
  cart: Cart;
  constructor(
    private store: Store<fromStore.State>,
    private router: Router,
  ) { }

  ngOnInit() {
    this.isAuthenticated$ = this.store.select(fromStore.getIsAuthenticated).pipe(
      takeUntil(this.unsubscribe),
      tap(x => {
        if (!!x) {
          this.initStore();
        }
      }));
    this.cart$ = this.store.select(fromStore.getCart).pipe(
      takeUntil(this.unsubscribe),
      tap(cart => this.cart = cart)
    );
    this.products$ = this.store.select(fromStore.getProducts).pipe(
      takeUntil(this.unsubscribe)
    );;
  }

  initStore(): void {
    this.store.dispatch(new fromActions.LoadCategories());
    this.store.dispatch(new fromActions.LoadCart());
  }

  login(loginData: { email: string, password: string }) {
    this.store.dispatch(new fromActions.Login(loginData));
  }


  logout() {
    localStorage.removeItem('token');
    this.store.dispatch(new fromActions.Logout('logout'));
  }
  startShoping() {
    if (!this.cart) {
      this.store.dispatch(new fromActions.AddCart());
    }
    this.router.navigate(['/shopping']);
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
