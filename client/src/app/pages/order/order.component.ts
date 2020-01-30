import { Component, OnInit, ChangeDetectionStrategy, ViewChild, Renderer2 } from '@angular/core';
import {  Cart } from 'src/app/services/backend/backend.service';

import { Store } from '@ngrx/store';
import * as fromStore from './../../store';
import * as fromActions from './../../store/actions';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  $cart: Observable<Cart>;
  constructor(
    private store: Store<fromStore.State>,
    private router: Router) { }

  ngOnInit() {
    this.$cart = this.store.select(fromStore.getCart).pipe(
      map(cart => {
        const totalPrice = cart.items.reduce((acc, cur) => acc += cur.amount * cur.price, 0);
        return {...cart, totalPrice};
      })
    );
}

placeOrder() {
}
}
