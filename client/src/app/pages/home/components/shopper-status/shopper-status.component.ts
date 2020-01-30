import { Component, OnInit, Input } from '@angular/core';
import { Cart, Product } from 'src/app/services/backend/backend.service';

@Component({
  selector: 'app-shopper-status',
  templateUrl: './shopper-status.component.html',
  styleUrls: ['./shopper-status.component.css']
})
export class ShopperStatusComponent implements OnInit {
  @Input() isAuthenticated: boolean;
  @Input() cart: Cart;
  @Input() products: Product[];
  
  constructor() { }

  ngOnInit() {
  }

}
