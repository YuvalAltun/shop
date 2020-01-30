import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Product } from 'src/app/services/backend/backend.service';

@Component({
  selector: 'app-products-container',
  templateUrl: './products-container.component.html',
  styleUrls: ['./products-container.component.css']
})
export class ProductsContainerComponent implements OnInit {
  @Output() product = new EventEmitter<Product>();
  @Input() products: Product[] = [];
  constructor() { }

  ngOnInit() {
  }

  chooseProduct(product) {
    this.product.emit(product);
  }

}
