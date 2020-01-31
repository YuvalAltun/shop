import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from 'src/app/services/backend/backend.service';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';

import * as fromStore from './../../store';
import * as fromActions from './../../store/actions';


@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.css']
})
export class OrderViewComponent implements OnInit {

  $cart: Observable<Cart>;
  $order: Observable<any>;
  order: any;
  cart: any;
  constructor(
    private store: Store<fromStore.State>,
    private router: Router) { }

  ngOnInit() {
    this.$cart = this.store.select(fromStore.getlastCart).pipe(
      map(cart => {
        const totalPrice = cart && cart.items && cart.items.length ? cart.items.reduce((acc, cur) => acc += cur.amount * cur.price, 0) : 0;
        return {...cart, totalPrice};
      })
    );
    this.$order = this.store.select(fromStore.getOrder);
}

}
