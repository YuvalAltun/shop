import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Cart } from 'src/app/services/backend/backend.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-shopper-info',
  templateUrl: './shopper-info.component.html',
  styleUrls: ['./shopper-info.component.css']
})
export class ShopperInfoComponent implements OnInit {
  email: string;
  password: string;
  @Input() isAuthenticated: boolean;
  @Input() cart: Cart;
  @Output() loginEvent = new EventEmitter<{email: string, password: string}>();
  @Output() startShopingEvent = new EventEmitter<void>();
  @Output() logoutEvent = new EventEmitter<void>();
  constructor() { }

  ngOnInit() {
  }

  login() {
    this.loginEvent.emit({email: this.email, password: this.password});
  }

  logout() {
    this.logoutEvent.emit();
  }

  startShopping() {
    this.startShopingEvent.emit();
  }

}
